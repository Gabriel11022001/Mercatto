import { config } from '@/config';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export enum TipoCampo {

  email,
  senha,
  padrao

}

interface Props {

  valor: string;
  label: string;
  tipoCampo: TipoCampo;
  erro?: string;
  alterarValor: (valor: string) => void;
  habilitado: boolean;
  senhaVisivel: boolean;
  onVisualizarSenha: () => void;

}

const Campo = ({
  valor,
  label,
  tipoCampo,
  erro,
  alterarValor,
  habilitado,
  senhaVisivel = false,
  onVisualizarSenha
}: Props) => {

  // obter o icone do campo
  const getIcone = () => {
    
    const corIcones: string = config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000";

    if (tipoCampo === TipoCampo.email) {

      return <Feather name="mail" size={ 24 } color={ corIcones } />;
    }

    if (tipoCampo === TipoCampo.senha) {

      return <AntDesign name="lock" size={ 24 } color={ corIcones } />;
    }

    return null;
  }

  const getModoTecladoCampo = () => {

    if (tipoCampo === TipoCampo.email) {

      return "email";
    }

    if (tipoCampo === TipoCampo.senha) {

      return "numeric";
    }

    return "text";
  }

  const getTipoCampo = () => {

    if (tipoCampo === TipoCampo.email) {

      return "email-address";
    }

    if (tipoCampo === TipoCampo.senha) {

      return "number-pad";
    }

    return "default";
  }

  return <View style={ styles.containerCampo }>
    <View style={ styles.campo }>
      { getIcone() }
      <TextInput
        style={ styles.textInputCampo }
        value={ valor }
        placeholder={ label }
        secureTextEntry={ tipoCampo === TipoCampo.senha && !senhaVisivel }
        onChangeText={ (valorDigitado: string) => {
          alterarValor(valorDigitado);
        } }
        underlineColorAndroid={ undefined }
        inputMode={ getModoTecladoCampo() }
        keyboardType={ getTipoCampo() } />
      { tipoCampo === TipoCampo.senha && <TouchableOpacity onPress={ () => {
        onVisualizarSenha();
      } } >
        { senhaVisivel ? 
        <AntDesign name="eye-invisible" size={ 24 } color={ config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000" } /> : 
        <Feather name="eye" size={ 24 } color={ config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000" } /> }
      </TouchableOpacity> }
    </View>
    { erro && <Text style={ styles.erro }>{ erro }</Text> }
  </View>
}

export default Campo;