import { config } from "@/config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99999999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  centro: {
    width: "80%",
    marginStart: "10%",
    marginEnd: "10%",
    padding: 10,
    borderRadius: 12,
    elevation: 10,
    backgroundColor: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  iconeSucesso: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginBottom: 20,
    elevation: 10
  },
  txtMsg: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 16,
    marginBottom: 20
  },
  btnOk: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    padding: 10,
    marginBottom: 20,
    marginTop: 40
  },
  containerDadoCliente: {
    width: "90%",
    marginTop: 5,
    marginBottom: 10,
    marginStart: "5%",
    marginEnd: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    borderStyle: "solid",
    borderTopWidth: 1,
    paddingTop: 10
  },
  txtTituloDado: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 16,
    fontWeight: "bold"
  },
  txtDado: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 15
  }

});