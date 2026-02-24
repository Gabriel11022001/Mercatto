import { Cliente } from "@/app/type/cliente";
import { config } from "@/config";
import Entypo from '@expo/vector-icons/Entypo';
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface Props {
  
  cliente: Cliente;
  onApresentarOperacoesCliente: () => void;

}

// componente que representa os dados do cliente
const ClienteItem = ({ cliente, onApresentarOperacoesCliente }: Props) => {

  const { nome, cpf, email, telefone, foto } = cliente;

  return <View style={ styles.item }>
    <View style={ styles.containerFotoDadosCliente }>
      <Image
        style={ styles.foto }
        source={ foto != null && foto != "" ? { uri: foto } : require("@/assets/images/imagem_vazia.png") } />
      <View>
        <Text style={ styles.nomeCliente }>{ nome }</Text>
        <Text style={ styles.dado }>{ cpf }</Text>
        <Text style={ styles.dado }>{ email }</Text>
        <Text style={ styles.dado }>{ email }</Text>
      </View>
    </View>
    <View>
      <TouchableOpacity onPress={ onApresentarOperacoesCliente }>
        <Entypo name="dots-three-vertical" size={ 30 } color={ config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000" } />
      </TouchableOpacity>
    </View>
  </View>
}

export default ClienteItem;