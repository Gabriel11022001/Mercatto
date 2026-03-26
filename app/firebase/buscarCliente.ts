import { db } from "@/firebase_config";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
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
export const buscarClientePeloEmailFirebase = async (email: string) => {

  try {
    const queryConsultarCliente = query(
      collection(db, "clientes"),
      where("email", "==", email.trim())
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

// buscar o cliente pelo id no firebase
export const buscarClientePeloIdFirebase = async (id: string) => {

  try {
    const clienteRef = doc(db, "clientes", id);
    const snapshot = await getDoc(clienteRef);

    if (snapshot.exists()) {
      
      let cliente: Cliente | null = !snapshot.exists ? null : {
        id: snapshot.id ?? "",
        nome: snapshot.data().nome,
        cpf: snapshot.data().cpf,
        email: snapshot.data().email,
        telefone: snapshot.data().telefone,
        dataNascimento: snapshot.data().data_nascimento,
        genero: snapshot.data().genero,
        foto: snapshot.data().foto,
        endereco: {
          cep: snapshot.data().cep,
          complemento: snapshot.data().complemento,
          endereco: snapshot.data().endereco,
          cidade: snapshot.data().cidade,
          bairro: snapshot.data().bairro,
          numero: snapshot.data().numero,
          uf: snapshot.data().uf
        }
      };

      return cliente;
    } else {
    
      return null
    }

  } catch (e) {

    throw e;
  }

}