import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

interface Props {

  titulo: string;
  onPressionar: () => void;

}

// componente que representa um botão 
const BotaoPadrao = ({ titulo, onPressionar }: Props) => {

  return (
    <TouchableOpacity style={ styles.botao } onPress={ () => {
      onPressionar();
    } }>
      <Text style={ styles.txtBotao }>{ titulo }</Text>
    </TouchableOpacity>
  );
}

export default BotaoPadrao;