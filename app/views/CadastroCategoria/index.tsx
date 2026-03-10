import BotaoPadrao from "@/app/components/BotaoPadrao";
import Campo, { TipoCampo } from "@/app/components/Campo";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import { buscarCategoriaPeloIdFirebase, cadastrarCategoriaFirebase, editarCategoriaFirebase } from "@/app/firebase/gestaoCategoria";
import CategoriaProduto from "@/app/type/categoriaProduto";
import { apresentarAlerta, TipoAlerta } from "@/app/utils/apresentarAlertas";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native";

// tela de cadastro de categoria de produto
const CadastroCategoria = ({ navigation, route }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ categoriaEditarId, setCategoriaEditarId ] = useState<string>("");
  const [ nomeCategoria, setNomeCategoria ] = useState<string>("");
  const [ status, setStatus ] = useState<boolean>(true);
  const [ erroNomeCategoria, setErroNomeCategoria ] = useState<string>("");

  const onDigitarNomeCategoria = (nomeDigitado: string): void => {
    setErroNomeCategoria("");
    setNomeCategoria(nomeDigitado);

    if (nomeDigitado.trim().length === 0) {
      setErroNomeCategoria("Informe um nome para a categoria.");
    }

  }

  const preencherCamposDadosCategoria = ({ nomeCategoria, status }: CategoriaProduto): void => {
    setNomeCategoria(nomeCategoria);
    setStatus(status);
  }

  // buscar categoria pelo id
  const buscarCategoriaPeloId = async (idCategoria: string) => {

    try {
      const categoria = await buscarCategoriaPeloIdFirebase(idCategoria);

      if (categoria) {
        preencherCamposDadosCategoria(categoria);
      } else {
        apresentarAlerta("Não foi possível encontrar essa categoria na base de dados.", TipoAlerta.erro);
      }

    } catch (e) {
      // apresentar alerta de erro para o usuário
      console.error(`Erro ao tentar-se buscar a categoria: ${ e }`);

      apresentarAlerta("Erro ao tentar-se buscar a categoria do produto na base de dados, tente novamente.", TipoAlerta.erro);
    }

  }

  // cadastrar categoria do produto
  const cadastrar = async () => {

    try {
      setCarregando(true);

      await cadastrarCategoriaFirebase({
        nomeCategoria: nomeCategoria.trim(),
        status: status
      });

      apresentarAlerta("Categoria cadastrada com sucesso.", TipoAlerta.sucesso);

      setNomeCategoria("");
      setStatus(true);
    } catch (e) {
      console.error(`Erro ao tentar-se cadastrar a categoria: ${ e }`);

      apresentarAlerta("Erro ao tentar-se cadastrar a categoria, tente novamente.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  // editar categoria do produto
  const editar = async () => {

    try {
      setCarregando(true);

      await editarCategoriaFirebase({ id: categoriaEditarId ?? "", nomeCategoria: nomeCategoria.trim(), status: status });
      
      apresentarAlerta("Categoria salva com sucesso.", TipoAlerta.sucesso);
    } catch (e) {
      console.error(`Erro ao tentar-se editar a categoria: ${ e }`);

      apresentarAlerta("Erro ao tentar-se editar a categoria.", TipoAlerta.erro);
    } finally {
      setCarregando(false);
    }

  }

  // salvar categoria do produto
  const salvar = async () => {

    if (categoriaEditarId === "") {
      // cadastrar
      await cadastrar();
    } else {
      // editar
      await editar();
    }

  }

  useFocusEffect(useCallback(() => {

    if (route.params) {

      if (route.params.idCategoriaEditar) {
        setCategoriaEditarId(route.params.idCategoriaEditar);

        buscarCategoriaPeloId(route.params.idCategoriaEditar);
      }

    }

  }, []));

  return <Tela>
    <Loader carregando={ carregando } />
    <ScrollView showsVerticalScrollIndicator={ false }>
      { /** campo para o usuário informar o nome da categoria */ }
      <Campo
        valor={ nomeCategoria }
        habilitado={ true }
        label="Categoria"
        senhaVisivel={ true }
        tipoCampo={ TipoCampo.nomeCategoria }
        onVisualizarSenha={ () => {} }
        erro={ erroNomeCategoria }
        alterarValor={ onDigitarNomeCategoria } />
      { /** campo para o usuário selecionar o status da categoria */ }
      <Campo
        valor={ status ? "Ativo" : "Inativo" }
        habilitado={ true }
        label="Status"
        onVisualizarSenha={ () => {} }
        senhaVisivel={ true }
        tipoCampo={ TipoCampo.multiploSeletorPadrao }
        erro=""
        opcoes={ [
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
        ] }
        onSelecionarOpcao={ (statusSelecionado: string) => {
          setStatus(statusSelecionado.toLowerCase() === "ativo");
        } } />
      <BotaoPadrao 
        titulo={ categoriaEditarId === "" ? "Cadastrar" : "Salvar" } 
        habilitado={ nomeCategoria != "" && erroNomeCategoria === "" } 
        onPressionar={ salvar } />
    </ScrollView>
  </Tela>
}

export default CadastroCategoria;