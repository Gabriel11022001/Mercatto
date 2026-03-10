import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  item: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#fff",
    borderStyle: "solid",
    borderBottomColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  containerFotoDadosCliente: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  containerDadosCliente: {
    flex: 1,
    flexDirection: "column"
  },
  foto: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginEnd: 20
  },
  nomeCliente: {
    fontSize: 16,
    fontWeight: "bold",
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    marginBottom: 6,
    textTransform: "uppercase"
  },
  dado: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 15,
    marginTop: 4
  },
  containerOperacoes: {
    backgroundColor: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#fff",
    padding: 10,
    borderRadius: 10,
    borderColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    borderWidth: 1,
    borderStyle: "solid",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    elevation: 10,
    marginTop: 30
  }

});

export default styles;