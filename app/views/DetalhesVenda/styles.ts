import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  containerDadoVenda: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
    borderStyle: "solid",
    borderBottomColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    borderBottomWidth: 1,
    paddingBottom: 20
  },
  tituloDado: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontWeight: "bold",
    fontSize: 16
  },
  dado: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 16
  }

});

export default styles;