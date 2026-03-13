import { db } from "@/firebase_config";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Usuario } from "../type/usuario";
import obterDataAtual from "../utils/obterDataAtual";

// cadastrar usuário no firebase
export const cadastrarUsuarioFirebase = async (usuario: Usuario) => {
  
  try {
    const docRefCadastrarUsuario = await addDoc(collection(db, "usuarios"), {
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone,
      senha: usuario.senha,
      ativo: usuario.ativo,
      data_cadastro: obterDataAtual(),
      data_ultimo_login: ""
    });
    
    usuario.id = docRefCadastrarUsuario.id;

    console.log("Usuário cadastrado com sucesso.");

    return usuario;  
  } catch (e) {

    throw e;
  }

}

// editar data do ultimo login do usuário
export const editarDataUltimoLoginUsuario = async (usuario: Usuario) => {

  try {
    const docRef = doc(db, "usuarios", usuario.id ?? "");

    await updateDoc(docRef, {
      data_ultimo_login: usuario.dataUltimoLogin
    });

    return usuario;
  } catch (e) {

    throw e;
  }

}