import BotaoCancelar from "@/app/components/BotaoCancelar";
import BotaoProsseguir from "@/app/components/BotaoProsseguir";
import Campo, { TipoCampo } from "@/app/components/Campo";
import Loader from "@/app/components/Loader";
import { NaoEncontrouUsuario } from "@/app/components/NaoEncontrouUsuario";
import Tela from "@/app/components/Tela";
import { alterarSenhaUsuarioFirebase, buscarUsuarioPeloId } from "@/app/firebase/gestaoUsuario";
import { Usuario } from "@/app/type/usuario";
import { apresentarAlerta, TipoAlerta } from "@/app/utils/apresentarAlertas";
import { log } from "@/app/utils/log";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import styles from "./styles";

// tela de perfil do usuário
const Perfil = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ usuarioLogado, setUsuarioLogado ] = useState<Usuario | null>(null);
  const [ senhaAtual, setSenhaAtual ] = useState<string>("");
  const [ novaSenha, setNovaSenha ] = useState<string>("");
  const [ apresentarFormularioAlterarSenha, setApresentarFormularioAlterarSenha ] = useState<boolean>(false);
  const [ senhaAtualVisivel, setSenhaAtualVisivel ] = useState<boolean>(false);
  const [ novaSenhaVisivel, setNovaSenhaVisivel ] = useState<boolean>(false);
  const [ erroSenhaAtual, setErroSenhaAtual ] = useState<string>("");
  const [ erroNovaSenha, setErroNovaSenha ] = useState<string>("");

  // buscar os dados do usuário logado na base de dados
  const buscarDadosUsuarioLogado = async () => {

    try {
      setCarregando(true);

      const usuarioLogado = await AsyncStorage.getItem("@usuario_logado");
      const usuarioLogadoJson = JSON.parse(usuarioLogado ?? "{}");

      const respUsuarioLogado = await buscarUsuarioPeloId(usuarioLogadoJson.id);

      if (respUsuarioLogado != null) {
        setUsuarioLogado(respUsuarioLogado as Usuario);
      }

    } catch (e) {
      log.erro(`Erro ao tentar-se consultar os dados do usuário logado: ${ e }`);

      apresentarAlerta("Erro ao tentar-se consultar o usuário.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  // relizar logout do usuário
  const logout = async () => {

    try {
      await AsyncStorage.removeItem("@usuario_logado");

      navigation.replace("login");

      apresentarAlerta("Logout efetuado com sucesso.", TipoAlerta.sucesso);
    } catch (e) {
      log.erro(`Erro no logout: ${ e }`);

      apresentarAlerta("Erro no logout!", TipoAlerta.erro);
    }

  }

  useFocusEffect(useCallback(() => {
    buscarDadosUsuarioLogado();
  }, []));

  // alterar a senha do usuário logado
  const alterarSenhaUsuarioLogado = async () => {

    try {
      setCarregando(true);

      if (senhaAtual.trim().length === 0 || novaSenha.trim().length === 0) {
        apresentarAlerta("Informe os campos obrigatórios.",  TipoAlerta.erro);

        return;
      }

      if (usuarioLogado?.senha != senhaAtual.trim()) {
        apresentarAlerta("Senha atual incorreta!", TipoAlerta.erro);

        return;
      }

      await alterarSenhaUsuarioFirebase(usuarioLogado?.id ?? "", novaSenha.trim());

      apresentarAlerta("Senha alterada com sucesso.", TipoAlerta.sucesso);

      // efetuar o logout do usuário para que ele possa logar com a nova senha
      await logout();
    } catch (e) {
      log.erro(`Erro ao tentar-se alterar a senha: ${ e }`);

      apresentarAlerta("Erro ao tentar-se alterar a senha.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  // validar a senha atual
  useEffect(() => {
    setErroSenhaAtual("");
    setErroNovaSenha("");

    if (senhaAtual.trim().length === 0) {
      setErroSenhaAtual("Informe a senha atual.");
    }

  }, [ senhaAtual ]);

  // validar a nova senha
  useEffect(() => {
    setErroNovaSenha("");
    setErroSenhaAtual("");

    if (novaSenha.trim().length === 0) {
      setErroNovaSenha("Informe a nova senha.");
    }

  }, [ novaSenha ]);

  return (
    <Tela>
      <Loader carregando={ carregando } />
      <ScrollView showsVerticalScrollIndicator={ false }>
        { usuarioLogado === null ? <NaoEncontrouUsuario onRealizarLoginNovamente={ () => {
          logout();
        } } /> : <View>
          <View style={ styles.containerNomeUsuarioEmail }>
            <Text style={ styles.nomeUsuarioLogadoTopo }>{ usuarioLogado.nome }</Text>
            <View style={ styles.containerEmailUsuarioTopo }>
              <Text>{ usuarioLogado.email }</Text>
            </View>
          </View>
          <View />
          <Text style={ styles.tituloDadosPessoais }>Dados Pessoais</Text>
          <View style={ styles.containerDadosUsuario }>
            <View style={ styles.containerDadoUsuario }>
              <Text style={ styles.tituloDado }>Nome Completo</Text>
              <Text style={ styles.dado }>{ usuarioLogado.nome }</Text>
            </View>
            <View style={ styles.containerDadoUsuario }>
              <Text style={ styles.tituloDado }>E-mail</Text>
              <Text style={ styles.dado }>{ usuarioLogado.email }</Text>
            </View>
            <View style={ styles.containerDadoUsuario }>
              <Text style={ styles.tituloDado }>Telefone</Text>
              <Text style={ styles.dado }>{ usuarioLogado.telefone }</Text>
            </View>
          </View>
          <BotaoCancelar titulo="Alterar Senha" onCancelar={ () => {
            setNovaSenha("");
            setSenhaAtual("");
            setErroNovaSenha("");
            setErroSenhaAtual("");
            setNovaSenhaVisivel(false);
            setSenhaAtualVisivel(false);

            setApresentarFormularioAlterarSenha(!apresentarFormularioAlterarSenha);
          } } />
          { apresentarFormularioAlterarSenha && <View>
            { /** campo para o usuário informar a senha atual */ }
            <Campo
              valor={ senhaAtual }
              habilitado={ true }
              label="Senha Atual"
              senhaVisivel={ senhaAtualVisivel }
              tipoCampo={ TipoCampo.senha }
              alterarValor={ (senhaAtualDigitada: string) => {
                setSenhaAtual(senhaAtualDigitada);
              } }
              onVisualizarSenha={ () => setSenhaAtualVisivel(!senhaAtualVisivel) }
              erro={ erroSenhaAtual } />
            { /** campo para o usuário informar a nova senha */ }
            <Campo
              valor={ novaSenha }
              habilitado={ true }
              label="Nova Senha"
              senhaVisivel={ novaSenhaVisivel }
              tipoCampo={ TipoCampo.senha }
              alterarValor={ (novaSenhaDigitada: string) => {
                setNovaSenha(novaSenhaDigitada);
              } }
              onVisualizarSenha={ () => setNovaSenhaVisivel(!novaSenhaVisivel) }
              erro={ erroNovaSenha } />
            { /** botão para alterar a senha do usuário logado */ }
            <BotaoProsseguir 
              onProsseguir={ alterarSenhaUsuarioLogado }
              titulo="Alterar Senha" />
          </View> } 
        </View> }
      </ScrollView>
    </Tela>
  );
}

export default Perfil;