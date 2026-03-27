import AlertaNaoExistemDados from "@/app/components/AlertaNaoExistemDados";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import { VendaItem } from "@/app/components/VendaItem";
import { buscarVendaPeloIdFirebase, deletarVendaFirebase, listarVendasFirebase } from "@/app/firebase/gestaoVenda";
import { Venda } from "@/app/type/venda";
import { apresentarAlerta, TipoAlerta } from "@/app/utils/apresentarAlertas";
import { log } from "@/app/utils/log";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";

// tela com a listagem das vendas
const Vendas = ({ navigation }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ vendas, setVendas ] = useState<Venda[]>([]);

  // listar as vendas cadastradas na base de dados
  const listarVendas = async () => {

    try {
      setCarregando(true); 
      setVendas([]);

      const vendas: Array<Venda> = await listarVendasFirebase();
      
      setVendas(vendas);

      console.log("Vendas listadas com sucesso, quantidade de vendas: " + vendas.length);
    } catch (e) {
      log.erro(`Erro ao tentar-se listar as vendas: ${ e }`);

      apresentarAlerta("Erro ao tentar-se listar as vendas.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  useFocusEffect(useCallback(() => {
    listarVendas();
  }, []));

  // deletar venda
  const deletarVenda = async (id: string) => {

    try {
      setCarregando(true);

      const vendaDeletar: Venda | null = await buscarVendaPeloIdFirebase(id);

      if (vendaDeletar != null) {
        await deletarVendaFirebase(vendaDeletar);

        apresentarAlerta("Venda deletada com sucesso.", TipoAlerta.sucesso);

        await listarVendas();
      } else {
        apresentarAlerta("Venda não encontrada.", TipoAlerta.aviso);
      }

    } catch (e) {
      log.erro(`Erro ao tentar-se deletar a venda: ${ id }: ${ e }`);

      apresentarAlerta("Erro ao tentar-se deletar a venda.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  return <Tela>
    <Loader carregando={ carregando } />
    { vendas.length === 0 ? <AlertaNaoExistemDados mensagem="Não existem vendas cadastradas na base de dados." />
    : <FlatList
      style={ { backgroundColor: "#fff" } }
      data={ vendas }
      keyExtractor={ venda => venda.id?.toString() ?? "" }
      renderItem={ ({ item, index }) => {

        return (
          <VendaItem
            venda={ item }
            onDeletar={ () => {
              deletarVenda(item.id ?? "");
            } }
            onVisualizar={ () => {
              navigation.navigate("detalhes_venda", { idVenda: item.id ?? "" });
            } } />
        );
      } } /> }
  </Tela>
}

export default Vendas;