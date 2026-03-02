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
    justifyContent: "space-between"
  },
  containerFotoDadosCliente: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  foto: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginEnd: 20
  },
  nomeCliente: {
    fontSize: 16,
    fontWeight: "bold",
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    marginBottom: 6
  },
  dado: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 15,
    marginTop: 4
  },
  containerOperacoes: {
    position: "absolute",
    backgroundColor: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#fff",
    padding: 10,
    borderRadius: 10,
    borderColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    borderWidth: 1,
    borderStyle: "solid",
    flexDirection: "column",
    alignItems: "flex-start",
    width: 140,
    elevation: 3,
    right: 9,
    zIndex: 99999,
    top: 83
  }

});

export default styles;