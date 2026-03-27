import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface Props {

  titulo: string;
  onCancelar: () => void;
  estilosAlternativos?: any;
  deletar?: boolean;

}

// botão cancelar
const BotaoCancelar = ({ titulo, deletar, onCancelar, estilosAlternativos }: Props) => {

  return <TouchableOpacity
    style={ [
      styles.botao,
      estilosAlternativos && estilosAlternativos,
      deletar && {
        backgroundColor: "red",
        borderColor: "red"
      }
    ] }
    onPress={ () => {
      onCancelar();
    } }>
    <Text style={ [
      styles.textoBotao,
      deletar && { color: "#fff" }
    ] }>{ titulo }</Text>
    { deletar && <MaterialIcons style={ {
      position: "absolute",
      end: 0
    } } name="delete-outline" size={ 40 } color="#fff" /> }
  </TouchableOpacity>
}

export default BotaoCancelar;