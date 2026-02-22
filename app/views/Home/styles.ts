import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  containerBemVindo: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center"
  },
  txtSejaBemVindo: {
    color: config.cores.find(cor => cor.nomeCor === "primaria")?.cor ?? "#000",
    fontSize: 30,
    fontWeight: 900
  },
  iconeSejaBemVindo: {
    width: 30,
    height: 30,
    marginStart: 10
  },
  txtFazerHoje: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 16,
    marginTop: 10,
    marginStart: "5%"
  },
  containerOpcaoMenu: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  opcaoMenu: {
    width: "47%",
    height: 120,
    backgroundColor: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#fff",
    borderColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    borderRadius: 12,
    borderStyle: "solid",
    borderWidth: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: 12,
    elevation: 10
  },
  opcaoMenuPressionado: {
    width: "47%",
    height: 120,
    backgroundColor: config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#fff",
    borderColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    borderRadius: 12,
    borderStyle: "solid",
    borderWidth: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: 12,
    elevation: 10,
    opacity: 0.7
  },
  txtOpcao: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 16,
    marginTop: 10
  }

});

export default styles;