import CarregandoPrepararFluxoVenda from "@/app/components/CarregandoPrepararFluxoVenda";
import Tela from "@/app/components/Tela";
import { listarProdutosFirebase } from "@/app/firebase/gestaoProduto";
import { registrarVendaInicioFluxo } from "@/app/firebase/gestaoVenda";
import listarClientesFirebase from "@/app/firebase/listarClientes";
import useFluxoVenda from "@/app/hooks/useFluxoVenda";
import { Cliente } from "@/app/type/cliente";
import { Produto } from "@/app/type/produto";
import { Venda } from "@/app/type/venda";
import { log } from "@/app/utils/log";
import obterDataAtual from "@/app/utils/obterDataAtual";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

// tela que representa o início do fluxo de venda
const InicioFluxoVenda = ({ navigation }: any) => {

  const { atualizarDadosVenda } = useFluxoVenda();
  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ erroRealizarVenda, setErroRealizarVenda ] = useState<string>("");

  /**
   * preparar o inicio da venda, validando primeiro se existem clientes
   * cadastrados, em seguida, validar se existem produtos cadastrados e ativos,
   * se tiver clientes e produtos disponíveis, registrar a venda vazia
   * em rascunho para iniciar o fluxo
   */
  const prepararInicioVenda = async () => {
    setCarregando(true);
    setErroRealizarVenda("");

    try {
      // validar se existem clientes na base de dados
      const clientes: Array<Cliente> = await listarClientesFirebase();

      if (clientes.length === 0) {
        setErroRealizarVenda("Não existem clientes disponíveis para venda, cadastre clientes no aplicativo e tente realizar o fluxo de venda novamente.");
      } else {
        // validar se existem produtos cadastrados e ativos
        const produtos: Array<Produto> = await listarProdutosFirebase();

        if (produtos.length === 0) {
          setErroRealizarVenda("Não existem produtos disponíveis para venda, cadastre produtos no aplicativo e tente realizar o fluxo de venda novamente.");
        } else {
          const produtosAtivos: Produto[] = produtos.filter(p => p.ativo);

          if (produtosAtivos.length === 0) {
            setErroRealizarVenda("Não existem produtos disponíveis para venda, habilite os produtos no aplicativo e tente realizar o fluxo de venda novamente.");
          } else {
            // registrar a venda vazia
            const venda: Venda = {
              dataInicioVenda: obterDataAtual(),
              valorTotal: 0,
              status: "rascunho"
            }

            await registrarVendaInicioFluxo(venda);

            log.debug("Iniciando fluxo de venda.", {
              idVenda: venda.id ?? "",
              dataInicioVenda: venda.dataInicioVenda,
              status: "rascunho"
            });

            // salvar a venda na memória e prosseguir no fluxo da venda, ir para a tela para selecionar o cliente
            atualizarDadosVenda(venda);

            navigation.replace("selecionar_cliente");
          }

        }

      }

    } catch (e) {
      log.erro(`Erro ao tentar-se preparar o fluxo de venda: ${ e }`);

      setErroRealizarVenda("Erro ao tentar-se preparar o fluxo de venda, tente novamente.");
    } finally {
      setCarregando(false);
    }

  }

  useFocusEffect(useCallback(() => {
    prepararInicioVenda();
  }, []));

  return <Tela>
    <CarregandoPrepararFluxoVenda
      carregando={ carregando }
      erro={ erroRealizarVenda }
      onReload={ prepararInicioVenda } />
  </Tela>
}

export default InicioFluxoVenda;