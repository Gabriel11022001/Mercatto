import { FotoProduto } from "../views/CadastroProduto";
import CategoriaProduto from "./categoriaProduto";

export enum StatusProduto {

  estoque_disponivel,
  sem_estoque

}

export type Produto = {

  id?: string;
  nomeProduto: string;
  descricao: string;
  preco: number | string;
  precoComDesconto?: number | string;
  categoria?: CategoriaProduto;
  ativo: boolean;
  statusEstoque: string;
  estoque: number;
  fotos?: Array<FotoProduto>;

}