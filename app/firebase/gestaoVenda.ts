import { db } from "@/firebase_config";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { Cliente } from "../type/cliente";
import { Produto } from "../type/produto";
import { ItemVenda, Venda } from "../type/venda";
import { buscarClientePeloIdFirebase } from "./buscarCliente";
import { buscarProdutoPeloIdFirebase } from "./gestaoProduto";

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
      status: venda.status,
      forma_pagamento: venda.formaPagamento ?? ""
    });

    console.log("Venda atualizada com sucesso.");
    console.log(venda);

    if (venda.itemsVenda && venda.itemsVenda.length > 0) {

      for (let i: number = 0; i < venda.itemsVenda.length; i++) {
        const item: ItemVenda = venda.itemsVenda[ i ];

        const refAdicionarItem = await addDoc(collection(db, "items"), {
          venda_id: venda.id ?? "",
          valor_unitario_produto: item.valorUnitarioProduto,
          produto_id: item.produtoId ?? "",
          unidades: item.unidades
        });

        console.log("Item registrado com sucesso: " + refAdicionarItem.id);

        // debitar estoque do produto
        const produto: Produto | null = await buscarProdutoPeloIdFirebase(item.produtoId ?? "");

        if (produto != null) {
          let quantidadeSobrouEstoque: number = 0;

          if ((produto.estoque - item.unidades) <= 0) {
            quantidadeSobrouEstoque = 0;
          } else {
            quantidadeSobrouEstoque = produto.estoque - item.unidades;
          }

          const docRefEditarProduto = doc(db, "produtos", produto.id ?? "");

          await updateDoc(docRefEditarProduto, {
            estoque: quantidadeSobrouEstoque,
            status_estoque: quantidadeSobrouEstoque === 0 ? "sem_estoque" : "estoque_disponivel"
          });

          console.log(`Estoque do produto ${ produto.nomeProduto } debitado com sucesso.`);
        }

      }

    }

  } catch (e) {

    throw e;
  }

}

// definir a venda como rascunho
export const definirVendaRascunhoFirebase = async (venda: Venda) => {

  try {
    const docRef = doc(db, "vendas", venda.id ?? "");

    await updateDoc(docRef, {
      status: "rascunho",
      cliente_id: venda.clienteId ?? "",
      forma_pagamento: venda.formaPagamento ?? ""
    });

    console.log("Venda salva como rascunho: " + venda.id);
  } catch (e) {

    throw e;
  }

}

// listar as vendas no firebase
export const listarVendasFirebase = async () => {

  try {
    const querySnapshot = await getDocs(collection(db, "vendas"));

    const vendas: Array<Venda> = [];

    for (const v of querySnapshot.docs) {
      // buscar dados do cliente
      let cliente: Cliente | null = null;

      if (v.data().cliente_id) {
        cliente = await buscarClientePeloIdFirebase(v.data().cliente_id);
      }
      
      const venda: Venda = {
        id: v.id,
        dataInicioVenda: v.data().data_inicio_venda,
        dataConclusaoVenda: v.data().data_conclusao,
        status: v.data().status,
        valorTotal: v.data().valor_total,
        cliente: cliente ?? undefined,
        clienteId: v.data().cliente_id,
        formaPagamento: v.data().forma_pagamento,
        itemsVenda: []
      }

      vendas.push(venda);
    }

    return vendas;
  } catch (e) {
    console.log(e);

    throw e;
  }

}