import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  txtNomeFormaPagamento: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginStart: 10
  }

});

export default styles;