import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  botao: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 20,
    marginBottom: 30,
    elevation: 3,
    backgroundColor: config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    padding: 10,
    borderRadius: 16
  },
  botaoDesabilitado: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: config.cores.find(c => c.nomeCor === "botao_desabilitado")?.cor ?? "#000",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    padding: 10,
    borderRadius: 16,
    opacity: 0.7,
    elevation: 3
  },
  txtBotao: {
    color: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }

});

export default styles;