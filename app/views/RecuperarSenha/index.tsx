import AlertaRecuperacaoSenha, { TipoAlertaRecuperacaoSenha } from "@/app/components/AlertaRecuperacaoSenha";
import BotaoProsseguir from "@/app/components/BotaoProsseguir";
import Campo, { TipoCampo } from "@/app/components/Campo";
import Tela from "@/app/components/Tela";
import { log } from "@/app/utils/log";
import validarEmail from "@/app/utils/validarEmail";
import { config } from "@/config";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";

type CampoEmail = {

  email: string;
  erro: string;

}

// tela de recuperar senha
const RecuperarSenha = () => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ erro, setErro ] = useState<string>("");
  const [ msgSucesso, setMsgSucesso ] = useState<string>("");
  const [ emailController, setEmailController ] = useState<CampoEmail>({
    email: "",
    erro: ""
  });

  const onDigitarEmail = (email: string) => {
    const emailControllerNovo: CampoEmail = { email: email, erro: "" }

    if (email.trim().length === 0) {
      emailControllerNovo.erro = "Informe o e-mail.";
    } else if (!validarEmail(email)) {
      emailControllerNovo.erro = "Informe um e-mail válido.";
    }

    setEmailController(emailControllerNovo);
  }

  // enviar o link de recuperação do e-mail
  const enviarLinkRecuperacaoEmail = async () => {
    setCarregando(true);
    setErro("");
    setMsgSucesso("");

    try {

      if (emailController.email.trim().length == 0) {
        setEmailController({ email: emailController.email, erro: "Informe o e-mail." });

        return;
      }

      if (!validarEmail(emailController.email)) {
        setEmailController({ email: emailController.email, erro: "Informe um e-mail válido." });
        
        return;
      }

      log.debug("Recuperar senha do e-mail: " + emailController.email);

      setMsgSucesso("O envio do link de recuperação da senha foi efetuado com sucesso ao e-mail " + emailController.email);
    } catch (e) {
      log.erro("Erro ao tentar-se recuperar a senha do e-mail: " + emailController.email);

      setErro("Erro ao tentar-se recuperar a senha pelo e-mail " + emailController.email + ", tente novamente ou entre em contato com o admnistrador para obter a senha");
    } finally {
      setCarregando(false);
    }

  }

  useEffect(() => {

    if (erro != "" || msgSucesso != "") {
      setTimeout(() => {
        setErro("");
        setMsgSucesso("");
      }, 5000);
    }

  }, [ erro, msgSucesso ]);

  return <Tela>
    { carregando ? <View style={ styles.containerLoader }>
      <ActivityIndicator 
        color={ config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000" }
        size={ 100 } />
      <Text style={ styles.txtLoader }>Estamos enviando o link de recuperação de senha para o e-mail informado, aguarde...</Text>
    </View> : <ScrollView showsVerticalScrollIndicator={ false }>
      <Text style={ styles.titulo }>Recuperação de senha</Text>
      <Text style={ styles.textoEnviarLink }>Digite seu e-mail abaixo e enviaremos um link de recuperação de senha.</Text>
      <AlertaRecuperacaoSenha
        mensagem={ msgSucesso != "" ? msgSucesso : erro }
        tipo={ msgSucesso != "" ? TipoAlertaRecuperacaoSenha.sucesso : TipoAlertaRecuperacaoSenha.erro } />
      <Campo
        valor={ emailController.email }
        erro={ emailController.erro }
        habilitado={ true }
        label="E-mail"
        senhaVisivel={ true }
        onVisualizarSenha={ () => {} }
        tipoCampo={ TipoCampo.email }
        alterarValor={ (emailInformado: string) => {
          onDigitarEmail(emailInformado);
        } } />
      <BotaoProsseguir titulo="Enviar Link" onProsseguir={ () => {
        enviarLinkRecuperacaoEmail();
      } } />
    </ScrollView> }
  </Tela>
}

export default RecuperarSenha;