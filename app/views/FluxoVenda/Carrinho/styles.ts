import { config } from "@/config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  alterarCliente: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 10,
    marginBottom: 10,
    elevation: 10,
    borderStyle: "solid",
    borderColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20
  },
  alterarClienteTitulo: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  nomeCliente: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5
  },
  dadoCliente: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    marginTop: 3,
    fontSize: 14
  },
  containerSemProdutos: {
    width: "90%",
    marginTop: 30,
    marginBottom: 30,
    marginStart: "5%",
    marginEnd: "5%",
    alignItems: "center",
    justifyContent: "center"
  },
  containerSemProdutosTexto: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold"
  },
  containerValorTotal: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 30
  },
  txtTotalTitulo: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontSize: 16,
    fontWeight: "bold"
  },
  txtTotalValor: {
    fontSize: 16,
    color: "#000"
  },
  botaoAdicionarProduto: {
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: 10,
    marginBottom: 10,
    elevation: 10,
    borderStyle: "solid",
    borderColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  txtAdicionarProduto: {
    color: config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginStart: 20
  },
  item: {
    width: "100%",
    padding: 20,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    flexDirection: "column",
    backgroundColor: "#fff",
    marginTop: 10
  },
  nomeProduto: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 5
  },
  itemDado: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 15
  },
  containerEstoquePrecoUnitario: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  separadorContainerEstoquePrecoUnitario: {
    height: 30,
    width: 1,
    backgroundColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    marginStart: 7,
    marginEnd: 7
  },
  separdorContainerQuantidade: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    height: 1
  },
  txtQuantidadeTitulo: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 5
  },
  containerGestaoUnidades: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  btnIncrementarDecrementar: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    borderRadius: 100
  },
  txtQuantidadeSelecionada: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold"
  },
  containerSubTotal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1
  },
  txtSubTotal: {
    color: "#000",
    fontSize: 16,
    marginEnd: 10
  }

});

export default styles;