import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

interface Props {

  titulo: string;
  onProsseguir: () => void;

}

// botão de prosseguir na venda
const BotaoProsseguir = ({ titulo, onProsseguir }: Props) => {

  return <TouchableOpacity
    style={ styles.botao }
    onPress={ onProsseguir }>
      <Text style={ styles.textoBotao }>{ titulo }</Text>
  </TouchableOpacity>
}

export default BotaoProsseguir;