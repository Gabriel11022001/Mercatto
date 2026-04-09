import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
  containerNomeUsuarioEmail: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  nomeUsuarioLogadoTopo: {
    color: config.cores.find(cor => cor.nomeCor === "primaria")?.cor ?? "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  containerEmailUsuarioTopo: {
    padding: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: config.cores.find(cor => cor.nomeCor === "borda")?.cor ?? "#000",
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  containerDadosUsuario: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 10,
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4
  },
  containerDadoUsuario: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: config.cores.find(cor => cor.nomeCor === "borda")?.cor ?? "#000"
  },
  tituloDadosPessoais: {
    marginStart: "5%",
    color: config.cores.find(cor => cor.nomeCor === "primaria")?.cor ?? "#000",
    fontWeight: "bold",
    fontSize: 18
  },
  tituloDado: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14
  },
  dado: {
    color: config.cores.find(cor => cor.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 17,
    marginTop: 5
  }

});

export default styles;