import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  txtCadastrarUsuarioTitulo: {
      color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
      fontSize: 30,
      textAlign: "center",
      marginTop: 30,
      fontWeight: 900
    },
    txtCadastrarUsuarioSubtitulo: {
      color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
      marginTop: 10,
      fontSize: 16,
      textAlign: "center"
    },
    containerJaEstaCadastrado: {
      width: "90%",
      marginStart: "5%",
      marginEnd: "5%",
      alignItems: "center",
      borderStyle: "solid",
      borderTopWidth: 1,
      borderTopColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
      marginBottom: 50
    },
    txtJaEstaCadastrado: {
      color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
      marginTop: 30,
      fontSize: 16,
      textAlign: "center"
    },
    txtBtnRedirecionarTelaLogin: {
      color: config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000",
      fontSize: 20,
      marginTop: 10,
      textAlign: "center",
      fontWeight: "bold"
    }

});

export default styles;