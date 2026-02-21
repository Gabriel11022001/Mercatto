import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: config.cores.find(cor => cor.nomeCor === "branco")?.cor ?? "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 200,
    height: 200
  },
  textoSejaBemVindo: {
    color: config.cores.find(cor => cor.nomeCor === "primaria")?.cor ?? "#000",
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold"
  }

});

export default styles;