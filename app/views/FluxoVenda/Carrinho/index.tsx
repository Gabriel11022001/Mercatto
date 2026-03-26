import BotaoCancelar from "@/app/components/BotaoCancelar";
import BotaoProsseguir from "@/app/components/BotaoProsseguir";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import { buscarClientePeloIdFirebase } from "@/app/firebase/buscarCliente";
import { buscarProdutoPeloIdFirebase } from "@/app/firebase/gestaoProduto";
import useFluxoVenda from "@/app/hooks/useFluxoVenda";
import { Cliente } from "@/app/type/cliente";
import { Produto } from "@/app/type/produto";
import { ItemVenda, Venda } from "@/app/type/venda";
import { apresentarAlerta, TipoAlerta } from "@/app/utils/apresentarAlertas";
import { log } from "@/app/utils/log";
import obterValorMonetario from "@/app/utils/obterValorMonetario";
import { config } from "@/config";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export type ItemCarrinho = {

  idVenda: string;
  produto: Produto;
  item: ItemVenda;

}

// tela de representa o carrinho de compra
const Carrinho = ({ navigation }: any) => {

  const { venda, atualizarDadosVenda, limparVenda } = useFluxoVenda();
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ msgCarregando, setMsgCarregando ] = useState<string>("");
  const [ carrinho, setCarrinho ] = useState<ItemCarrinho[]>([]);
  const [ cliente, setCliente ] = useState<Cliente | null>(null);
  const [ valorTotal, setValorTotal ] = useState<number>(0);

  /**
   * montra o carrinho com o valor total, o cliente selecionado
   * e os items que estão inclusos no carrinho
   */
  const montarCarrinho = async () => {
    setCarregando(true);
    setCliente(null);
    setCarrinho([]);
    setValorTotal(0);
    setMsgCarregando("");

    try {
      setMsgCarregando("Consultando o cliente...");
      console.log("Consultando o cliente...");

      const clienteVenda: Cliente | null = await buscarClientePeloIdFirebase(venda?.clienteId ?? "");

      if (clienteVenda === null) {

        throw new Error("Cliente não encontrado.");
      }

      setCliente(clienteVenda);

      console.log("Cliente encontrado com sucesso...");

      if (venda?.itemsVenda && venda.itemsVenda.length > 0) {
        console.log(venda.itemsVenda);
        const itemsVendaCarrinho: Array<ItemCarrinho> = [];

        for (let i: number = 0; i < venda.itemsVenda.length; i++) {
          const item: ItemVenda = venda.itemsVenda[ i ];
          // buscar o produto relacionado ao item
          console.log("Consultando produto " + (item.produtoId ?? ""));
          const produto: Produto | null = await buscarProdutoPeloIdFirebase(item.produtoId ?? "");

          if (produto != null) {
            itemsVendaCarrinho.push({
              idVenda: venda.id ?? "",
              item: item,
              produto: produto
            });
          } else {
            console.log("Produto " + item.produtoId + " não encontrado.");
          }

        }

        setCarrinho(itemsVendaCarrinho);
      }

    } catch (e) {
      log.erro(`Erro ao tentar-se montar o carrinho da venda ${ venda?.id ?? "" }: ${ e }`);

      apresentarAlerta("Erro: " + e, TipoAlerta.erro);

      // redirecionar o usuário para a tela home
      navigation.replace("home");
    } finally {
      setCarregando(false);
    }

  }

  useFocusEffect(useCallback(() => {
    console.log("Fluxo de venda até o momento");
    console.log(venda);

    montarCarrinho();
  }, [ venda ]));

  useEffect(() => {
    // calcular o valor total do carrinho
    let valorTotalCarrinho: number = 0;

    if (carrinho.length > 0) {

      carrinho.forEach((item: ItemCarrinho) => {
        const precoUnitario: number = item.produto.precoComDesconto ? 
          parseFloat(item.produto.precoComDesconto.toString()) 
          : parseFloat(item.produto.preco.toString());
        
          valorTotalCarrinho += (precoUnitario * item.item.unidades);
      })

    }

    setValorTotal(valorTotalCarrinho);
  }, [ carrinho ]);

  // incrementar unidades do produto na venda
  const decrementarUnidades = (item: ItemCarrinho): void => {
    const vendaCopia: Venda = { ...venda as Venda };
    
    let unidadesAtualizado: number = 0;

    if (item.item.unidades - 1 === 0) {
      // remover o item do carrinho
      removerItemCarrinho(item);

      return;
    }

    unidadesAtualizado = item.item.unidades - 1;

    const carrinhoCopia: Array<ItemCarrinho> = [ ...carrinho.map((itemCarrinho: ItemCarrinho) => {
      const itemAtualizado: ItemCarrinho = { ...itemCarrinho };

      if (itemAtualizado.produto.id === item.produto.id) {
        itemAtualizado.item.unidades = unidadesAtualizado;
      }

      return itemAtualizado;
    }) ];

    vendaCopia.itemsVenda = carrinhoCopia.map((itemCarrinho: ItemCarrinho) => {

      return {
        id: itemCarrinho.item.id ?? "",
        unidades: itemCarrinho.item.unidades,
        produtoId: itemCarrinho.item.produtoId ?? "",
        valorUnitarioProduto: itemCarrinho.item.valorUnitarioProduto
      };
    });

    atualizarDadosVenda(vendaCopia);
  }

  // decrementar unidades do produto na venda
  const incrementarUnidades = (item: ItemCarrinho): void => {
    const vendaCopia: Venda = { ...venda as Venda };
    
    let unidadesAtualizado: number = 0;

    if (item.produto.estoque < (item.item.unidades + 1)) {
      apresentarAlerta("Limite de unidades atingido!", TipoAlerta.aviso);

      return;
    } else {
      unidadesAtualizado = item.item.unidades + 1;
    }

    const carrinhoCopia: Array<ItemCarrinho> = [ ...carrinho.map((itemCarrinho: ItemCarrinho) => {
      const itemAtualizado: ItemCarrinho = { ...itemCarrinho };

      if (itemAtualizado.produto.id === item.produto.id) {
        itemAtualizado.item.unidades = unidadesAtualizado;
      }

      return itemAtualizado;
    }) ];

    vendaCopia.itemsVenda = carrinhoCopia.map((itemCarrinho: ItemCarrinho) => {

      return {
        id: itemCarrinho.item.id ?? "",
        unidades: itemCarrinho.item.unidades,
        produtoId: itemCarrinho.item.produtoId ?? "",
        valorUnitarioProduto: itemCarrinho.item.valorUnitarioProduto
      };
    });

    atualizarDadosVenda(vendaCopia);
  }

  const getSubTotalItem = ({ item }: ItemCarrinho): string => {

    return obterValorMonetario((item.unidades * item.valorUnitarioProduto).toString());
  }

  // remover item do carrinho de compras
  const removerItemCarrinho = (itemRemover: ItemCarrinho): void => {
    const vendaCopia: Venda = { ...venda as Venda };
    const carrinhoAtualizado: Array<ItemCarrinho> = [ ...carrinho.filter(c => c.produto.id != itemRemover.produto.id) ];

    vendaCopia.itemsVenda = carrinhoAtualizado.map((itemCarrinho: ItemCarrinho) => {

      return {
        id: itemCarrinho.item.id ?? "",
        unidades: itemCarrinho.item.unidades,
        valorUnitarioProduto: itemCarrinho.item.valorUnitarioProduto,
        produtoId: itemCarrinho.item.produtoId ?? ""
      };
    });

    apresentarAlerta("Produto removido do carrinho!", TipoAlerta.aviso);

    atualizarDadosVenda(vendaCopia);
  }

  // cancelar a venda
  const cancelarVenda = async () => {
    
    try {
      // atualizar a venda como em rascunho

      //limparVenda();

      //navigation.replace("home");

      //apresentarAlerta("Venda cancelada!", TipoAlerta.aviso);
    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

  // prosseguir com a venda para selecionar a forma de pagamento
  const prosseguir = async () => {

    try {
      setCarregando(true);

      if (!venda?.itemsVenda || venda.itemsVenda.length === 0) {
        apresentarAlerta("Adicione produtos ao carrinho.", TipoAlerta.erro);
      } else {
        const vendaCopia: Venda = { ...venda as Venda };

        vendaCopia.valorTotal = valorTotal;

        atualizarDadosVenda(vendaCopia);

        // redirecionar o usuário para a seleção de forma de pagamento
        navigation.navigate("forma_pagamento");
      }
 
    } catch (e) {
      log.erro(`Erro ao tentar-se prosseguir com a venda ${ venda?.id ?? "" } para selecionar forma de pagamento: ${ e }`);

      apresentarAlerta("Erro, tente novamente.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  return (
    <Tela>
      <Loader carregando={ carregando } msg={ msgCarregando } />
      { /** lista dos items adicionados ao carrinho */ }
      <FlatList
        data={ carrinho }
        keyExtractor={ (item) => item.produto.id ?? "" }
        ListHeaderComponent={
          <>
            {cliente != null && (
              <Pressable style={ styles.alterarCliente } onPress={() => navigation.goBack()}>
                <View style={ { flex: 1 } }>
                  <Text style={ styles.alterarClienteTitulo }>Cliente</Text>
                  <Text style={ styles.nomeCliente }>{cliente.nome}</Text>
                  <Text style={ styles.dadoCliente }>{ cliente.cpf }</Text>
                  <Text style={ styles.dadoCliente }>{ cliente.email }</Text>
                  <Text style={ styles.dadoCliente }>{ cliente.telefone }</Text>
                </View>
                <AntDesign name="edit" size={ 40 } color={ config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000" } />
              </Pressable>
            )}
            <Pressable
              style={ styles.botaoAdicionarProduto }
              onPress={() => navigation.navigate("adicionar_produto_carrinho")}>
                <FontAwesome6 name="add" size={ 30 } color={ config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000" } />
                <Text style={ styles.txtAdicionarProduto }>Adicionar Produto</Text>
            </Pressable>
          </>
        }
        ListFooterComponent={
          <>
            <View style={ styles.containerValorTotal }>
              <Text style={ styles.txtTotalTitulo }>Total</Text>
              <Text style={ styles.txtTotalValor }>R${ obterValorMonetario(valorTotal.toString()) }</Text>
            </View>
            { /** botão para cancelar a venda */ }
            <BotaoCancelar
              titulo="Cancelar"
              onCancelar={ () => {
                cancelarVenda();
              } } />
            { /** botão para prosseguir com a venda */ }
            <BotaoProsseguir
              titulo="Prosseguir"
              onProsseguir={ () => {
                prosseguir();
              } } />
          </>
        }
        renderItem={ ({ item, index }) => {

          return <View style={ [
            styles.item,
            index === 0 && { marginTop: 30 }
          ] }>
            <View>
              <Text style={ styles.nomeProduto }>{ item.produto.nomeProduto }</Text>
              <View style={ styles.containerEstoquePrecoUnitario }>
                <Text style={ styles.itemDado }>R${ obterValorMonetario(
                  item.produto.precoComDesconto ? item.produto.precoComDesconto.toString()
                  : item.produto.preco.toString()
                ) }</Text>
                <View style={ styles.separadorContainerEstoquePrecoUnitario } />
                <Text style={ styles.itemDado }>Estoque: { item.produto.estoque.toString() } uni.</Text>
              </View>
            </View>
            <View style={ styles.separdorContainerQuantidade } />
            <Text style={ styles.txtQuantidadeTitulo }>Quantidade:</Text>
            <View style={ styles.containerGestaoUnidades }>
              { /** decrementar unidades */ }
              <Pressable style={ [
                styles.btnIncrementarDecrementar,
                { marginEnd: 20 }
              ] } onPress={ () => decrementarUnidades(item) }>
                <AntDesign name="minus" size={ 30 } color={
                  config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000"
                } />
              </Pressable>
              { /** unidades atuais */ }
              <Text style={ styles.txtQuantidadeSelecionada }>{ item.item.unidades.toString() }</Text>
              { /** incrementar unidades */ }
              <Pressable style={ [
                styles.btnIncrementarDecrementar,
                { marginStart: 20 }
              ] } onPress={ () => incrementarUnidades(item) }>
                <AntDesign name="plus" size={ 30 } color={
                  config.cores.find(c => c.nomeCor === "primaria")?.cor ?? "#000"
                } />
              </Pressable>
              <View style={ styles.containerSubTotal }>
                { /** subtotal do item */ }
                <Text style={ styles.txtSubTotal }>Subtotal: R${ getSubTotalItem(item) }</Text>
                { /** botão para remover o item do carrinho */ }
                <TouchableOpacity onPress={ () => {
                  // remover o item do carrinho
                  removerItemCarrinho(item);
                } }>
                  <MaterialIcons name="delete-forever" size={ 50 } color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        } }
      />
    </Tela>
  );
}

export default Carrinho;