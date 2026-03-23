import { db } from "@/firebase_config";
import { addDoc, collection } from "firebase/firestore";
import obterDataAtual from "./obterDataAtual";

export interface Log {

  // log de debug
  debug: (mensagem: string, json?: object) => Promise<void>;
  erro: (erro: string) => Promise<void>;

}

export const log: Log = {

  debug: async (mensagem: string, json?: object) => {
    // registrar log de debug

    try {
      await addDoc(collection(db, "logs"), {
        mensagem: mensagem,
        data_hora: obterDataAtual(),
        tipo_log: "debug",
        dados: json != null && json != undefined ? JSON.stringify(json) : ""
      });

      console.log("Log registrado com sucesso " + obterDataAtual());
    } catch (e) {

      throw e;
    }

  },
  erro: async (erro: string) => {
    // registrar log de erro

    try {
      await addDoc(collection(db, "logs"), {
        mensagem: erro,
        data_hora: obterDataAtual(),
        tipo_log: "erro"
      });

      console.log("Log de erro registrado com sucesso " + obterDataAtual());
    } catch (e) {

      throw e;
    }

  }

}