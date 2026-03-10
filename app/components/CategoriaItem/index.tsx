import CategoriaProduto from "@/app/type/categoriaProduto";
import { config } from "@/config";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Operacao, { TipoOperacao } from "../Operacao";
import Status, { StatusItem } from "../Status";
import styles from "./styles";

interface Props {
  
  categoria: CategoriaProduto;
  onDeletar: () => void;
  onEditar: () => void;
  onVisualizar: () => void;
  onAlterarStatus: () => void;

}

// componente que representa a categoria do produto
export const CategoriasItem = ({ categoria, onDeletar, onVisualizar, onEditar, onAlterarStatus }: Props) => {

  const [ apresentarOperacoes, setApresentarOperacoes ] = useState<boolean>(false);

  return <View style={ styles.item }>
    <View style={ styles.containerDadosCategoria }>
      <Text style={ styles.nomeCategoria }>{ categoria.nomeCategoria }</Text>
      <Status status={ categoria.status ? StatusItem.ativo : StatusItem.inativo } />
    </View>
    <View>
      <TouchableOpacity onPress={ () => setApresentarOperacoes(!apresentarOperacoes) }>
        <Entypo name="dots-three-vertical" size={ 30 } color={ config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000" } />
      </TouchableOpacity>
    </View>
    { apresentarOperacoes && <View style={ styles.containerOperacoes }>
      <Operacao titulo="Visualizar" executarOperacao={ onVisualizar } tipoOperacao={ TipoOperacao.visualizar } />
      <Operacao titulo="Editar" executarOperacao={ onEditar } tipoOperacao={ TipoOperacao.editar } />
      <Operacao titulo="Deletar" executarOperacao={ onDeletar } tipoOperacao={ TipoOperacao.deletar } />
      <Operacao titulo={ categoria.status ? "Desabilitar" : "Habilitar" } executarOperacao={ onAlterarStatus } tipoOperacao={ TipoOperacao.editar } />
    </View> }
  </View>
}