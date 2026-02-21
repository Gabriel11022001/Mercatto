import { config } from "@/config";
import { StyleSheet } from "react-native";

export default StyleSheet.create({

  containerCampo: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 20,
    marginBottom: 20
  },
  campo: {
    backgroundColor: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    elevation: 3
  },
  textInputCampo: {
    flex: 1,
    marginStart: 10,
    height: "100%",
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 18
  },
  erro: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
    fontWeight: "bold"
  }

});