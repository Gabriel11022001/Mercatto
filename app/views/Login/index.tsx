import BotaoPadrao from "@/app/components/BotaoPadrao";
import Campo, { TipoCampo } from "@/app/components/Campo";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import { buscarUsuarioPeloEmailSenha } from "@/app/firebase/gestaoUsuario";
import { Usuario } from "@/app/type/usuario";
import { apresentarAlerta, TipoAlerta } from "@/app/utils/apresentarAlertas";
import obterDataAcrescidoMinutos from "@/app/utils/obterDataAcrescidoMinutos";
import obterDataAtual from "@/app/utils/obterDataAtual";
import obterDataFormatada from "@/app/utils/obterDataFormatada";
import validarEmail from "@/app/utils/validarEmail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

// tela de login
const Login = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ email, setEmail ] = useState<string>("");
  const [ senha, setSenha ] = useState<string>("");
  const [ erroEmail, setErroEmail ] = useState<string>("");
  const [ erroSenha, setErroSenha ] = useState<string>("");
  const [ senhaVisivel, setSenhaVisivel ] = useState<boolean>(false);

  const onDigitarEmail = (emailDigitado: string): void => {
    setEmail(emailDigitado);
    setErroEmail("");

    if (emailDigitado
      .trim()
      .length === 0
    ) {
      setErroEmail("Informe o e-mail");
    } else if (!validarEmail(email.trim())) {
      setErroEmail("Informe um e-mail inválido.");
    }

  }

  const onDigitarSenha = (senhaDigitada: string): void => {
    setSenha(senhaDigitada);
    setErroSenha("");

    if (senhaDigitada
      .trim()
      .length === 0
    ) {
      setErroSenha("Informe a senha");
    }

  }

  // efetuar login
  const login = async () => {
    setCarregando(true);

    try {
      console.log("Efetuando login...");

      const usuarioLogin: Usuario | null = await buscarUsuarioPeloEmailSenha(email, senha);

      if (usuarioLogin != null) {
        // encontrou o usuário na base
        await salvarDadosUsuarioSecao(usuarioLogin);

        // redirecionar o usuário para a tela home
        navigation.replace("home");

        apresentarAlerta("Login efetuado com sucesso.", TipoAlerta.sucesso);
      } else {
        apresentarAlerta("E-mail ou senha inválidos.", TipoAlerta.erro);
      }

    } catch (e) {
      console.error(`Erro ao tentar-se realizar login: ${ e }`);
      apresentarAlerta("Erro no login, tente novamente.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  // salvar dados do usuário
  const salvarDadosUsuarioSecao = async ({ id, nome, dataUltimoLogin }: Usuario) => {
    await AsyncStorage.setItem("@usuario_logado", JSON.stringify({
      id: id,
      nome: nome,
      dataDeslogar: obterDataFormatada(obterDataAcrescidoMinutos(obterDataAtual()))
    }));

    console.log("Dados do usuário salvos.");
  }

  // efetuar login automático
  const loginAutomatico = async () => {

    try {
      setCarregando(true);

      const usuarioLogadoString = await AsyncStorage.getItem("@usuario_logado");

      if (usuarioLogadoString) {
        const usuarioLogadoJson = JSON.parse(usuarioLogadoString);

        if (usuarioLogadoJson) {
          const dataDeslogar: string = usuarioLogadoJson.dataDeslogar;

          const [ dataParte, horarioParte ] = dataDeslogar.trim().split(",");
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
          } else {
            // redirecionar para a home
            navigation.replace("home");
          }

        }

      }

    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

  useFocusEffect(useCallback(() => {

    try {
      setEmail("");
      setSenha("");
      setErroEmail("");
      setErroSenha("");
      setSenhaVisivel(false);

      loginAutomatico();
    } catch (e) {

    }

  }, []));

  return (
    <Tela>
      { /** tela de carregamento da aplicação */ }
      <Loader msg="Efetuando login, aguarde..." carregando={ carregando } />
      <ScrollView showsVerticalScrollIndicator={ false }>
        <View style={ styles.containerLogo }>
          <Image style={ styles.logo } source={ require("@/assets/images/logo.png") } />
        </View>
        <Text style={ styles.txtEntrar }>Entrar</Text>
        <Text style={ styles.txtFacaLogin }>Faça login para continuar.</Text>
        { /** campo para o usuário informar o e-mail */ }
        <Campo
          valor={ email }
          alterarValor={ onDigitarEmail }
          label="Seu e-mail"
          habilitado={ true }
          tipoCampo={ TipoCampo.email }
          erro={ erroEmail }
          senhaVisivel
          onVisualizarSenha={ () => {} } />
        { /** campo para o usuário informar o a senha */ }
        <Campo
          valor={ senha }
          alterarValor={ onDigitarSenha }
          label="Sua senha"
          habilitado={ true }
          tipoCampo={ TipoCampo.senha }
          erro={ erroSenha }
          senhaVisivel={ senhaVisivel }
          onVisualizarSenha={ () => {
            setSenhaVisivel(!senhaVisivel);
          } } />
        { /** botão esqueci minha senha */ }
        <View style={ styles.containerEsqueciSenha }>
          <TouchableOpacity onPress={ () => {

          } } >
            <Text style={ styles.txtEsqueciSenha }>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
        { /** botão para o usuário efetuar login no app */ }
        <BotaoPadrao titulo="Entrar" onPressionar={ login } habilitado={
          erroEmail === ""
          && erroSenha === ""
          && email != ""
          && senha != ""
        } />
        <View style={ styles.containerRegistro }>
          <Text style={ styles.txtNovoUsuario }>Novo usuário?</Text>
          <TouchableOpacity onPress={ () => {
            navigation.navigate("cadastro_usuario");
          } } >
            <Text style={ styles.txtBtnRegistroNovoUsuario }>Registrar-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Tela>
  );
}

export default Login;