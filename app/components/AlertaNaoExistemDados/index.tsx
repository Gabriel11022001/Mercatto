import { config } from '@/config';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, View } from "react-native";
import styles from "./styles";

type Props = {

  mensagem: string;

}

// alerta informando que não existem dados na base
const AlertaNaoExistemDados = ({ mensagem }: Props) => {

  return <View style={ styles.container }>
    <AntDesign name="database" size={ 50 } color={
      config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000"
    } />
    <Text style={ styles.mensagem }>{ mensagem }</Text>
  </View>
}

export default AlertaNaoExistemDados;