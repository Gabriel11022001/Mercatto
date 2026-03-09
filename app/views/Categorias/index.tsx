import AlertaNaoExistemDados from "@/app/components/AlertaNaoExistemDados";
import { CategoriasItem } from "@/app/components/CategoriaItem";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import { listarCategoriasFirebase } from "@/app/firebase/gestaoCategoria";
import CategoriaProduto from "@/app/type/categoriaProduto";
import { apresentarAlerta, TipoAlerta } from "@/app/utils/apresentarAlertas";
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
      console.error(`Erro ao tentar-se listar as categorias: ${ e }`);
      apresentarAlerta("Erro ao tentar-se listar as categorias, tente novamente!", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  // deletar categoria de produto
  const deletarCategoria = async (categoria: CategoriaProduto) => {

  }

  // visualizar dados da categoria do produto
  const visualizarCategoria = (categoria: CategoriaProduto): void => {

  }

  useFocusEffect(useCallback(() => {
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

              } }
              onEditar={ () => {

              } }
              onDeletar={ () => {
                
              } } />
          );
        } } /> } 
    </Tela>
  );
}

export default Categorias;