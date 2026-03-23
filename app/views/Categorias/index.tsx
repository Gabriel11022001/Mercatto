import AlertaNaoExistemDados from "@/app/components/AlertaNaoExistemDados";
import { CategoriasItem } from "@/app/components/CategoriaItem";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import { alterarStatusCategoriaFirebase, deletarCategoriaFirebase, listarCategoriasFirebase } from "@/app/firebase/gestaoCategoria";
import CategoriaProduto from "@/app/type/categoriaProduto";
import { apresentarAlerta, TipoAlerta } from "@/app/utils/apresentarAlertas";
import { log } from "@/app/utils/log";
import validarSecaoUsuario from "@/app/utils/validarSecaoUsuario";
import { config } from "@/config";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";

const Categorias = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ categorias, setCategorias ] = useState<Array<CategoriaProduto>>([]);

  // listar as categorias de produto na base de dados
  const listarCategorias = async () => {
    setCarregando(true);
    setCategorias([]);

    try {
      const resp = await listarCategoriasFirebase();

      setCategorias(resp);
    } catch (e) {
      await log.erro(`Erro ao tentar-se listar as categorias: ${ e }`);
      console.error(`Erro ao tentar-se listar as categorias: ${ e }`);
      apresentarAlerta("Erro ao tentar-se listar as categorias, tente novamente!", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  // deletar categoria de produto
  const deletarCategoria = async (categoria: CategoriaProduto) => {
    setCarregando(true);

    try {
      console.log("Deletando a categoria...");

      await deletarCategoriaFirebase(categoria.id ?? "");

      apresentarAlerta("Categoria deletada com sucesso.", TipoAlerta.sucesso);

      await log.debug(`Categoria ${ categoria.id ?? "" } deletada com sucesso.`);

      await listarCategorias();
    } catch (e) {
      await log.erro(`Erro ao tentar-se deletar a categoria: ${ e }`);
      console.error(`Erro ao tentar-se deletar a categoria: ${ e }`);
      
      apresentarAlerta("Erro ao tentar-se deletar a categoria.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  // visualizar dados da categoria do produto
  const visualizarCategoria = (categoria: CategoriaProduto): void => {
    navigation.navigate("cadastro_categoria", { idCategoriaEditar: categoria.id ?? "" });
  }

  // alterar o status da categoria
  const alterarStatusCategoria = async (categoria: CategoriaProduto) => {

    try {
      setCarregando(true);

      await alterarStatusCategoriaFirebase(categoria.id ?? "", !categoria.status);

      setCarregando(false);

      if (categoria.status) {
        apresentarAlerta("Categoria desabilitada com sucesso.", TipoAlerta.sucesso);
        await log.debug(`Categoria ${ categoria.id ?? "" } desabilitada com sucesso.`);
      } else {
        apresentarAlerta("Categoria habilitada com sucesso.", TipoAlerta.sucesso);
        await log.debug(`Categoria ${ categoria.id ?? "" } habilitada com sucesso.`);
      }

      await listarCategorias();
    } catch (e) {
      await log.erro(`Erro ao tentar-se alterar o status da categoria ${ categoria.id ?? "" }: ${ e }`);
      console.error(`Erro ao tentar-se alterar o status da categoria: ${ e }`);

      setCarregando(false);

      apresentarAlerta("Erro ao tentar-se alterar o status da categoria.", TipoAlerta.erro);
    }

  }
  
  useFocusEffect(useCallback(() => {
    validarSecaoUsuario(navigation);
    listarCategorias();
  }, []));

  return (
    <Tela>
      <Loader carregando={ carregando } />
      { categorias.length === 0 ? <AlertaNaoExistemDados mensagem="Não existem categorias de produtos cadastradas na base de dados." />
      : <FlatList
        style={ { backgroundColor: config.cores.find(cor => cor.nomeCor === "branco")?.cor ?? "#fff" } }
        data={ categorias }
        keyExtractor={ categoria => categoria.id ?? "" }
        renderItem={ ({ item }) => {

          return (
            <CategoriasItem
              categoria={ item }
              onVisualizar={ () => {
                visualizarCategoria(item);
              } }
              onEditar={ () => {
                visualizarCategoria(item);
              } }
              onDeletar={ () => {
                deletarCategoria(item);
              } }
              onAlterarStatus={ () => {
                alterarStatusCategoria(item);
              } } />
          );
        } } /> } 
    </Tela>
  );
}

export default Categorias;