import { db } from "@/firebase_config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import CategoriaProduto from "../type/categoriaProduto";

// cadastrar categoria de produto no firebase
export const cadastrarCategoriaFirebase = async (categoriaCadastrar: CategoriaProduto) => {
  
  try {

    const docRefCadastrarCategoria = await addDoc(collection(db, "categorias_produtos"), {
      nome_categoria: categoriaCadastrar.nomeCategoria,
      status: categoriaCadastrar.status
    });

    console.log("Categoria cadastrada com sucesso no firebase!");

    categoriaCadastrar.id = docRefCadastrarCategoria.id;

    return categoriaCadastrar;
  } catch (e) {
    console.error(`Erro ao tentar-se cadastrar a categoria: ${ e }`);

    throw e;
  }

}

// editar categoria de produto no firebase
export const editarCategoriaFirebase = async (categoriaEditar: CategoriaProduto) => {

}

// listar as categorias de produto cadastradas no firebase
export const listarCategoriasFirebase = async () => {

  try {
    const querySnapshot = await getDocs(collection(db, "categorias_produtos"));

    const categorias: CategoriaProduto[] = [];

    querySnapshot.forEach(categoria => {
      categorias.push({
        id: categoria.id,
        nomeCategoria: categoria.data().nome_categoria,
        status: categoria.data().status
      });
    });

    return categorias;
  } catch (e) {

    throw e;
  }

}

// alterar o status da categoria do produto no firebase
export const alterarStatusCategoriaFirebase = async (id: string, novoStatus: boolean) => {

}

// buscar categoria pelo id no firebase
export const buscarCategoriaPeloIdFirebase = async (id: string) => {

}