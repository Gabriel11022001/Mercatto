import { Venda } from "@/app/type/venda";
import obterValorMonetario from "@/app/utils/obterValorMonetario";
import { config } from "@/config";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FormaPagamentoVendaListagem from "../FormaPagamentoVendaListagem";
import Operacao, { TipoOperacao } from "../Operacao";
import StatusVenda from "../StatusVenda";
import styles from "./styles";

interface Props {
  
  venda: Venda;
  onDeletar: () => void;
  onVisualizar: () => void;

}

// componente que representa a venda
export const VendaItem = ({ venda, onDeletar, onVisualizar }: Props) => {

  const [ apresentarOperacoes, setApresentarOperacoes ] = useState<boolean>(false);

  return <View style={ styles.item }>
    <StatusVenda status={ venda.status } />
    <View style={ styles.containerDadosVenda }>
      <Text style={ styles.dado }>Cód.Venda: { venda.id ?? "" }</Text>
      <Text style={ styles.nomeClienteVenda }>{ venda.cliente?.nome ?? "Cliente não definido..." }</Text>
      <Text style={ styles.valorTotalVenda }>Valor Total: R${ obterValorMonetario(venda.valorTotal.toString()) }</Text>
      <Text style={ styles.dado }>Data de inicio: { venda.dataInicioVenda }</Text>
      <Text style={ styles.dado }>Data de conclusão: { venda.dataConclusaoVenda ?? "---- indefinido ----" }</Text>
      <FormaPagamentoVendaListagem formaPagamento={ venda.formaPagamento ?? "" } />
    </View>
    <View>
      <TouchableOpacity onPress={ () => setApresentarOperacoes(!apresentarOperacoes) }>
        <Entypo name="dots-three-vertical" size={ 30 } color={ config.cores.find(c => c.nomeCor === "texto")?.cor ?? "#000" } />
      </TouchableOpacity>
    </View>
    { apresentarOperacoes && <View style={ styles.containerOperacoes }>
      <Operacao titulo="Visualizar" executarOperacao={ onVisualizar } tipoOperacao={ TipoOperacao.visualizar } />
      <Operacao titulo="Deletar" executarOperacao={ onDeletar } tipoOperacao={ TipoOperacao.deletar } />
    </View> }
  </View>
}