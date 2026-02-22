import BotaoPadrao from "@/app/components/BotaoPadrao";
import Campo, { TipoCampo } from "@/app/components/Campo";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import { useState } from "react";
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
      navigation.navigate("home");
    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

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