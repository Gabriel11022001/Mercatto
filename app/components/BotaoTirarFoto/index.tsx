import { config } from '@/config';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

interface Props {

  titulo: string;
  onTirarFoto: () => void;

}

// botão para o usuário tirar foto
const BotaoTirarFoto = ({ titulo, onTirarFoto }: Props) => {

  return (
    <TouchableOpacity
      style={ styles.botao }
      onPress={ onTirarFoto }>
      <AntDesign name="camera" size={ 40 } color={
        config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000"
      } />
      <Text style={ styles.txtTituloBotao }>{ titulo }</Text>
    </TouchableOpacity>
  );
}

export default BotaoTirarFoto;