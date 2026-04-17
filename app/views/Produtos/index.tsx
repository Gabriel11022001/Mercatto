import AlertaNaoExistemDados from "@/app/components/AlertaNaoExistemDados";
import Loader from "@/app/components/Loader";
import { ProdutoItem } from "@/app/components/ProdutoItem";
import Tela from "@/app/components/Tela";
import { deletarProdutoFirebase, listarProdutosFirebase, validarProdutoVinculadoVendas } from "@/app/firebase/gestaoProduto";
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

  // alterar status do produto
  const alterarStatusProduto = async (produto: Produto) => {
    setCarregando(true);

    try {
      console.log("Alterando status do produto, aguarde...");
      await listarProdutos();      
    } catch (e) {
      log.erro(`Erro ao tentar-se alterar o status do produto ${ produto.id ?? "" }: ${ e }`);

      apresentarAlerta("Erro ao tentar-se alterar status.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  // deletar o produto na base de dados
  const deletarProduto = async (idProdutoDeletar: string) => {

    try {
      setCarregando(true);

      // validar se o produto está vinculado a vendas
      if (await validarProdutoVinculadoVendas(idProdutoDeletar)) {
        apresentarAlerta("Produto vinculado a venda(s)!", TipoAlerta.aviso);

        return;
      }

      await deletarProdutoFirebase(idProdutoDeletar);

      log.debug("Produto " + idProdutoDeletar + " deletado com sucesso.");

      apresentarAlerta("Produto deletado com sucesso.", TipoAlerta.sucesso);

      await listarProdutos();
    } catch (e) {
      log.erro(`Erro ao tentar-se deletar o produto ${ idProdutoDeletar }: ${ e }`);

      apresentarAlerta("Erro ao tentar-se deletar o produto.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

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
            deletarProduto(item.id ?? "");
          } }
          onAlterarStatus={ () => {
            alterarStatusProduto(item);
          } } />
      } } /> }
  </Tela>
}

export default Produtos;