import { Cliente } from "@/app/type/cliente";
import { config } from "@/config";
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Operacao, { TipoOperacao } from "../Operacao";
import styles from "./styles";

interface Props {
  
  cliente: Cliente;
  onDeletar: () => void;
  onEditar: () => void;
  onVisualizar: () => void;

}

// componente que representa os dados do cliente
const ClienteItem = ({ cliente, onDeletar, onEditar, onVisualizar }: Props) => {

  const { nome, cpf, email, telefone, foto } = cliente;

  const [ apresentarOperacoes, setApresentarOperacoes ] = useState<boolean>(false);

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
    { apresentarOperacoes && <View style={ styles.containerOperacoes }>
      <Operacao titulo="Visualizar" executarOperacao={ onVisualizar } tipoOperacao={ TipoOperacao.visualizar } />
      <Operacao titulo="Editar" executarOperacao={ onEditar } tipoOperacao={ TipoOperacao.editar } />
      <Operacao titulo="Deletar" executarOperacao={ onDeletar } tipoOperacao={ TipoOperacao.deletar } />
    </View> }
    <View>
      <TouchableOpacity onPress={ () => setApresentarOperacoes(!apresentarOperacoes) }>
        <Entypo name="dots-three-vertical" size={ 30 } color={ config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000" } />
      </TouchableOpacity>
    </View>
  </View>
}

export default ClienteItem;