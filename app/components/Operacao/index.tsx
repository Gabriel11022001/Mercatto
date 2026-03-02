import { config } from '@/config';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, TouchableOpacity } from "react-native";
import { styles } from './styles';

export enum TipoOperacao {

  visualizar,
  editar,
  deletar

}

type Props = {

  titulo: string;
  executarOperacao: () => void;
  tipoOperacao: TipoOperacao;

}

// componente que representa a operação a ser realizada(visualizar, deletar, editar, etc...)
const Operacao = ({ titulo, executarOperacao, tipoOperacao }: Props) => {

  const getIconeOperacao = () => {

    if (tipoOperacao === TipoOperacao.visualizar) {

      return <Feather name="eye" size={ 24 } color={ config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000" } />;
    }

    if (tipoOperacao === TipoOperacao.deletar) {

      return <MaterialIcons name="delete-outline" size={ 24 } color={ config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000" } />;
    }

    return <Feather name="edit" size={ 24 } color={ config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000" } />;
  }

  return <TouchableOpacity style={ styles.container } onPress={ executarOperacao }>
    { getIconeOperacao() }
    <Text style={ styles.titulo }>{ titulo }</Text>
  </TouchableOpacity>
}

export default Operacao;