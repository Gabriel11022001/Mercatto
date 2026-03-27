import BotaoCancelar from "@/app/components/BotaoCancelar";
import DetalhesClienteVenda from "@/app/components/DetalhesClienteVenda";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import { buscarVendaPeloIdFirebase, deletarVendaFirebase } from "@/app/firebase/gestaoVenda";
import { Venda } from "@/app/type/venda";
import { apresentarAlerta, TipoAlerta } from "@/app/utils/apresentarAlertas";
import { log } from "@/app/utils/log";
import obterValorMonetario from "@/app/utils/obterValorMonetario";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import ListaItemsVenda from "../ListaItemsVenda";
import styles from "./styles";

// tela com os detalhes da venda
const DetalhesVenda = ({ navigation, route }: any) => {

  const [ idVenda, setIdVenda ] = useState<string>("");
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ venda, setVenda ] = useState<Venda | null>(null);

  // consultar a venda
  const buscarVenda = async () => {

    if (!idVenda) {

      return;
    }

    try {
      setCarregando(true);

      const vendaFirebase: Venda | null = await buscarVendaPeloIdFirebase(idVenda ?? "");

      if (vendaFirebase != null) {
        setVenda(vendaFirebase);
      }

      console.log(vendaFirebase?.itemsVendaDetalhes ?? []);
    } catch (e) {
      log.erro(`Erro ao tentar-se consultar a venda ${ idVenda }: ${ e }`);

      apresentarAlerta("Erro na consulta da venda.", TipoAlerta.erro);

      navigation.goBack();
    } finally {
      setCarregando(false);
    }

  }

  useEffect(() => {
    buscarVenda();
  }, [ idVenda ]);

  useFocusEffect(useCallback(() => {

    if (route.params && route.params.idVenda != null) {
      setIdVenda(route.params.idVenda);
    }

  }, []));

  // concluir a venda em rascunho
  const concluirVenda = (): void => {
    navigation.replace("inicio_fluxo_venda", { idVenda: venda?.id ?? "" });
  }

  // deletar a venda
  const deletarVenda = async () => {

    try {
      setCarregando(true);

      await deletarVendaFirebase(venda);

      apresentarAlerta("Venda deletada com sucesso.", TipoAlerta.sucesso);

      navigation.goBack();
    } catch (e) {
      log.erro(`Erro ao tentar-se deletar a venda ${ idVenda }`);

      apresentarAlerta("Erro ao tentar-se deletar venda!", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  return <Tela>  
    <Loader carregando={ carregando } />
    <ScrollView showsVerticalScrollIndicator={ false }>
      { /** código da venda */ }
      <View style={ styles.containerDadoVenda }>
        <Text style={ styles.tituloDado }>Código da Venda</Text>
        <Text style={ styles.dado }>{ venda?.id ?? "" }</Text>
      </View>
      { /** Valor total */ }
      <View style={ styles.containerDadoVenda }>
        <Text style={ styles.tituloDado}>Valor Total</Text>
        <Text style={ styles.dado}>R${ obterValorMonetario(venda?.valorTotal.toString() ?? "") }</Text>
      </View>
      { /** data de início da venda */ }
      <View style={ styles.containerDadoVenda }>
        <Text style={ styles.tituloDado}>Data de Início</Text>
        <Text style={ styles.dado}>{ venda?.dataInicioVenda ?? "" }</Text>
      </View>
      { /** data de conclusão da venda */ }
      { venda && venda.dataConclusaoVenda && <View style={ styles.containerDadoVenda }>
        <Text style={ styles.tituloDado}>Data de Conclusão</Text>
        <Text style={ styles.dado}>{ venda?.dataConclusaoVenda ?? "" }</Text>
      </View> }
      { /** status da venda */ }
      <View style={ styles.containerDadoVenda }>
        <Text style={ styles.tituloDado}>Status</Text>
        <Text style={ styles.dado}>{ venda?.status.toUpperCase() }</Text>
      </View>
      { /** apresentar os detalhes do cliente da venda */ }
      {  (venda && venda.cliente != null) && <DetalhesClienteVenda cliente={ venda.cliente } /> }
      { /** apresentar a lista com os items da venda */ }
      { (venda && venda.itemsVendaDetalhes && venda.itemsVendaDetalhes.length > 0) && <ListaItemsVenda items={ venda.itemsVendaDetalhes } /> }
      { (venda && venda.status === "rascunho") && <BotaoCancelar
        titulo="Concluir Venda"
        onCancelar={ () => {
          concluirVenda();
        } } /> }
      { /** botão para deletar a venda */ }
      <BotaoCancelar
        onCancelar={ () => {
          deletarVenda();
        } }
        titulo="Deletar Venda"
        deletar={ true }
        estilosAlternativos={ { marginTop: 10, marginBottom: 100 } } />
    </ScrollView>
  </Tela>
}

export default DetalhesVenda;