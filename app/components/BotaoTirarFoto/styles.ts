import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  botao: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#fff",
    elevation: 5,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000"
  },
  txtTituloBotao: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontSize: 18,
    fontWeight: "bold"
  }

});

export default styles;