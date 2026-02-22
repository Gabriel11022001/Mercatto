import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

interface Props {

  titulo: string;
  habilitado: boolean;
  onPressionar: () => void;
  styleAdicional?: any;

}

// componente que representa um botão 
const BotaoPadrao = ({ titulo, onPressionar, habilitado = false, styleAdicional }: Props) => {

  return (
    <TouchableOpacity disabled={ !habilitado } style={ [
      habilitado ? styles.botao : styles.botaoDesabilitado,
      styleAdicional != null && styleAdicional
    ] } onPress={ () => {
      onPressionar();
    } }>
      <Text style={ styles.txtBotao }>{ titulo }</Text>
    </TouchableOpacity>
  );
}

export default BotaoPadrao;