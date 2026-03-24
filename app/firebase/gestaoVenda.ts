import { db } from "@/firebase_config";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Venda } from "../type/venda";

// registrar venda no inicio do fluxo
export const registrarVendaInicioFluxo = async (venda: Venda) => {

  try {
    const docRefCadastrarVenda = await addDoc(collection(db, "vendas"), {
      data_inicio_venda: venda.dataInicioVenda,
      status: venda.status,
      valor_total: 0      
    });

    venda.id = docRefCadastrarVenda.id;
  } catch (e) {

    throw e;
  }

}

// atualizar os dados da venda
export const atualizarVenda = async (venda: Venda) => {

  try {
    const docRef = doc(db, "vendas", venda.id ?? "");

    await updateDoc(docRef, {
      valor_total: venda.valorTotal ?? 0,
      cliente_id: venda.clienteId ?? "",
      data_conclusao: venda.dataConclusaoVenda ?? "",
      status: venda.status
    });

    console.log("Venda atualizada com sucesso.");
    console.log(venda);

    if (venda.itemsVenda && venda.itemsVenda.length > 0) {
      // definir os items da venda
    }

  } catch (e) {

    throw e;
  }

}