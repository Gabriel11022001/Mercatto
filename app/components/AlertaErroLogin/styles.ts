import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  alertaErro: {
    width: "90%",
    marginTop: 70,
    marginBottom: 10,
    marginStart: "5%",
    marginEnd: "5%",
    padding: 20,
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  msgAlertaErro: {
    textAlign: "center",
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10
  },
  iconeErro: {
    width: 100,
    height: 100,
    transform: [
      {
        translateY: -50
      }
    ]
  },
  erroTitulo: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18
  },
  btnOk: {
    backgroundColor: "red",
    padding: 10,
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5
  },
  txtBtnOk: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  }

});

export default styles;