import { config } from "@/config";
import Toast from "react-native-toast-message";

export enum TipoAlerta {

  erro,
  sucesso,
  aviso

}

const getTipoAlerta = (tipo: TipoAlerta) => {

  if (tipo === TipoAlerta.erro) {

    return "error";
  }

  if (tipo === TipoAlerta.aviso) {

    return "info";
  }

  return "success";
}

// apresentar um alerta para o usuário
export const apresentarAlerta = (msg: string, tipo: TipoAlerta) => {
  Toast.show({
    type: getTipoAlerta(tipo),
    text1: tipo === TipoAlerta.erro || TipoAlerta.aviso ? "Atenção!" : "Sucesso!",
    text2: msg,
    position: "bottom",
    text1Style: {
      color: config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000",
      fontSize: 18
    },
    text2Style: {
      color: config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000",
      fontSize: 15
    },
    autoHide: true,
    visibilityTime: 3000
  });
}