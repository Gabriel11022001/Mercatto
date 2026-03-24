import { config } from '@/config';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import styles from './styles';

interface Props {

  carregando: boolean;
  erro?: string;
  onReload: () => Promise<void>;

}

const CarregandoPrepararFluxoVenda = ({ carregando, erro, onReload }: Props) => {

  if (!carregando && erro) {

    return <View style={ styles.container }>
      <Image source={ require("@/assets/images/erro_venda.png") } style={ styles.imagem } />
      { /** mensagem de erro para apresentar ao usuário */ }
      <Text style={ styles.msgErro }>{ erro }</Text>
      { /** botão para recarregar o inicio do fluxo de venda */ }
      <Pressable onPress={ onReload }>
        <Ionicons name="reload" size={ 80 } color={ config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000" } />
      </Pressable>
    </View>
  }

  if (carregando) {

    return <View style={ styles.container }>
      <Image
        style={ styles.imagem }
        source={ require("@/assets/images/preparando_fluxo_venda.png") } />
      <ActivityIndicator color={ config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000" } size={ 100 } />
      <Text style={ styles.texto }>Preparando o fluxo de venda, aguarde...</Text>
    </View>
  }

  return null;
}

export default CarregandoPrepararFluxoVenda;