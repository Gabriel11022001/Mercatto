import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  clienteSelecionarItem: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#fff",
    paddingTop: 20,
    paddingBottom: 20,
    paddingStart: 10,
    paddingEnd: 10,
    elevation: 5,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000"
  },
  clienteSelecionado: {
    borderColor: config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000"
  },
  nomeCliente: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  dado: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 14,
    marginTop: 4
  },
  radio: {
    width: 30,
    height: 30,
    borderRadius: "100%",
    backgroundColor: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#fff",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#fff",
    elevation: 3
  },
  radioSelecionado: {
    width: 30,
    height: 30,
    borderRadius: "100%",
    backgroundColor: config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000",
    elevation: 3
  }

});

export default styles;