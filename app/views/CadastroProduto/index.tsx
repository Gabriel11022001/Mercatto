import BotaoPadrao from "@/app/components/BotaoPadrao";
import Campo, { TipoCampo } from "@/app/components/Campo";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import CategoriaProduto from "@/app/type/categoriaProduto";
import { Produto, StatusProduto } from "@/app/type/produto";
import { apresentarAlerta, TipoAlerta } from "@/app/utils/apresentarAlertas";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

enum TipoCampoProduto {

  nome_produto,
  descricao,
  preco,
  preco_com_desconto,
  estoque

}

// tela de cadastro de produto
const CadastroProduto = ({ navigation, route }: any) => {

  const [ carregando, setCarregando ]                     = useState<boolean>(false);
  const [ produtoEditarId, setProdutoEditarId ]           = useState<string>("");
  const [ nomeProduto, setNomeProduto ]                   = useState<string>("");
  const [ descricao, setDescricao ]                       = useState<string>("");
  const [ preco, setPreco ]                               = useState<string>("");
  const [ precoComDesconto, setPrecoComDesconto ]         = useState<string | null>("");
  const [ estoque, setEstoque ]                           = useState<string>("");
  const [ categoria, setCategoria ]                       = useState<CategoriaProduto | null>(null);
  const [ statusEstoqueProduto, setStatusEstoqueProduto ] = useState<StatusProduto | null>(null);
  const [ ativo, setAtivo ]                               = useState<boolean>(true);
  const [ categorias, setCategorias ]                     = useState<Array<{ key: string, label: string, valor: string }>>([]);
  const [ erroNomeProduto, setErroNomeProduto ]           = useState<string>("");
  const [ erroDescricao, setErroDescricao ]               = useState<string>("");
  const [ erroPreco, setErroPreco ]                       = useState<string>("");
  const [ erroPrecoComDesconto, setErroPrecoComDesconto ] = useState<string>("");
  const [ erroEstoque, setErroEstoque ]                   = useState<string>("");
  const [ habilitarBotaoSalvar, setHabilitarBotaoSalvar ] = useState<boolean>(false);

  // função invocada no momento de digitar o valor do campo
  const onDigitar = (valorDigitado: string, campo: TipoCampoProduto): void => {

    switch (campo) {

      // nome do produto
      case TipoCampoProduto.nome_produto:
        setErroNomeProduto("");
        setNomeProduto(valorDigitado.toUpperCase());

        if (valorDigitado.trim().length === 0) {
          setErroNomeProduto("Informe um nome para o produto.");
        } else if (valorDigitado.length < 3) {
          setErroNomeProduto("O nome do produto deve possuir no mínimo 3 caracteres.");
        }

        break;
      // descrição
      case TipoCampoProduto.descricao:
        setErroDescricao("");
        setDescricao(valorDigitado);

        if (valorDigitado.trim().length === 0) {
          setErroDescricao("Informe uma descrição resumida para o produto.");
        }

        break;

      // preço do produto
      case TipoCampoProduto.preco:
        setErroPreco("");
        setPreco(valorDigitado.replace("R$", "").trim());

        if (valorDigitado.trim().length === 0) {
          setErroPreco("Informe o preço do produto.");
        } else {
          const precoNumero: number = parseFloat(valorDigitado.replace("R$", "")
            .replace(",", ".")
            .replace(".", "")
            .trim()) / 100;

          if (precoNumero <= 0) {
            setErroPreco("Preço de venda inválido.");
          } else {
            const precoDescontoNumero: number = parseFloat(precoComDesconto?.replace(",", ".").replace(".", "").trim() ?? "") / 100;

            if (precoDescontoNumero) {

              if (precoDescontoNumero >= precoNumero) {
                setErroPrecoComDesconto("O preço do produto com desconto não deve ser maior ou igual ao preço de venda.");
              } else {
                setErroPrecoComDesconto("");
              }

            }

          }

        }

        break;

      // preço com desconto
      case TipoCampoProduto.preco_com_desconto:
        setErroPrecoComDesconto("");
        setPrecoComDesconto(valorDigitado.replace("R$", "")
          .trim());

        if (valorDigitado.length > 0) {

          const precoDescontoNumero: number = parseFloat(valorDigitado.replace("R$", "")
            .replace(",", ".")
            .replace(".", "")
            .trim()) / 100;

          if (precoDescontoNumero <= 0) {
            setErroPrecoComDesconto("Preço com desconto inválido.");
          } else {
            const precoVendaNumero: number = parseFloat(preco.replace(",", ".").replace(".", "").trim()) / 100;

            if (precoVendaNumero <= precoDescontoNumero) {
              setErroPrecoComDesconto("O preço do produto com desconto não deve ser maior ou igual ao preço de venda.");
            }

          }

        }

        break;
    }

  }

  // salvar produto
  const salvar = async () => produtoEditarId == "" ? await cadastrar() : await editar();

  // cadastrar o produto
  const cadastrar = async () => {

    try {
      setCarregando(true);

      let statusEstoque: string = "";

      if (statusEstoqueProduto === StatusProduto.estoque_disponivel) {
        statusEstoque = "estoque_disponivel";
      } else if (statusEstoqueProduto === StatusProduto.sem_estoque) {
        statusEstoque = "sem_estoque";
      }

      const produtoCadastrar: Produto = {
        nomeProduto: nomeProduto.trim(),
        descricao: descricao.trim(),
        preco: parseFloat(preco.trim()),
        precoComDesconto: precoComDesconto != null ? parseFloat(precoComDesconto) : undefined,
        ativo: ativo,
        categoria: categoria ?? undefined,
        estoque: parseInt(estoque),
        statusEstoque: statusEstoque
      }

      // validar se já existe outro produto cadastrado com o mesmo nome

      // cadastrar o produto

      apresentarAlerta("Produto cadastrado com sucesso.", TipoAlerta.sucesso);
      navigation.goBack();
    } catch (e) {
      console.error(`Erro ao tentar-se cadastrar o produto: ${ e }`);
      
      apresentarAlerta("Erro, tente novamente.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  // editar produto
  const editar = async () => {

  }

  const habilitarOuDesabilitarBotaoSalvar = (): void => {

    if (
      nomeProduto != ""
      && preco != ""
      && descricao != ""
      && estoque != ""
      && parseInt(estoque) > 0
      && erroNomeProduto === ""
      && erroPreco === ""
      && erroPrecoComDesconto === ""
      && erroDescricao === ""
      && erroEstoque === ""
    ) {
      setHabilitarBotaoSalvar(true);
    } else {
      setHabilitarBotaoSalvar(false);
    }

  }

  useEffect(() => {
    habilitarOuDesabilitarBotaoSalvar();
  }, [
    nomeProduto,
    preco,
    precoComDesconto,
    descricao,
    estoque,
    erroNomeProduto,
    erroPreco,
    erroPrecoComDesconto,
    erroEstoque,
    erroDescricao
  ]);

  return <Tela>
    <Loader carregando={ carregando } msg="Enviando os dados do produto para o servidor, aguarde..." />
    <ScrollView showsVerticalScrollIndicator={ false }>
      { /** campo para o usuário informar o nome do produto */ }
      <Campo
        valor={ nomeProduto }
        habilitado={ true }
        label="Nome do Produto"
        senhaVisivel={ true }
        tipoCampo={ TipoCampo.nomeCategoria }
        erro={ erroNomeProduto }
        onVisualizarSenha={ () => {} }
        alterarValor={ (nomeProdutoDigitado: string) => {
          onDigitar(nomeProdutoDigitado, TipoCampoProduto.nome_produto);
        } } />
      { /** campo para o usuário informar a descrição do produto */ }
      <Campo
        valor={ descricao }
        habilitado={ true }
        label="Descrição"
        senhaVisivel={ true }
        tipoCampo={ TipoCampo.nomeCategoria }
        erro={ erroDescricao }
        onVisualizarSenha={ () => {} }
        alterarValor={ (descricaoDigitada: string) => {
          onDigitar(descricaoDigitada, TipoCampoProduto.descricao);
        } } />
      { /** campo para o usuário informar o preço de venda do produto */ }
      <Campo
        valor={ preco }
        habilitado={ true }
        label="Preço"
        senhaVisivel={ true }
        tipoCampo={ TipoCampo.preco }
        erro={ erroPreco }
        onVisualizarSenha={ () => {} }
        alterarValor={ (precoDigitado: string) => {
          onDigitar(precoDigitado, TipoCampoProduto.preco);
        } } />
      { /** campo para o usuário informar o preço com desconto do produto */ }
      <Campo
        valor={ precoComDesconto ?? "" }
        habilitado={ true }
        label="Preço com desconto"
        senhaVisivel={ true }
        tipoCampo={ TipoCampo.preco }
        erro={ erroPrecoComDesconto }
        onVisualizarSenha={ () => {} }
        alterarValor={ (precoDescontoDigitado: string) => {
          onDigitar(precoDescontoDigitado, TipoCampoProduto.preco_com_desconto);
        } } />
      <BotaoPadrao
        habilitado={ habilitarBotaoSalvar }
        titulo={ produtoEditarId === "" ? "Cadastrar" : "Salvar" }
        onPressionar={ salvar } />
    </ScrollView>
  </Tela>
}

export default CadastroProduto;