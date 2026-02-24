import { db } from "@/firebase_config";
import { collection, getDocs } from "firebase/firestore";
import { Cliente } from "../type/cliente";

// listar clientes no firebase
const listarClientesFirebase = async () => {

  try {
    const querySnapshot = await getDocs(collection(db, "clientes"));

    const clientes: Cliente[] = [];

    querySnapshot.forEach((c) => {
      clientes.push({
        id: c.id.toString(),
        nome: c.data().nome,
        cpf: c.data().cpf,
        email: c.data().email,
        telefone: c.data().telefone,
        dataNascimento: c.data().data_nascimento,
        genero: c.data().genero,
        endereco: {
          cep: c.data().cep,
          complemento: c.data().complemento,
          endereco: c.data().endereco,
          cidade: c.data().cidade,
          bairro: c.data().bairro,
          uf: c.data().uf,
          numero: c.data().numero
        }
      });
    });

    return clientes;
  } catch (e) {
    console.error(`Erro ao tentar-se listar os clientes no firebase: ${ e }`);

    throw e;
  }

}

export default listarClientesFirebase;