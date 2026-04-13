import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";

interface Props {

  erro: string;
  onFechar: () => void;

}

const AlertaErroLogin = ({ erro, onFechar }: Props) => {

  if (!erro ) {

    return false;
  }

  return <View style={ styles.alertaErro }>
    <Image style={ styles.iconeErro } source={ require("@/assets/images/icone_erro.png") } />
    <Text style={ styles.erroTitulo }>Atenção!</Text>
    <Text style={ styles.msgAlertaErro }>{ erro }</Text>
    <Pressable style={ styles.btnOk } onPress={ onFechar }>
      <Text style={ styles.txtBtnOk }>OK</Text>
    </Pressable>
  </View> 
}

export default AlertaErroLogin;