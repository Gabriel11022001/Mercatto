import { useState } from "react";
import { Venda } from "./app/type/venda";
import { FluxoVendaContext } from "./context";

// provider do fluxo de venda
export const FluxoVendaProvider = ({ children }: any) => {

  const [ venda, setVenda ] = useState<Venda | null>(null);

  const atualizarDadosVenda = (vendaAtualizada: Venda): void => {
    setVenda(vendaAtualizada);
  }

  const limparVenda = (): void => {
    setVenda(null);
  }

  return <FluxoVendaContext.Provider value={ {
    venda,
    atualizarDadosVenda,
    limparVenda
  } }>
    { children }
  </FluxoVendaContext.Provider>
}