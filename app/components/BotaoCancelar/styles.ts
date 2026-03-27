import { config } from "@/config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  
  botao: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 50,
    marginBottom: 10,
    backgroundColor: "transparent",
    borderColor: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    borderWidth: 2,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row"
  },
  textoBotao: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontSize: 20,
    textAlign: "center" 
  }
  
});