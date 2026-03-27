import { db } from "@/firebase_config";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Cliente } from "../type/cliente";
import { Produto } from "../type/produto";
import { ItemVenda, ItemVendaDetalhes, Venda } from "../type/venda";
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

// buscar os items da venda
export const buscarItemsVendaFirebase = async (idVenda: string) => {

  try {
    const q = query(
      collection(db, "items"),
      where("venda_id", "==", idVenda)
    );

    const querySnapshot = await getDocs(q);

    const items: Array<ItemVendaDetalhes> = [];

    for (const item of querySnapshot.docs) {
      // buscar o produto
      const prod: Produto | null = await buscarProdutoPeloIdFirebase(item.data().produto_id);
      
      items.push({
        id: item.id,
        unidades: item.data().unidades,
        valorUnitarioProduto: item.data().valor_unitario_produto,
        produtoId: item.data().produto_id,
        produto: prod ?? undefined
      });
    }

    return items;
  } catch (e) {
    
    throw e;
  }

}

// biuscar a venda pelo id no firebase
export const buscarVendaPeloIdFirebase = async (id: string) => {

  try {
    const vendaRef = doc(db, "vendas", id);
    const snapshot = await getDoc(vendaRef);

    if (snapshot.exists()) {
      // consultar o cliente
      const idClienteVenda: string | undefined = snapshot.data().cliente_id;
      let cliente: Cliente | null = null;

      if (idClienteVenda) {
        cliente = await buscarClientePeloIdFirebase(idClienteVenda);
      }

      // buscar os itens da venda
      const items: Array<ItemVendaDetalhes> = await buscarItemsVendaFirebase(snapshot.id);
    
      const venda: Venda = {
        id: id,
        dataInicioVenda: snapshot.data().data_inicio_venda,
        dataConclusaoVenda: snapshot.data().data_conclusao,
        status: snapshot.data().status,
        valorTotal: snapshot.data().valor_total,
        cliente: cliente ?? undefined,
        clienteId: idClienteVenda ?? undefined,
        formaPagamento: snapshot.data().forma_pagamento ?? "",
        itemsVenda: items.map((itemDetalhes: ItemVendaDetalhes) => {

          return {
            id: itemDetalhes.id,
            unidades: itemDetalhes.unidades,
            produtoId: itemDetalhes.produtoId ?? "",
            valorUnitarioProduto: itemDetalhes.valorUnitarioProduto
          };
        }),
        itemsVendaDetalhes: items
      }

      return venda;
    } else {
    
      return null
    }

  } catch (e) {
    
    throw e;
  }

}

// deletar a venda no firebase
export const deletarVendaFirebase = async (vendaDeletar: Venda | null) => {

  try {

    if (vendaDeletar == null) {

      return;
    }

    if (vendaDeletar.itemsVenda != null && vendaDeletar.itemsVenda.length > 0) {

      for (const itemDeletar of vendaDeletar.itemsVenda) {
        // deletar item por item da venda
        await deleteDoc(doc(db, "items", itemDeletar.id ?? ""));

        console.log("Item " + (itemDeletar.id ?? "") + " deletado com sucesso da base de dados.");
      }

    }

    // deletar a venda
    await deleteDoc(doc(db, "vendas", vendaDeletar.id ?? ""));

    console.log("Venda deletada com sucesso: " + (vendaDeletar.id ?? ""));
  } catch (e) {

    throw e;
  }

}