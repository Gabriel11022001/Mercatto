import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 30
  },
  mensagem: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16
  }

});

export default styles;