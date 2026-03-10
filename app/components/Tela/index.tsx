import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

type Props = {

  children: any;

}

const Tela = ({ children }: Props) => {

  return <SafeAreaView style={ styles.tela }>
    { children }
  </SafeAreaView>
}

export default Tela;