import { config } from "@/config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  containerLogo: {
    width: "100%",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    backgroundColor: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#fff"
  },
  logo: {
    width: 150,
    height: 150
  },
  txtEntrar: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontSize: 40,
    textAlign: "center",
    marginTop: 30,
    fontWeight: 900
  },
  txtFacaLogin: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    marginTop: 10,
    fontSize: 16,
    textAlign: "center"
  },
  containerEsqueciSenha: {
    width: "90%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginEnd: "5%",
    marginStart: "5%"
  },
  txtEsqueciSenha: {
    fontSize: 16,
    fontWeight: "bold",
    color: config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000"
  },
  containerRegistro: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    alignItems: "center",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderTopColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000"
  },
  txtNovoUsuario: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    marginTop: 30,
    fontSize: 16,
    textAlign: "center"
  },
  txtBtnRegistroNovoUsuario: {
    color: config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000",
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold"
  }

});