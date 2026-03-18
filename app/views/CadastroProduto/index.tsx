import BotaoPadrao from "@/app/components/BotaoPadrao";
import Campo, { TipoCampo } from "@/app/components/Campo";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import { listarCategoriasFirebase } from "@/app/firebase/gestaoCategoria";
import { buscarProdutoPeloNomeFirebase, cadastrarProdutoFirebase } from "@/app/firebase/gestaoProduto";
import CategoriaProduto from "@/app/type/categoriaProduto";
import { Produto, StatusProduto } from "@/app/type/produto";
import { apresentarAlerta, TipoAlerta } from "@/app/utils/apresentarAlertas";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
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

  const [ carregando, setCarregando ]                                                  = useState<boolean>(false);
  const [ produtoEditarId, setProdutoEditarId ]                                        = useState<string>("");
  const [ nomeProduto, setNomeProduto ]                                                = useState<string>("");
  const [ descricao, setDescricao ]                                                    = useState<string>("");
  const [ preco, setPreco ]                                                            = useState<string>("");
  const [ precoComDesconto, setPrecoComDesconto ]                                      = useState<string | null>("");
  const [ estoque, setEstoque ]                                                        = useState<string>("");
  const [ categoria, setCategoria ]                                                    = useState<CategoriaProduto | null>(null);
  const [ statusEstoqueProduto, setStatusEstoqueProduto ]                              = useState<StatusProduto | null>(null);
  const [ ativo, setAtivo ]                                                            = useState<boolean>(true);
  const [ categorias, setCategorias ]                                                  = useState<Array<{ key: string, label: string, valor: string }>>([]);
  const [ erroNomeProduto, setErroNomeProduto ]                                        = useState<string>("");
  const [ erroDescricao, setErroDescricao ]                                            = useState<string>("");
  const [ erroPreco, setErroPreco ]                                                    = useState<string>("");
  const [ erroPrecoComDesconto, setErroPrecoComDesconto ]                              = useState<string>("");
  const [ erroEstoque, setErroEstoque ]                                                = useState<string>("");
  const [ habilitarBotaoSalvar, setHabilitarBotaoSalvar ]                              = useState<boolean>(false);
  const listaOpcoesAtivoProduto: Array<{ key: string, label: string, valor: string }> = [
    {
      key: "ativo",
      label: "Ativo",
      valor: "Ativo"
    },
    {
      key: "inativo",
      label: "Inativo",
      valor: "Inativo"
    }
  ];

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

        // quantidade de unidades em estoque do produto
        case TipoCampoProduto.estoque:
          setErroEstoque("");
          setEstoque(valorDigitado.trim());

          if (valorDigitado.trim().length === 0) {
            setErroEstoque("Informe a quantidade de unidades em estoque do produto.");
          } else {
            const estoqueNumero: number = parseInt(valorDigitado.trim());

            if (estoqueNumero < 0) {
              setErroEstoque("Uni.Estoque inválido.");
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

      const produtoCadastrar: Produto = {
        nomeProduto: nomeProduto.trim(),
        descricao: descricao.trim(),
        preco: parseFloat(preco.replace(",", ".").replace(".", "").trim()) / 100,
        precoComDesconto: precoComDesconto != null && precoComDesconto != "" ? 
          parseFloat(precoComDesconto.replace(",", ".").replace(".", "").trim()) / 100 
          : undefined,
        ativo: ativo,
        categoria: {
          id: categoria?.id ?? "",
          nomeCategoria: categoria?.nomeCategoria ?? "",
          status: true
        },
        estoque: parseInt(estoque),
        statusEstoque: "estoque_disponivel"
      }

      // validar se já existe outro produto cadastrado com o mesmo nome
      if (await buscarProdutoPeloNomeFirebase(produtoCadastrar.nomeProduto)) {
        setCarregando(false);

        apresentarAlerta("Informe outro nome para o produto.", TipoAlerta.erro);

        return;
      }

      // cadastrar o produto
      await cadastrarProdutoFirebase(produtoCadastrar);

      apresentarAlerta("Produto cadastrado com sucesso.", TipoAlerta.sucesso);
      
      // redirecionar o usuário para a tela de listagem de produtos
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

  // listar categoria de produto
  const listarCategoriasProduto = async () => {

    try {
      setCarregando(true);
      setCategorias([]);

      const categorias: Array<CategoriaProduto> = await listarCategoriasFirebase();

      if (categorias.length === 0) {
        console.log("Não existem categorias salvas na base de dados.");

        apresentarAlerta("Não existem categorias, cadastre-as agora.", TipoAlerta.aviso);

        navigation.replace("cadastro_categoria");
      } else {
        const categoriasAtivas: Array<CategoriaProduto> = categorias.filter(c => c.status);

        setCategorias(categoriasAtivas.map((c: CategoriaProduto) => {

          return {
            key: c.id ?? "",
            label: c.nomeCategoria,
            valor: c.id ?? ""
          }
        }));

        console.log("Categorias listadas com sucesso.");

        setCategoria({
          id: categorias[ 0 ].id ?? "",
          nomeCategoria: categorias[ 0 ].nomeCategoria,
          status: categorias[ 0 ].status
        });
      }

    } catch (e) {
      console.error(`Erro ao tentar-se listar as categorias: ${ e }`, TipoAlerta.erro);

      apresentarAlerta("Erro, tente novamente.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  useFocusEffect(useCallback(() => {
    listarCategoriasProduto();
  }, []));

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
      { /** campo para o usuário informar se o produto está ativo ou inativo */ }
      <Campo
        valor={ ativo ? "Ativo" : "Inativo" }
        habilitado={ true }
        label="Ativo"
        onVisualizarSenha={ () => {} }
        senhaVisivel={ true }
        tipoCampo={ TipoCampo.multiploSeletorPadrao }
        erro=""
        opcoes={ listaOpcoesAtivoProduto }
        onSelecionarOpcao={ (opcaoSelecionada: string) => {

          if (opcaoSelecionada === "Ativo") {
            setAtivo(true);
          } else {
            setAtivo(false);
          }

        } } />
      { /** campo para o usuário informar a categoria do produto */ }
      <Campo
        valor={ categoria?.id ?? "" }
        habilitado={ true }
        label="Categoria"
        onVisualizarSenha={ () => {} }
        senhaVisivel={ true }
        tipoCampo={ TipoCampo.multiploSeletorPadrao }
        erro=""
        opcoes={ categorias }
        onSelecionarOpcao={ (categoriaSelecionada: string) => {
          let categoriaUsuarioSelecionou: { key: string, label: string, valor: string } | null = null;

          for (let i: number = 0; i < categorias.length; i++) {

            if (categorias[ i ].valor === categoriaSelecionada) {
              categoriaUsuarioSelecionou = categorias[ i ];
            }

          }

          if (categoriaUsuarioSelecionou != null) {
            setCategoria({
              id: categoriaUsuarioSelecionou.key,
              nomeCategoria: categoriaUsuarioSelecionou.label,
              status: true
            });
          }

        } } />
      { /** campo para o usuário informar a quantidade de unidades em estoque do produto */ }
      <Campo
        valor={ estoque }
        habilitado={ true }
        label="Uni.Estoque"
        senhaVisivel={ true }
        tipoCampo={ TipoCampo.numericoInteiro }
        erro={ erroEstoque }
        onVisualizarSenha={ () => {} }
        alterarValor={ (estoqueDigitado: string) => {
          onDigitar(estoqueDigitado, TipoCampoProduto.estoque);
        } } />
      <BotaoPadrao
        habilitado={ habilitarBotaoSalvar }
        titulo={ produtoEditarId === "" ? "Cadastrar" : "Salvar" }
        onPressionar={ salvar } />
    </ScrollView>
  </Tela>
}

export default CadastroProduto;