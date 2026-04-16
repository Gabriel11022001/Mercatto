import { config } from "@/config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  containerLoader: {
    flex: 1,
    padding: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  txtLoader: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20
  },
  titulo: {
    color: "#000",
    fontWeight: 900,
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 20
  },
  textoEnviarLink: {
    textAlign: "center",
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 16,
    marginStart: "10%",
    marginEnd: "10%",
    marginBottom: 20
  }

});