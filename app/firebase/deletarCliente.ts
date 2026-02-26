import { db } from "@/firebase_config";
import { deleteDoc, doc } from "firebase/firestore";

// deletar o cliente no firebase
const deletarClienteFirebase = async (idClienteDeletar: string) => {

  try {
    await deleteDoc(doc(db, "clientes", idClienteDeletar));

    console.log("Cliente deletado com sucesso!");
  } catch (e) {

    throw e;
  }

}

export default deletarClienteFirebase;