import { config } from '@/config';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, View } from "react-native";
import styles from './styles';

type Props = {

  status: string;

}

// componente que representa o status da venda
const StatusVenda = (props: Props) => {

  // obter o ícone do status da venda
  const getIconeStatusVenda = () => {

    if (props.status === "rascunho") {

      return <Foundation name="page-edit" size={ 24 } color={
        config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000"
      } />;
    }

    if (props.status === "finalizada") {

      return <MaterialIcons name="payment" size={ 24 } color="#fff" />;
    }
  
    return null;
  }

  return <View style={ styles.container }>
    <View style={ [
      styles.status,
      props.status === "rascunho" ? styles.statusRascunho : styles.statusFinalizada
    ] }>
      { getIconeStatusVenda() }
      <Text style={ styles.nomeStatus }>{ props.status.toUpperCase() }</Text>
    </View>
  </View>
}

export default StatusVenda;