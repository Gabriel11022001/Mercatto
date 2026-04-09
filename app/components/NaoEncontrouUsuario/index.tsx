import { Image, Text, View } from "react-native";
import BotaoCancelar from "../BotaoCancelar";
import styles from "./styles";

interface Props {

  onRealizarLoginNovamente: () => void;

}

// componente informando que não encontrou um usuário
export const NaoEncontrouUsuario = ({ onRealizarLoginNovamente }: Props) => {

  return <View style={ styles.container }>
    <Image
      style={ styles.imagem }
      source={ require("@/assets/images/usuario_nao_encontrado.png") } />
    <Text style={ styles.atencao }>Atenção!</Text>
    <Text style={ styles.mensagem }>Não foi encontrado o usuário logado na base de dados, realize login novamente ou tente acessar o aplicativo com outro perfil.</Text>
    <BotaoCancelar
      onCancelar={ onRealizarLoginNovamente }
      titulo="Logout" />
  </View>
}