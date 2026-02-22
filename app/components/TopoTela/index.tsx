import { Image, View } from "react-native";
import styles from "./styles";

const TopoTela = () => {

  return <View style={ styles.container }>
    <Image style={ styles.logo } source={ require("@/assets/images/logo_sem_fundo.png") } />
  </View>
}

export default TopoTela;