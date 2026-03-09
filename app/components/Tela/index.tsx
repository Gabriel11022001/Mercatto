import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import styles from "./styles";

type Props = {

  children: any;

}

const Tela = ({ children }: Props) => {

  return <SafeAreaView style={ styles.tela }>
    { /** toast alertas */ }
    <Toast />
    { children }
  </SafeAreaView>
}

export default Tela;