import AsyncStorage from "@react-native-async-storage/async-storage";
import { apresentarAlerta, TipoAlerta } from "./apresentarAlertas";

// validar secão do usuário logado, caso tenha expirado, redirecionar a tela de login
const validarSecaoUsuario = async (navigation: any) => {

  try {
    const usuarioLogadoString = await AsyncStorage.getItem("@usuario_logado");

    if (usuarioLogadoString) {
      const usuarioLogado = JSON.parse(usuarioLogadoString);

      if (usuarioLogado) {
        const dataDeslogar: string = usuarioLogado.dataDeslogar;

        const [ dataParte, horarioParte ] = dataDeslogar.includes(",") ? dataDeslogar.split(",") : dataDeslogar.split(" ");
        const [ dia, mes, ano ] = dataParte.split("-");
        const [ hora, minuto, segundo ] = horarioParte.trim().split(":");

        const dataDeslogarDate: Date = new Date(
          Number(ano),
          Number(mes) - 1,
          Number(dia),
          Number(hora),
          Number(minuto),
          Number(segundo)
        );

        const agora: Date = new Date();

        if (dataDeslogarDate <= agora) {
          // deslogar o usuário
          console.log("Deslogar o usuário.");
          AsyncStorage.removeItem("@usuario_logado");
          console.log("Deslogado com sucesso.");

          apresentarAlerta("Sua seção foi expirada, logue novamente.", TipoAlerta.aviso);

          navigation.replace("login");
        }
          
      }

    }

  } catch (e) {
    console.error(`Erro: ${ e }`);

    apresentarAlerta("Erro validar secão.", TipoAlerta.erro);
  }

}

export default validarSecaoUsuario;