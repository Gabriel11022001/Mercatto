import AlertaNaoExistemDados from "@/app/components/AlertaNaoExistemDados";
import Loader from "@/app/components/Loader";
import { ProdutoItem } from "@/app/components/ProdutoItem";
import Tela from "@/app/components/Tela";
import { listarProdutosFirebase } from "@/app/firebase/gestaoProduto";
import { Produto } from "@/app/type/produto";
import { apresentarAlerta, TipoAlerta } from "@/app/utils/apresentarAlertas";
import { log } from "@/app/utils/log";
import { config } from "@/config";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";

// tela com listagem dos produtos
const Produtos = ({ navigation, route }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ produtos, setProdutos ] = useState<Array<Produto>>([]);

  // listar produtos no servidor
  const listarProdutos = async () => {
    setProdutos([]);

    try {
      setCarregando(true);

      const produtos: Array<Produto> = await listarProdutosFirebase();

      if (produtos.length > 0) {
        setProdutos(produtos);

        console.log("Produtos listados com sucesso.");
      } else {
        console.log("Não existem produtos cadastrados na base de dados.");
      }

    } catch (e) {
      await log.erro(`Erro ao tentar-se listar os produtos: ${ e }`);
      // apresentar alerta de erro
      apresentarAlerta("Erro ao listar produtos.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  const visualizarEditarProduto = (idProduto: string): void => {
    navigation.navigate("cadastro_produto", { idProdutoEditar: idProduto });
  }

  useFocusEffect(useCallback(() => {
    listarProdutos();
  }, []));

  return <Tela>
    <Loader carregando={ carregando } msg="Carregando produtos no servidor, aguarde..." />
    { produtos.length === 0 ? <AlertaNaoExistemDados mensagem="Não existem produtos cadastrados na base de dados..." />
    : <FlatList
      style={ { backgroundColor: config.cores.find(c => c.nomeCor === "branco")?.cor ?? "#fff" } }   
      data={ produtos }
      keyExtractor={ prod => prod.id?.toString() ?? "" }
      renderItem={ ({ item }) => {

        return <ProdutoItem
          produto={ item }
          onVisualizar={ () => {
            visualizarEditarProduto(item.id ?? "");
          } }
          onEditar={ () => {
            visualizarEditarProduto(item.id ?? "");
          } }
          onDeletar={ () => {

          } }
          onAlterarStatus={ () => {
            
          } } />
      } } /> }
  </Tela>
}

export default Produtos;