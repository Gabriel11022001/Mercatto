import BotaoCancelar from "@/app/components/BotaoCancelar";
import BotaoProsseguir from "@/app/components/BotaoProsseguir";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import { atualizarVenda, definirVendaRascunhoFirebase } from "@/app/firebase/gestaoVenda";
import useFluxoVenda from "@/app/hooks/useFluxoVenda";
import { Venda } from "@/app/type/venda";
import { apresentarAlerta, TipoAlerta } from "@/app/utils/apresentarAlertas";
import { log } from "@/app/utils/log";
import obterDataAtual from "@/app/utils/obterDataAtual";
import { config } from "@/config";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

// tela para o usuário selecionar a forma de pagamento da venda
const FormaPagamento = ({ navigation }: any) => {

  const { venda, atualizarDadosVenda, limparVenda } = useFluxoVenda();
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ formasPagamento, setFormasPagamento ] = useState<Array<string>>([]);
  const [ formaPagamentoSelecionada, setFormaPagamentoSelecionada ] = useState<string>("");

  // listar formas de pagamento
  const listarFormasPagamento = (): void => {
    setFormasPagamento([
      "Pix",
      "Boleto",
      "Cartão de Crédito",
      "Espécie"
    ]);
  }

  // setar a forma de pagamento selecionada quando entrar na tela
  const setarFormaPagamentoSelecionada = (): void => {

    if (venda?.formaPagamento && venda.formaPagamento != "") {
      setFormaPagamentoSelecionada(venda.formaPagamento);
    }

  }

  useEffect(() => {
    setarFormaPagamentoSelecionada();
  }, [ formasPagamento ]);

  useEffect(() => {
    const vendaCopia: Venda = { ...venda as Venda };

    vendaCopia.formaPagamento = formaPagamentoSelecionada;

    atualizarDadosVenda(vendaCopia);
  }, [ formaPagamentoSelecionada ]);

  const getIconeFormaPagamento = (formaPagamento: string) => {

    if (formaPagamento === "Cartão de Crédito") {

      return <AntDesign name="credit-card" size={ 70 } color={
        config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000"
      } />;
    }

    if (formaPagamento === "Espécie") {

      return <FontAwesome name="money" size={ 70 } color={
        config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000"
      } />
    }

    if (formaPagamento === "Pix") {

      return <FontAwesome6 name="pix" size={ 70 } color={
        config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000"
      }/>
    }

    if (formaPagamento === "Boleto") {

      return <Fontisto name="file-1" size={ 70 } color={
        config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000"
      } />
    }

    return null;
  }

  useFocusEffect(useCallback(() => {
    listarFormasPagamento();
  }, []));

  // cancelar a venda
  const cancelarVenda = async () => {

    try {
      setCarregando(true);
      
      // atualizar a venda como em rascunho
      await definirVendaRascunhoFirebase(venda as Venda);
      
      limparVenda();

      navigation.replace("home");

      apresentarAlerta("Venda cancelada!", TipoAlerta.aviso);
    } catch (e) {
      log.erro(`Erro ao tentar-se deixar a venda como rascunho ${ venda?.id ?? "" }: ${ e }`);

      apresentarAlerta("Erro definir venda como rascunho.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  // concluir a venda
  const finalizarVenda = async () => {

    try {
      setCarregando(true);

      if (formaPagamentoSelecionada === "") {
        apresentarAlerta("Selecione uma forma de pagamento.", TipoAlerta.erro);

        return;
      }

      const vendaCopia: Venda = { ...venda as Venda };

      vendaCopia.status = "finalizada";
      vendaCopia.dataConclusaoVenda = obterDataAtual();

      await atualizarVenda(vendaCopia);

      // limpar a venda do contexto
      limparVenda();

      apresentarAlerta("Venda finalizada com sucesso.", TipoAlerta.sucesso);

      navigation.replace("home");
    } catch (e) {
      log.erro(`Erro ao tentar-se finalizar a venda ${ venda?.id ?? "" }: ${ e }`);

      apresentarAlerta("Erro, tente novamente.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  return (
    <Tela>
      <Loader carregando={ carregando } msg="Enviando a venda para o servidor, aguarde..." />
      <ScrollView showsVerticalScrollIndicator={ false }>
        { formasPagamento.map((formaPagamento: string) => {

          return <Pressable style={ [
            {
              backgroundColor: "#fff",
              width: "90%",
              marginTop: 10,
              marginBottom: 10,
              marginStart: "5%",
              marginEnd: "5%",
              borderRadius: 12,
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              elevation: 10,
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000"
            },
            formaPagamentoSelecionada === formaPagamento && {
              borderWidth: 4,
              borderColor: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000"
            }
          ] } onPress={ () => {
            setFormaPagamentoSelecionada(formaPagamento);
          } }
          key={ formaPagamento }>
            <View style={ {
              flex: 1,
              flexDirection: "row",
              alignItems: "center"
            } }>
              { getIconeFormaPagamento(formaPagamento) }
              <Text style={ {
                fontSize: 20,
                marginStart: 10,
                color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000"
              } }>{ formaPagamento }</Text>
            </View>
            <View style={ [
              {
                width: 40,
                height: 40,
                borderRadius: 25,
                backgroundColor: "#fff",
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
                elevation: 3,
                alignItems: "center",
                justifyContent: "center"
              }
            ] }>
              { formaPagamento === formaPagamentoSelecionada && <AntDesign name="close" size={ 30 } color={
                config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000"
              } /> }
            </View>
          </Pressable>
        }) }
        { /** botão para cancelar a venda */ }
        <BotaoCancelar titulo="Cancelar" onCancelar={ () => {
          cancelarVenda();
        } } />
        { /** botão para finalizar a venda */ }
        <BotaoProsseguir
          titulo="Finalizar"
          onProsseguir={ () => {
            finalizarVenda();
          } } />
      </ScrollView>
    </Tela>
  );
}

export default FormaPagamento;