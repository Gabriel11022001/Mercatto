import CategoriaProduto from "./categoriaProduto";

export enum StatusProduto {

  estoque_disponivel,
  sem_estoque

}

export type Produto = {

  id?: string;
  nomeProduto: string;
  descricao: string;
  preco: number;
  precoComDesconto?: number;
  categoria?: CategoriaProduto;
  ativo: boolean;
  statusEstoque: string;
  estoque: number;

}