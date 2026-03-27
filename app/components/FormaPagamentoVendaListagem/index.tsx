import { config } from "@/config";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Text, View } from "react-native";
import styles from "./styles";

type Props = {

  formaPagamento: string;

}

// componente que representa a forma de pagamento da item da venda
const FormaPagamentoVendaListagem = ({ formaPagamento }: Props) => {
  
  // obter o icone da forma de pagamento
  const getIconeFormaPagamento = (formaPagamento: string) => {

    if (formaPagamento === "Cartão de Crédito") {

      return <AntDesign name="credit-card" size={ 30 } color={
        config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000"
      } />;
    }

    if (formaPagamento === "Espécie") {

      return <FontAwesome name="money" size={ 30 } color={
        config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000"
      } />
    }

    if (formaPagamento === "Pix") {

      return <FontAwesome6 name="pix" size={ 30 } color={
        config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000"
      }/>
    }

    if (formaPagamento === "Boleto") {

      return <Fontisto name="file-1" size={ 30 } color={
        config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000"
      } />
    }

    return null;
  }

  if (!formaPagamento) {

    return null;
  }

  return <View style={ styles.container }>
    { getIconeFormaPagamento(formaPagamento) }
    <Text style={ styles.txtNomeFormaPagamento }>{ formaPagamento }</Text>
  </View>
}

export default FormaPagamentoVendaListagem;