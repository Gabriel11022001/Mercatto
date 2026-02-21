import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
  tela: {
    backgroundColor: config.cores.find(cor => cor.nomeCor === "fundo")?.cor ?? "#fff",
    flex: 1
  }

});

export default styles;