import Feather from '@expo/vector-icons/Feather';
import { Text, View } from "react-native";
import styles from "./styles";

export enum TipoAlertaRecuperacaoSenha {
  sucesso,
  erro
}

type Props = {

  mensagem: string;
  tipo: TipoAlertaRecuperacaoSenha;

}

// alerta de recuperação de senha
const AlertaRecuperacaoSenha = ({ mensagem, tipo }: Props) => {

  if (mensagem.trim().length === 0) {

    return false;
  }

  return <View style={ [
    styles.alerta,
    tipo === TipoAlertaRecuperacaoSenha.sucesso ? styles.sucesso : styles.erro
  ] }>
    <Feather name="alert-circle" size={ 40 } color={
      tipo === TipoAlertaRecuperacaoSenha.sucesso ? "green" : "red"
    } />
    <Text style={ styles.texto }>{ mensagem }</Text>
  </View>
}

export default AlertaRecuperacaoSenha;