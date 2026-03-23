import { Produto } from "@/app/type/produto";
import { config } from "@/config";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Operacao, { TipoOperacao } from "../Operacao";
import Status, { StatusItem } from "../Status";
import styles from "./styles";

interface Props {
  
  produto: Produto;
  onDeletar: () => void;
  onEditar: () => void;
  onVisualizar: () => void;
  onAlterarStatus: () => void;

}

// componente que representa a produto
export const ProdutoItem = ({ produto, onDeletar, onVisualizar, onEditar, onAlterarStatus }: Props) => {
  
  const [ apresentarOperacoes, setApresentarOperacoes ] = useState<boolean>(false);

  // obter o dinheiro no formato monetário do brasil
  const obterPrecoFormatoReal = (preco: string): string => {
    const valor = Number(preco);

    if (isNaN(valor)) {

      return "R$ 0,00";
    }

    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return <View style={ styles.item }>
    <View style={ styles.containerDadosProduto }>
      <Text style={ styles.nomeProduto }>{ produto.nomeProduto }</Text> 
      <Text style={ styles.dado }>{ produto.estoque === 1 ? `${ produto.estoque } unidade em estoque` : `${ produto.estoque } unidades em estoque` }</Text>
      <Text style={ [ styles.dado, styles.dadoDestacado ] }>Preço de venda: { obterPrecoFormatoReal(produto.preco.toString()) }</Text>
      { produto.precoComDesconto != undefined && produto.precoComDesconto != "" ? <Text style={ [
        styles.dado,
        styles.dadoDestacado
      ] }>Preço com desconto: { obterPrecoFormatoReal(
        produto.precoComDesconto.toString()
      ) }</Text> : false }
      <Text style={ [ styles.dado, styles.dadoDestacado ] }>Categoria: { produto.categoria?.nomeCategoria }</Text>
      <Status status={ produto.ativo ? StatusItem.ativo : StatusItem.inativo } />
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
      <Operacao titulo={ produto.ativo ? "Desabilitar" : "Habilitar" } executarOperacao={ onAlterarStatus } tipoOperacao={ TipoOperacao.editar } />
    </View> }
  </View>
}