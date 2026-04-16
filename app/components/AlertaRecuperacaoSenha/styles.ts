import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  alerta: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    borderStartWidth: 10,
    borderStyle: "solid",
    backgroundColor: "#fff"
  },
  sucesso: {
    borderStartColor: "green"
  },
  erro: {
    borderStartColor: "red"
  },
  texto: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10
  }

});

export default styles;