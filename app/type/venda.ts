import { Cliente } from "./cliente";
import { Produto } from "./produto";

export interface ItemVenda {

  id?: string;
  valorUnitarioProduto: number;
  unidades: number;
  produtoId?: string;

}

export type Venda = {

  id?: string;
  dataInicioVenda: string;
  dataConclusaoVenda?: string;
  valorTotal: number;
  status: string;
  clienteId?: string;
  itemsVenda?: Array<ItemVenda>;
  formaPagamento?: string;
  cliente?: Cliente;
  itemsVendaDetalhes?: Array<ItemVendaDetalhes>;

}

export interface ItemVendaDetalhes extends ItemVenda {

  produto?: Produto;

}