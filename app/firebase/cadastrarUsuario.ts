import { db } from "@/firebase_config";
import { addDoc, collection } from "firebase/firestore";
import { Cliente } from "../type/cliente";

// cadastrar usuário no firebase
const cadastrarClienteFirebase = async (cliente: Cliente) => {
  
  try {
    const docRefCadastrarCliente = await addDoc(collection(db, "clientes"), {
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
      numero: cliente.endereco.numero.trim(),
      criado_em: new Date()
    });

    console.log("Cliente cadastrado com sucesso: " + docRefCadastrarCliente.id);

    cliente.id = docRefCadastrarCliente.id;

    return cliente;
  } catch (e) {
    console.log("Erro ao tentar-se cadastrar o cliente na base de dados: " + e);

    throw e;
  }

}

export default cadastrarClienteFirebase;