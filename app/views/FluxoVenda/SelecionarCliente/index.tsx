import AlertaNaoExistemDados from "@/app/components/AlertaNaoExistemDados";
import BotaoPadrao from "@/app/components/BotaoPadrao";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import { atualizarVenda } from "@/app/firebase/gestaoVenda";
import listarClientesFirebase from "@/app/firebase/listarClientes";
import useFluxoVenda from "@/app/hooks/useFluxoVenda";
import { Cliente } from "@/app/type/cliente";
import { Venda } from "@/app/type/venda";
import { apresentarAlerta, TipoAlerta } from "@/app/utils/apresentarAlertas";
import { log } from "@/app/utils/log";
import { config } from "@/config";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import styles from "./styles";

// tela para o usuário selecionar o cliente na venda
const SelecionarCliente = ({ navigation }: any) => {

  const { venda, atualizarDadosVenda, limparVenda } = useFluxoVenda();
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ msgCarregando, setMsgCarregando ] = useState<string>("");
  const [ clientes, setClientes ] = useState<Array<Cliente>>([]);
  const [ clienteSelecionado, setClienteSelecionado ] = useState<Cliente | null>(null);

  // listar os clientes cadastrados para venda
  const listarClientes = async () => {

    try {
      setCarregando(true);
      setMsgCarregando("Consultando os clientes disponíveis, aguarde...");
      setClientes([]);
      setClienteSelecionado(null);

      const clientes: Cliente[] = await listarClientesFirebase();

      if (clientes.length === 0) {
        log.debug("Não existem clientes disponíveis para realiazar a venda: " + (venda?.id ?? ""));

        limparVenda();

        navigation.replace("home");
      } else {
        setClientes(clientes);

        if (venda?.clienteId) {
          // um cliente já está selecionado no fluxo de venda
          setClienteSelecionado(clientes.find(cliente => cliente.id === venda.id) ?? null);
        }

      }

    } catch (e) {
      log.erro(`Erro ao tentar-se listar os clientes disponíveis para venda ${ venda?.id ?? "" }: ${ e }`);

      apresentarAlerta("Erro na venda, tente novamente.", TipoAlerta.erro);

      // redirecionar o usuário para a tela home do app e deixar a venda como rascunho, e remover do contexto
      limparVenda();
      navigation.replace("home");
    } finally {
      setCarregando(false);
    }

  }

  // cancelar o fluxo de venda
  const cancelarFluxoVenda = async () => {
    limparVenda();

    navigation.replace("home");
  }

  // selecionar o cliente da venda
  const selecionarCliente = async (idCliente: string) => {
    setCarregando(true);
    setMsgCarregando("Selecionando o cliente para venda, aguarde...");

    try {
      const vendaAtualizada: Venda = {
        id: venda?.id ?? "",
        dataInicioVenda: venda?.dataInicioVenda ?? "",
        status: venda?.status ?? "",
        clienteId: idCliente,
        valorTotal: venda?.valorTotal ?? 0,
        dataConclusaoVenda: venda?.dataConclusaoVenda ?? ""
      }

      await atualizarVenda(vendaAtualizada);

      atualizarDadosVenda(vendaAtualizada);

      log.debug("Cliente selecionado com sucesso no fluxo de venda " + venda?.id, {
        venda: { ...vendaAtualizada },
        cliente_selecionado: clientes.find(c => c.id === idCliente)
      });

      // redirecionar o usuário para a tela de carrinho de compra
    } catch (e) {
      log.erro(`Erro ao tentar-se selecionar o cliente da venda ${ venda?.id }: ${ e }`);

      limparVenda();

      apresentarAlerta("Erro, tente realizar a venda novamente.", TipoAlerta.erro);

      navigation.replace("home");
    } finally {
      setCarregando(false);
    }

  }

  useFocusEffect(useCallback(() => {
    listarClientes();
  }, []));

  return <Tela>
    <Loader carregando={ carregando } msg={ msgCarregando } />
    { clientes.length === 0 ? <AlertaNaoExistemDados mensagem="Não existem clientes disponíveis para a venda." /> :
    <FlatList
      data={ clientes }
      keyExtractor={ c => c.id.toString() }
      renderItem={ ({ item }) => {

        return <Pressable
          style={ [
            styles.clienteSelecionarItem,
            clienteSelecionado != null && clienteSelecionado.id === item.id && styles.clienteSelecionado
          ] }
          onPress={ () => selecionarCliente(item.id) }>
            <View style={ [
              styles.radio,
              clienteSelecionado != null && clienteSelecionado.id === item.id && styles.radioSelecionado
            ] } />
            <View>
              <Text style={ styles.nomeCliente }>{ item.nome }</Text>
              <Text style={ styles.dado }>{ item.cpf }</Text>
              <Text style={ styles.dado }>{ item.email }</Text>
              <Text style={ styles.dado }>{ item.telefone }</Text>
            </View>
            <View>
              <MaterialIcons name="arrow-forward-ios" size={ 40 } color={
                config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000"
              } />
            </View>
        </Pressable>
      } } /> }
    <BotaoPadrao 
      titulo="Cancelar" 
      onPressionar={ cancelarFluxoVenda } 
      habilitado={ true } />
  </Tela>
}

export default SelecionarCliente;