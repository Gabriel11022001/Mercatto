import { FluxoVendaContext } from "@/context";
import { useContext } from "react";

export default function useFluxoVenda() {

  const context = useContext(FluxoVendaContext);

  if (!context) {
    
    throw new Error("useFluxoVenda deve ser usado dentro do FluxoVendaProvider");
  }

  return context;
}