import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20
  },
  texto: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 17,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  imagem: {
    width: "100%",
    height: 400,
    marginBottom: 20
  },
  msgErro: {
    color: "red",
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
    marginBottom: 30
  }

});

export default styles;