import { config } from "@/config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  produtoItem: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    borderWidth: 1,
    borderStyle: "solid"
  },
  txtNomeProduto: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontSize: 18,
    fontWeight: "bold"
  },
  txtDado: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    marginTop: 3,
    fontSize: 15
  },
  containerDadosProduto: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20
  },
  foto: {
    width: 100,
    height: "100%",
    marginEnd: 10,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12
  }
  
});