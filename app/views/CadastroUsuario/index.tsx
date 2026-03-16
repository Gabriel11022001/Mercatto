import BotaoPadrao from "@/app/components/BotaoPadrao";
import Campo, { TipoCampo } from "@/app/components/Campo";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import { cadastrarUsuarioFirebase, editarDataUltimoLoginUsuario } from "@/app/firebase/gestaoUsuario";
import { Usuario } from "@/app/type/usuario";
import { apresentarAlerta, TipoAlerta } from "@/app/utils/apresentarAlertas";
import obterDataAcrescidoMinutos from "@/app/utils/obterDataAcrescidoMinutos";
import obterDataAtual from "@/app/utils/obterDataAtual";
import obterDataFormatada from "@/app/utils/obterDataFormatada";
import validarEmail from "@/app/utils/validarEmail";
import { validarTelefone } from "@/app/utils/validarTelefone";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

enum TipoCampoCadastroUsuario {
  
  nomeCompleto,
  telefone,
  email,
  senha,
  confirmarSenha
  
}

// tela de cadastro de usuário
const CadastroUsuario = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ nomeCompleto, setNomeCompleto ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ telefone, setTelefone ] = useState<string>("");
  const [ senha, setSenha ] = useState<string>("");
  const [ confirmarSenha, setConfirmarSenha ] = useState<string>("");
  const [ erroNome, setErroNome ] = useState<string>("");
  const [ erroEmail, setErroEmail ] = useState<string>("");
  const [ erroTelefone, setErroTelefone ] = useState<string>("");
  const [ erroSenha, setErroSenha ] = useState<string>("");
  const [ erroConfirmarSenha, setErroConfirmarSenha ] = useState<string>("");
  const [ senhaVisivel, setSenhaVisivel ] = useState<boolean>(false);
  const [ confirmarSenhaVisivel, setConfirmarSenhaVisivel ] = useState<boolean>(false);

  const onDigitar = (valorDigitado: string, tipo: TipoCampoCadastroUsuario): void => {

    // digitar nome completo
    if (tipo === TipoCampoCadastroUsuario.nomeCompleto) {
      setNomeCompleto(valorDigitado);
      setErroNome("");

      if (valorDigitado.trim().length === 0) {
        setErroNome("Informe o nome");
      }

    }

    if (tipo === TipoCampoCadastroUsuario.email) {
      setErroEmail("");
      setEmail(valorDigitado);

      if (valorDigitado.trim().length === 0) {
        setErroEmail("Informe o e-mail");
      } else if (!validarEmail(valorDigitado.trim())) {
        setErroEmail("Informe um e-mail válido.");
      }

    }

    if (tipo === TipoCampoCadastroUsuario.telefone) {
      setTelefone(valorDigitado);
      setErroTelefone("");

      if (valorDigitado.trim().length === 0) {
        setErroTelefone("Informe o telefone");
      } else if (!validarTelefone(valorDigitado.trim())) {
        setErroTelefone("Informe um telefone válido.");
      }

    }

    if (tipo === TipoCampoCadastroUsuario.senha) {
      setSenha(valorDigitado);
      setErroSenha("");

      if (valorDigitado.trim().length === 0) {
        setErroSenha("Informe a senha");
      } else if (valorDigitado != confirmarSenha) {
        setErroConfirmarSenha("A senha e a senha de confirmação não são iguais");
      }

    }

    if (tipo === TipoCampoCadastroUsuario.confirmarSenha) {
      setConfirmarSenha(valorDigitado);
      setErroConfirmarSenha("");

      if (valorDigitado.trim().length === 0) {
        setErroConfirmarSenha("Informe a senha de confirmação");
      } else if (senha != valorDigitado) {
        setErroConfirmarSenha("A senha e a senha de confirmação não são iguais");
      }

    }

  }

  const getBotaoHabilitado = (): boolean => {

    return erroNome === ""
      && erroEmail === ""
      && erroTelefone === ""
      && erroSenha === ""
      && erroConfirmarSenha === ""
      && nomeCompleto != ""
      && email != ""
      && telefone != ""
      && senha != ""
      && confirmarSenha != "" 
  }

  // cadastrar usuário
  const cadastrarUsuario = async () => {

    try {
      setCarregando(true);

      const usuario: Usuario = {
        nome: nomeCompleto.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
        senha: senha.trim(),
        ativo: true
      }

      await cadastrarUsuarioFirebase(usuario);

      apresentarAlerta("Cadastro efetuado com sucesso.", TipoAlerta.sucesso);

      // efetuar uma autenticação do usuário que acabou de ser cadastrado
      await autenticarUsuario(usuario);
      
      await salvarDadosUsuarioSecao(usuario);

      navigation.replace("home");
    } catch (e) {
      apresentarAlerta("Erro no cadastro, tente novamente.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  const salvarDadosUsuarioSecao = async ({ id, nome, dataUltimoLogin }: Usuario) => {
    const dataDeslogar: Date = obterDataAcrescidoMinutos(dataUltimoLogin ?? "");
    const dataDeslogarFormatada: string = obterDataFormatada(dataDeslogar);

    await AsyncStorage.setItem("@usuario_logado", JSON.stringify({
      id: id,
      nome: nome,
      dataDeslogar: dataDeslogarFormatada
    }));

    console.log("Dados do usuário salvo em seção.");
  }
  
  // autenticar o usuário e redirecionar para a home
  const autenticarUsuario = async (usuario: Usuario) => {

    try {
      usuario.dataUltimoLogin = obterDataAtual();

      await editarDataUltimoLoginUsuario(usuario);
    } catch (e) {
      apresentarAlerta("Erro na autenticação.", TipoAlerta.erro);
    }

  }

  return (
    <Tela>
      <Loader carregando={ carregando } msg="Registrando-se, aguarde..." />
      <ScrollView showsVerticalScrollIndicator={ false }>
        <Text style={  styles.txtCadastrarUsuarioTitulo }>Registrar-se</Text>
        <Text style={ styles.txtCadastrarUsuarioSubtitulo }>Crie sua conta para começar</Text>
        { /** campo para o usuário informar o nome completo */ }
        <Campo
          valor={ nomeCompleto }
          tipoCampo={ TipoCampo.nomeUsuario }
          habilitado={ true }
          label="Nome completo"
          erro={ erroNome }
          onVisualizarSenha={ () => {} }
          senhaVisivel
          alterarValor={ (nomeDigitado: string) => {
            onDigitar(nomeDigitado, TipoCampoCadastroUsuario.nomeCompleto);
          } } />
        { /** campo para o usuário informar o e-mail */ }
        <Campo
          valor={ email }
          tipoCampo={ TipoCampo.email }
          habilitado={ true }
          label="E-mail"
          erro={ erroEmail }
          onVisualizarSenha={ () => {} }
          senhaVisivel
          alterarValor={ (emailDigitado: string) => {
            onDigitar(emailDigitado, TipoCampoCadastroUsuario.email);
          } } />
        { /** campo para o usuário informar o telefone */ }
        <Campo
          valor={ telefone }
          tipoCampo={ TipoCampo.telefone }
          habilitado={ true }
          label="Telefone"
          erro={ erroTelefone }
          onVisualizarSenha={ () => {} }
          senhaVisivel
          alterarValor={ (telefoneDigitado: string) => {
            onDigitar(telefoneDigitado, TipoCampoCadastroUsuario.telefone);
          } } />
        { /** campo para o usuário informar a senha */ }
        <Campo
          valor={ senha }
          tipoCampo={ TipoCampo.senha }
          habilitado={ true }
          label="Senha"
          erro={ erroSenha }
          onVisualizarSenha={ () => setSenhaVisivel(!senhaVisivel) }
          senhaVisivel={ senhaVisivel }
          alterarValor={ (senhaDigitada: string) => {
            onDigitar(senhaDigitada, TipoCampoCadastroUsuario.senha);
          } } />
        { /** campo para o usuário informar a confirmação de senha */ }
        <Campo
          valor={ confirmarSenha }
          tipoCampo={ TipoCampo.senha }
          habilitado={ true }
          label="Confirmar Senha"
          erro={ erroConfirmarSenha }
          onVisualizarSenha={ () => setConfirmarSenhaVisivel(!confirmarSenhaVisivel) }
          senhaVisivel={ confirmarSenhaVisivel }
          alterarValor={ (confirmarSenhaDigitado: string) => {
            onDigitar(confirmarSenhaDigitado, TipoCampoCadastroUsuario.confirmarSenha);
          } } />
        <BotaoPadrao
          titulo="Cadastrar"
          habilitado={ getBotaoHabilitado() }
          onPressionar={ cadastrarUsuario } />
        <View style={ styles.containerJaEstaCadastrado }>
          <Text style={ styles.txtJaEstaCadastrado }>Já têm uma conta?</Text>
          <TouchableOpacity onPress={ () => {
            navigation.goBack();
          } } >
            <Text style={ styles.txtBtnRedirecionarTelaLogin }>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Tela>
  );
}

export default CadastroUsuario;