import { db } from "@/firebase_config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Cliente } from "../type/cliente";

// buscar cliente pelo cpf
export const buscarClientePeloCpfFirebase = async (cpf: string) => {

  try {
    const queryConsultarCliente = query(
      collection(db, "clientes"),
      where("cpf", "==", cpf.trim())
    );

    const querySnapshot = await getDocs(queryConsultarCliente);

    let cliente: Cliente | null = querySnapshot.empty ? null : {
      id: querySnapshot.docs[ 0 ].id ?? "",
      nome: querySnapshot.docs[ 0 ].data().nome,
      cpf: querySnapshot.docs[ 0 ].data().cpf,
      email: querySnapshot.docs[ 0 ].data().email,
      telefone: querySnapshot.docs[ 0 ].data().telefone,
      dataNascimento: querySnapshot.docs[ 0 ].data().data_nascimento,
      genero: querySnapshot.docs[ 0 ].data().genero,
      foto: querySnapshot.docs[ 0 ].data().foto,
      endereco: {
        cep: querySnapshot.docs[ 0 ].data().cep,
        complemento: querySnapshot.docs[ 0 ].data().complemento,
        endereco: querySnapshot.docs[ 0 ].data().endereco,
        cidade: querySnapshot.docs[ 0 ].data().cidade,
        bairro: querySnapshot.docs[ 0 ].data().bairro,
        numero: querySnapshot.docs[ 0 ].data().numero,
        uf: querySnapshot.docs[ 0 ].data().uf
      }
    };

    return cliente;
  } catch (e) {

    throw e;
  }

}

// buscar cliente pelo e-mail
export const buscarClientePeloEmail = async (email: string) => {

}