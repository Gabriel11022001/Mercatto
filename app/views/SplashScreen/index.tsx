import Tela from "@/app/components/Tela";
import { config } from "@/config";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import styles from "./styles";

// splash screen
const SplashScreen = ({ navigation }: any) => {

  const tempo: number = 4000;

  // redirecionar o usuário para a tela de login
  const redirecionar = (): void => {

    setTimeout(function () {
      navigation.navigate("login");
    }, tempo);

  }

  useFocusEffect(useCallback(() => {
    redirecionar();
  }, []));

  return (
    <Tela>
      <View style={ styles.container }>
        { /** logo do app */ }
        <Image style={ styles.logo } source={ require("@/assets/images/logo.png") } />
        <ActivityIndicator
          color={ config.cores.find(cor => cor.nomeCor === "primaria")?.cor ?? "#000" } size={ 70 } />
        <Text style={ styles.textoSejaBemVindo }>Seja bem vindo...</Text>
      </View>
    </Tela>
  );
}

export default SplashScreen;