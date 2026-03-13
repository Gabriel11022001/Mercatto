import { db } from "@/firebase_config";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
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

  try {
    const docRef = doc(db, "categorias_produtos", id);

    await updateDoc(docRef, {
      status: novoStatus
    });

    console.log("Status da categoria altetado com sucesso.");
  } catch (e) {

    throw e;
  }

}

// buscar categoria pelo id no firebase
export const buscarCategoriaPeloIdFirebase = async (id: string) => {

  try {
    const categoriaRef = doc(db, "categorias_produtos", id);
    const snapshot = await getDoc(categoriaRef);

    if (snapshot.exists()) {
      const categoria: CategoriaProduto = {
        id: snapshot.id ?? "",
        nomeCategoria: snapshot.data().nome_categoria,
        status: snapshot.data().status
      }

      return categoria;
    } else {
    
      return null
    }

  } catch (e) {

    throw e;
  }

}

// deletar categoria no firebase
export const deletarCategoriaFirebase = async (idCategoriaDeletar: string) => {

  try {
    await deleteDoc(doc(db, "categorias_produtos", idCategoriaDeletar));

    console.log("Categoria deletada com sucesso.");
  } catch (e) {

    throw e;
  }

}

// buscar categoria pelo nome no firebase
export const buscarCategoriaPeloNomeFirebase = async (nome: string) => {

  try {
    const queryConsultarCategoria = query(
      collection(db, "categorias_produtos"),
      where("nome_categoria", "==", nome.trim())
    );

    const querySnapshot = await getDocs(queryConsultarCategoria);

    let categoria: CategoriaProduto | null = null;

    if (!querySnapshot.empty) {
      categoria = {
        id: querySnapshot.docs[ 0 ].id ?? "",
        nomeCategoria: querySnapshot.docs[ 0 ].data().nome_categoria,
        status: querySnapshot.docs[ 0 ].data().status
      };
    }

    return categoria;
  } catch (e) {

    throw e;
  }

}