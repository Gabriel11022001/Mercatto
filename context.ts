import { createContext } from "react";
import { Venda } from "./app/type/venda";

export interface FluxoVendaContextType {

  venda: Venda | null;
  atualizarDadosVenda: (vendaAtualizada: Venda) => void;
  limparVenda: () => void;

}

export const FluxoVendaContext = createContext<FluxoVendaContextType | undefined>(undefined);