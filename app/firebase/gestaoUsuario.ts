import { db } from "@/firebase_config";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
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

// buscar o usuário pelo e-mail e senha
export const buscarUsuarioPeloEmailSenha = async (email: string, senha: string) => {

  try {
    const queryConsultarUsuario = query(
      collection(db, "usuarios"),
      where("email", "==", email.trim()),
      where("senha", "==", senha.trim())
    );

    const querySnapshot = await getDocs(queryConsultarUsuario);

    if (querySnapshot.empty) {

      return null;
    }

    const usuario: Usuario = {
      id: querySnapshot.docs[ 0 ].id,
      nome: querySnapshot.docs[ 0 ].data().nome,
      email: querySnapshot.docs[ 0 ].data().email,
      telefone: querySnapshot.docs[ 0 ].data().telefone,
      senha: querySnapshot.docs[ 0 ].data().senha,
      ativo: querySnapshot.docs[ 0 ].data().ativo,
      dataUltimoLogin: querySnapshot.docs[ 0 ].data().data_ultimo_login
    }

    return usuario;
  } catch (e) {

    throw e;
  }

}