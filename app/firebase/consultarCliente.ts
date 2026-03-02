import { db } from "@/firebase_config";
import { doc, getDoc } from "firebase/firestore";
import { Cliente } from "../type/cliente";

// consultar o cliente no firebase
export const consultarClienteFirebase = async (id: string) => {

  try {
    const clienteRef = doc(db, "clientes", id);
    const snapshot = await getDoc(clienteRef);

    if (snapshot.exists()) {
      
      const cliente: Cliente = {
        id: snapshot.id.toString(),
        nome: snapshot.data().nome,
        cpf: snapshot.data().cpf,
        email: snapshot.data().email,
        telefone: snapshot.data().telefone,
        genero: snapshot.data().genero,
        dataNascimento: snapshot.data().data_nascimento,
        endereco: {
          cep: snapshot.data().cep,
          complemento: snapshot.data().complemento,
          endereco: snapshot.data().endereco,
          bairro: snapshot.data().bairro,
          cidade: snapshot.data().cidade,
          uf: snapshot.data().uf,
          numero: snapshot.data().numero
        }
      }

      return cliente;
    } else {
    
      return null
    }

  } catch (error) {
    console.error("Erro ao consultar cliente:", error);

    throw error;
  }

}