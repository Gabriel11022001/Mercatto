import { config } from "@/config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  botaoTirarFoto: {
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 12,
    elevation: 10
  },
  txtBotaoTirarFoto: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontSize: 20,
    fontWeight: "bold"
  },
  foto: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingEnd: 20
  },
  fotoImagem: {
    width: 100,
    height: "100%",
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    resizeMode: "cover"
  },
  containerOperacoes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  }

});