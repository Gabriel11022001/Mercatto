import { Cliente } from "@/app/type/cliente";
import { config } from "@/config";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";

type Props = {

  cliente: Cliente;

}

// detalhes do cliente da venda
const DetalhesClienteVenda = ({ cliente }: Props) => {

  const [ apresentar, setApresentar ] = useState<boolean>(false);

  return <View style={ styles.container }>
    <Pressable style={ styles.topo } onPress={ () => {
      setApresentar(!apresentar);
    } }>
      <Text style={ styles.topoTitulo }>Cliente</Text>
      { apresentar ? <MaterialIcons name="keyboard-arrow-up" size={ 40 } color={
        config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000"
      } /> 
      : <MaterialIcons name="keyboard-arrow-down" size={ 40 } color={
        config.cores.find(c => c.nomeCor === "secundaria")?.cor ?? "#000"
      } /> }
    </Pressable>
    { apresentar && <View style={ styles.corpo }>
      { cliente.foto && <View style={ styles.containerFoto }>
        <Image source={ { uri: `data:image/jpeg;base64,${ cliente.foto }` } } style={ styles.foto } />
      </View> }
      <Text style={ styles.dado }>Nome Completo: { cliente.nome }</Text>
      <Text style={ styles.dado }>CPF: { cliente.cpf }</Text>
      <Text style={ styles.dado }>E-mail: { cliente.email }</Text>
      <Text style={ styles.dado }>Telefone: { cliente.telefone }</Text>
      <Text style={ styles.dado }>Data de Nascimento: { cliente.dataNascimento }</Text>
      <Text style={ styles.dado }>Gênero: { cliente.genero }</Text>
      <Text style={ styles.dado }>CEP: { cliente.endereco.cep }</Text>
      <Text style={ styles.dado }>Endereço: { cliente.endereco.endereco }</Text>
      <Text style={ styles.dado }>Cidade: { cliente.endereco.cidade }</Text>
      <Text style={ styles.dado }>Bairro: { cliente.endereco.bairro }</Text>
      <Text style={ styles.dado }>Complemento: { cliente.endereco.complemento ? cliente.endereco.complemento : "Não definido" }</Text>
      <Text style={ styles.dado }>Estado: { cliente.endereco.uf }</Text>
      <Text style={ styles.dado }>Número: { cliente.endereco.numero ? cliente.endereco.numero : "S/N" }</Text>
    </View> }
  </View>
}

export default DetalhesClienteVenda;