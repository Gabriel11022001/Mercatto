import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderWidth: 1,
    borderColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    borderStyle: "solid",
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "column",
    elevation: 10,
    borderRadius: 10
  },
  topo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  topoTitulo: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 18,
    fontWeight: "bold"
  },
  dado: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 16,
    marginTop: 5
  },
  corpo: {
    flex: 1,
    borderStyle: "solid",
    borderTopColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 10
  },
  containerFoto: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 10,
    elevation: 5,
    resizeMode: "cover"
  }

});

export default styles;