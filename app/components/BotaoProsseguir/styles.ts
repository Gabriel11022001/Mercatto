import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
  botao: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 10,
    marginBottom: 70,
    backgroundColor: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    padding: 10,
    borderRadius: 10
  },
  textoBotao: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center" 
  }

});

export default styles;