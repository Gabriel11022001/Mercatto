import { config } from "@/config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  titulo: {
    marginStart: 5,
    fontSize: 15,
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000"
  }

});