import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    position: "absolute",
    top: 7,
    end: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderRadius: 10,
    elevation: 10
  },
  nomeStatus: {
    fontSize: 15,
    fontWeight: "bold",
    marginStart: 6
  },
  statusRascunho: {
    backgroundColor: "yellow"
  },
  statusFinalizada: {
    backgroundColor: config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000"
  }

});

export default styles;