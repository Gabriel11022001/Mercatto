import { ItemVendaDetalhes } from "@/app/type/venda";
import obterValorMonetario from "@/app/utils/obterValorMonetario";
import { config } from "@/config";
import { StyleSheet, Text, View } from "react-native";

type Props = {

  items: Array<ItemVendaDetalhes>;

}

// detalhes do item da venda
const ListaItemsVenda = ({ items }: Props) => {

  return <View>
    { items.map((itemVenda: ItemVendaDetalhes, index) => {

      return <View style={ [
        styles.item,
        index === 0 && { marginTop: 40 },
        index === items.length - 1 && { marginBottom: 40 }
      ] }>
        <Text style={ styles.nomeProduto }>{ itemVenda.produto?.nomeProduto ?? "" }</Text>
        <Text style={ styles.dado }>Preço Uni. R${ obterValorMonetario(itemVenda.valorUnitarioProduto.toString()) }</Text>
        <Text style={ styles.dado }>Uni. Adquiridas: { itemVenda.unidades }</Text>
        <Text style={ styles.dado }>Subtotal: R${ obterValorMonetario(
          (itemVenda.unidades * itemVenda.valorUnitarioProduto).toString()
        ) }</Text>
      </View>
    }) }
  </View>
}

const styles = StyleSheet.create({
  
  item: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "column",
    borderStyle: "solid",
    borderBottomColor: config.cores.find(c => c.nomeCor === "borda")?.cor ?? "#000",
    borderBottomWidth: 1,
    elevation: 1
  },
  nomeProduto: {
    color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
    fontWeight: "900",
    fontSize: 18,
    marginBottom: 7
  },
  dado: {
    color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
    fontSize: 15,
    marginTop: 5
  }
  
});

export default ListaItemsVenda;