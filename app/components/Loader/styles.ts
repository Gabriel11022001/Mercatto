import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 999999999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20
  },
  logoLoader: {
    width: "100%",
    height: 200
  },
  txtEfetuandoLogin: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    fontSize: 20,
    fontStyle: "italic"
  }

});

export default styles;