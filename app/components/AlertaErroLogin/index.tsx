import { Image, Text, View } from "react-native";
import styles from "./styles";

interface Props {

  erro: string;

}

const AlertaErroLogin = ({ erro }: Props) => {

  if (!erro ) {

    return false;
  }

  return <View style={ styles.alertaErro }>
    <Image style={ styles.iconeErro } source={ require("@/assets/images/icone_erro.png") } />
    <Text style={ styles.erroTitulo }>Atenção!</Text>
    <Text style={ styles.msgAlertaErro }>{ erro }</Text>
  </View> 
}

export default AlertaErroLogin;