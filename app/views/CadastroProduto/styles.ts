import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  separador: {
    width: "90%",
    height: 1,
    backgroundColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    marginTop: 10,
    marginBottom: 10,
    marginStart: "5%",
    marginEnd: "5%"
  },
  titulo: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    marginStart: "5%"
  }

});

export default styles;