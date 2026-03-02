import { db } from "@/firebase_config";
import { doc, updateDoc } from "firebase/firestore";
import { Cliente } from "../type/cliente";

// editar cliente no firebase
export const editarClienteFirebase = async (cliente: Cliente) => {

  if (!cliente.id) {
    
    throw new Error("Cliente não possui ID para edição.");
  }

  try {
    const docRef = doc(db, "clientes", cliente.id);

    await updateDoc(docRef, {
      nome: cliente.nome.trim(),
      cpf: cliente.cpf.trim(),
      email: cliente.email.trim(),
      telefone: cliente.telefone.trim(),
      data_nascimento: cliente.dataNascimento.trim(),
      genero: cliente.genero.trim(),
      cep: cliente.endereco.cep.trim(),
      complemento: cliente.endereco.complemento.trim(),
      endereco: cliente.endereco.endereco.trim(),
      cidade: cliente.endereco.cidade.trim(),
      bairro: cliente.endereco.bairro.trim(),
      uf: cliente.endereco.uf.trim(),
      numero: cliente.endereco.numero.trim()
    });

    console.log("Cliente atualizado com sucesso.");

    return cliente;
  } catch (e) {
    console.log("Erro ao tentar atualizar o cliente: " + e);

    throw e;
  }

}