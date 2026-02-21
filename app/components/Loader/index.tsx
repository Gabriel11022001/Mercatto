import { config } from "@/config";
import { ActivityIndicator, Image, Text, View } from "react-native";
import styles from "./styles";

type Props = {

  carregando: boolean;
  msg?: string;

}

// componente que representa um loader da aplicação
const Loader = ({ msg, carregando }: Props) => {

  if (!carregando) {

    return null;
  }

  return <View style={ styles.loader }>
      <Image style={ styles.logoLoader } source={ require("@/assets/images/logo_sem_fundo.png") } />
      <ActivityIndicator color={ config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000" } size={ 70 } />
      <Text style={ styles.txtEfetuandoLogin }>{ msg ? msg : "Carregando, aguarde..." }</Text>
  </View>
}

export default Loader;