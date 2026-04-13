import { config } from "@/config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  containerTopo: {
    width: "100%",
    height: 300
  },
  imagemTopo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  containerTopoComLogo: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 20
  },
  logo: {
    width: 300,
    height: 300
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
    borderTopColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    marginBottom: 100
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