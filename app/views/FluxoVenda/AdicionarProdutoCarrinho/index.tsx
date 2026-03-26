import AlertaNaoExistemDados from "@/app/components/AlertaNaoExistemDados";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import { listarProdutosFirebase } from "@/app/firebase/gestaoProduto";
import useFluxoVenda from "@/app/hooks/useFluxoVenda";
import { Produto } from "@/app/type/produto";
import { ItemVenda, Venda } from "@/app/type/venda";
import { apresentarAlerta, TipoAlerta } from "@/app/utils/apresentarAlertas";
import obterValorMonetario from "@/app/utils/obterValorMonetario";
import { config } from "@/config";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

// tela para o usuário adicionar produtos no carrinho de compras
const AdicionarProdutoCarrinho = ({ navigation }: any) => {
 
  const { venda, atualizarDadosVenda, limparVenda } = useFluxoVenda();
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ produtosDisponiveis, setProdutosDisponiveis ] = useState<Produto[]>([]);

  // listar os produtos disponíveis para venda
  const listarProdutosDisponiveis = async () => {

    try {
      setCarregando(true);
      setProdutosDisponiveis([]);

      const produtos: Array<Produto> = await listarProdutosFirebase();
      
      setProdutosDisponiveis(produtos.filter(p => p.ativo && p.estoque > 0));
    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

  const validarProdutoEstaCarrinho = (produtoValidar: Produto): boolean => {
    const itemsEstaoCarrinho: Array<ItemVenda> = venda?.itemsVenda ?? [];

    if (itemsEstaoCarrinho.length > 0) {
      
      if (itemsEstaoCarrinho.find(item => item.produtoId === produtoValidar.id) != null) {
        // o produto já está no carrinho de compras

        return true;
      }

    }

    return false;
  }

  // adicionar o produto no carrinho
  const adicionarProdutoCarrinho = (produtoAdicionarCarrinho: Produto) => {

    if (validarProdutoEstaCarrinho(produtoAdicionarCarrinho)) {
      apresentarAlerta("Produto já está no carrinho.", TipoAlerta.aviso);

      return;
    }

    const vendaAtualizada = { ...venda };
    const itemsCarrinho: Array<ItemVenda> = venda?.itemsVenda ?? [];

    itemsCarrinho.push({
      id: "",
      unidades: 1,
      valorUnitarioProduto: produtoAdicionarCarrinho.precoComDesconto ? parseFloat(produtoAdicionarCarrinho.precoComDesconto.toString()) 
        : parseFloat(produtoAdicionarCarrinho.preco.toString()),
      produtoId: produtoAdicionarCarrinho.id ?? ""
    });

    vendaAtualizada.itemsVenda = itemsCarrinho;

    atualizarDadosVenda(vendaAtualizada as Venda);

    navigation.goBack();
  }

  useFocusEffect(useCallback(() => {
    listarProdutosDisponiveis();
  }, []));

  return <Tela>
    <Loader carregando={ carregando } />
    { produtosDisponiveis.length === 0 ? <AlertaNaoExistemDados mensagem="Não existem produtos disponíveis para venda." /> : <FlatList
      data={ produtosDisponiveis }
      keyExtractor={ produto => produto.id ?? "" }
      renderItem={ ({ item, index }) => {

        return <Pressable onPress={ () => adicionarProdutoCarrinho(item) } style={ [
          styles.produtoItem,
          index === produtosDisponiveis.length - 1 && { marginBottom: 100 }
        ] }>
          <View> 
            <Text style={ styles.txtNomeProduto }>{ item.nomeProduto }</Text>
            <Text style={ styles.txtDado }>Preço unitário: R${ obterValorMonetario(item.preco.toString()) }</Text>
            { item.precoComDesconto != null && item.precoComDesconto != undefined && item.precoComDesconto != 0 && <Text style={ styles.txtDado }>
              Preço com desconto: R${ obterValorMonetario(item.precoComDesconto.toString()) }
            </Text> }
            <Text style={ styles.txtDado }>Unidades disponíveis: { item.estoque.toString() }</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={ 40 } color={
            config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000"
          } />
        </Pressable>
      } } /> }
  </Tela>
}

export default AdicionarProdutoCarrinho;