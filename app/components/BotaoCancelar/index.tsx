import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface Props {

  titulo: string;
  onCancelar: () => void;
  estilosAlternativos?: any;

}

// botão cancelar
const BotaoCancelar = ({ titulo, onCancelar, estilosAlternativos }: Props) => {

  return <TouchableOpacity
    style={ [
      styles.botao,
      estilosAlternativos && estilosAlternativos
    ] }
    onPress={ () => {
      onCancelar();
    } }>
    <Text style={ styles.textoBotao }>{ titulo }</Text>
  </TouchableOpacity>
}

export default BotaoCancelar;