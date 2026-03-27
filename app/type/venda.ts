import { Cliente } from "./cliente";

export type ItemVenda = {

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

}