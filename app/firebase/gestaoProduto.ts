import { db } from "@/firebase_config";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Produto } from "../type/produto";
import { buscarCategoriaPeloIdFirebase } from "./gestaoCategoria";

// cadastrar produto no firebase
export const cadastrarProdutoFirebase = async (produto: Produto) => {

  try {
    const docRefCadastrarProduto = await addDoc(collection(db, "produtos"), {
      nome_produto: produto.nomeProduto,
      descricao: produto.descricao,
      ativo: produto.ativo,
      categoria_produto_id: produto.categoria?.id,
      status_estoque: produto.statusEstoque,
      estoque: produto.estoque,
      preco: produto.preco.toString(),
      preco_com_desconto: produto.precoComDesconto != undefined ? produto.precoComDesconto.toString() : ""
    });
    
    produto.id = docRefCadastrarProduto.id;

    console.log("Produto cadastrado com sucesso.");

    return produto;
  } catch (e) {

    throw e;
  }

}

// listar produtos no firebase
export const listarProdutosFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "produtos"));
    const produtos: Array<Produto> = [];

    for (const prod of querySnapshot.docs) {

      const categoria = await buscarCategoriaPeloIdFirebase(
        prod.data().categoria_produto_id
      );

      if (!categoria) {
        
        throw new Error(
          "Categoria do produto " + prod.data().nome_produto + " não encontrada."
        );
      }

      produtos.push({
        id: prod.id,
        nomeProduto: prod.data().nome_produto,
        descricao: prod.data().descricao,
        preco: prod.data().preco,
        precoComDesconto: prod.data().preco_com_desconto,
        ativo: prod.data().ativo,
        estoque: prod.data().estoque,
        statusEstoque: prod.data().status_estoque,
        categoria: {
          id: categoria.id ?? "",
          nomeCategoria: categoria.nomeCategoria,
          status: categoria.status
        }
      });
    }

    return produtos;
  } catch (e) {

    throw e;
  }
  
}

// editar produto no firebase
export const editarProdutoFirebase = async (produto: Produto) => {

  try {
    const docRef = doc(db, "produtos", produto.id ?? "");
    
    await updateDoc(docRef, {
      nome_produto: produto.nomeProduto,
      ativo: produto.ativo,
      estoque: produto.estoque,
      status_estoque: produto.statusEstoque,
      descricao: produto.descricao,
      categoria_produto_id: produto.categoria?.id ?? "",
      preco: produto.preco,
      preco_com_desconto: produto.precoComDesconto ?? ""
    });

    console.log("Produto editado com sucesso.");
  } catch (e) {

    throw e;
  }

}

// buscar produto no firebase pelo nome
export const buscarProdutoPeloNomeFirebase = async (nome: string) => {

  try {
    const queryConsultarProduto = query(
      collection(db, "produtos"),
      where("nome_produto", "==", nome.trim())
    );

    const querySnapshot = await getDocs(queryConsultarProduto);

    if (querySnapshot.empty) {

      return null;
    }

    const prod: Produto = {
      id: querySnapshot.docs[ 0 ].id,
      nomeProduto: querySnapshot.docs[ 0 ].data().nome_produto,
      descricao: querySnapshot.docs[ 0 ].data().descricao,
      preco: querySnapshot.docs[ 0 ].data().preco,
      precoComDesconto: querySnapshot.docs[ 0 ].data().preco_com_desconto,
      ativo: querySnapshot.docs[ 0 ].data().ativo,
      estoque: querySnapshot.docs[ 0 ].data().estoque,
      statusEstoque: querySnapshot.docs[ 0 ].data().status_estoque,
      categoria: {
        id: querySnapshot.docs[ 0 ].data().categoria_produto_id,
        nomeCategoria: "",
        status: true
      }
    }
    
    return prod;
  } catch (e) {
    
    throw e;
  }

}

// deletar o produto no firebase
export const deletarProdutoFirebase = async (idProduto: string) => {

}

// alterar o status do produto no firebase
export const alterarStatusProdutoFirebase = async (id: string, novoStatus: boolean) => {

}

// buscar o produto pelo id no firebase
export const buscarProdutoPeloIdFirebase = async (id: string) => {

  try {    
    const produtoRef = doc(db, "produtos", id);
    const snapshot = await getDoc(produtoRef);

    if (snapshot.exists()) {
      
      const produto: Produto = {
        id: snapshot.id,
        nomeProduto: snapshot.data().nome_produto,
        ativo: snapshot.data().ativo,
        descricao: snapshot.data().descricao,
        estoque: snapshot.data().estoque,
        statusEstoque: snapshot.data().status_estoque,
        preco: snapshot.data().preco,
        precoComDesconto: snapshot.data().preco_com_desconto,
        categoria: {
          id: snapshot.data().categoria_produto_id,
          nomeCategoria: "",
          status: true
        }
      }
      
      return produto;
    } else {
    
      return null
    }

  } catch (e) {

    throw e;
  }

}

// validar se o produto está vinculado a vendas na base de dados
export const validarProdutoVinculadoVendas = async (id: string) => {

  try {
    const q = query(
      collection(db, "items"),
      where("produto_id", "==", id)
    );

    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  } catch (e) {
  
    throw e;
  }

}