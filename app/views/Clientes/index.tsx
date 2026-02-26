import AlertaNaoExistemDados from "@/app/components/AlertaNaoExistemDados";
import BottomSheetOperacoes, { OperacaoPermitida } from "@/app/components/BottomSheetOperacoes";
import ClienteItem from "@/app/components/ClienteItem";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import deletarClienteFirebase from "@/app/firebase/deletarCliente";
import listarClientesFirebase from "@/app/firebase/listarClientes";
import { Cliente } from "@/app/type/cliente";
import { config } from "@/config";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";

// tela de listagem de clientes
const Clientes = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ clientes, setClientes ] = useState<Array<Cliente>>([]);
  const [ clienteOperacao, setClienteOperacao ] = useState<Cliente | null>(null);

  const listarClientes = async () => {
    console.log("Consultando os clientes no servidor...");
    setClientes([]);
    setCarregando(true);

    try {
      const clientesLista = await listarClientesFirebase();

      setClientes(clientesLista);

      console.log("Clientes listados com sucesso...");
    } catch (e) {
      console.log(e);

      // apresentar um alerta de erro para o usuário
    } finally {
      setCarregando(false);
    }

  }

  const redirecionarTelaEditarCliente = (): void => {
    navigation.navigate("cadastro_cliente", { idClienteEditar: clienteOperacao?.id ?? "" });
  }

  // deletar cliente no servidor
  const deletarCliente = async () => {
    const idClienteDeletar: string = clienteOperacao?.id ?? "";

    console.log("Deletar o cliente de id " + idClienteDeletar);

    setClienteOperacao(null);

    setCarregando(true);

    try {
      await deletarClienteFirebase(idClienteDeletar);

      // apresentar alerta de sucesso para o usuário

      // listar os clientes novamente
      await listarClientes();
    } catch (e) {
      // apresentar alerta de erro para o usuário
      console.error("Erro ao tentar-se deletar o cliente: " + e);
    } finally {
      setCarregando(false);
    }

  }

  const executarOperacao = async (operacao: OperacaoPermitida) => {

    switch (operacao) {
      case OperacaoPermitida.visualizar:
        // visualizar dados do cliente
        setClienteOperacao(null);
        redirecionarTelaEditarCliente();
        break;
      case OperacaoPermitida.editar:
        // editar dados do cliente
        setClienteOperacao(null);
        redirecionarTelaEditarCliente();
        break;
      case OperacaoPermitida.deletar:
        // deletar cliente
        deletarCliente();
        break;
    }

  }
  
  useFocusEffect(useCallback(() => {
    listarClientes();
  }, []));

  return (
    <Tela>
      <BottomSheetOperacoes
        operacoes={ [
          OperacaoPermitida.deletar,
          OperacaoPermitida.visualizar,
          OperacaoPermitida.editar
        ] }
        apresentar={ clienteOperacao != null }
        titulo="Gerenciar Cliente"
        onFechar={ () => {
          setClienteOperacao(null);
        } }
        onVisualizar={ () => {
          executarOperacao(OperacaoPermitida.visualizar);
        } }
        onEditar={ () => {
          executarOperacao(OperacaoPermitida.editar);
        } }
        onDeletar={ () => {
          executarOperacao(OperacaoPermitida.deletar);
        } } />
      <Loader carregando={ carregando } />
      { clientes.length === 0 ? <AlertaNaoExistemDados mensagem="Não existem clientes cadastrados na base de dados." /> : <FlatList
        style={ { backgroundColor: config.cores.find(cor => cor.nomeCor === "branco")?.cor ?? "#fff" } }
        data={ clientes }
        keyExtractor={ c => c.id.toString() ?? "" }
        renderItem={ ({ item }) => {

          return <ClienteItem cliente={ item } onApresentarOperacoesCliente={ () => {
            setClienteOperacao(item);
          } } />
        } } />  }  
    </Tela>
  );
}

export default Clientes;