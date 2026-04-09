import { config } from "@/config";
import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  mensagem: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center"
  },
  atencao: {
    color: "#000",
    fontSize: 25,
    fontWeight: 900
  },
  imagem: {
    width: "100%",
    height: 400,
    resizeMode: "contain"
  }

});