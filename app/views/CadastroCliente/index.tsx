import BotaoPadrao from "@/app/components/BotaoPadrao";
import Campo, { TipoCampo } from "@/app/components/Campo";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import TelaDadosClienteSalvar from "@/app/components/TelaDadosClienteSalvar";
import cadastrarClienteFirebase from "@/app/firebase/cadastrarUsuario";
import { Cliente } from "@/app/type/cliente";
import { useEffect, useMemo, useState } from "react";
import { ScrollView } from "react-native";

// tela de cadastro de cliente
const CadastroCliente = ({ navigation, route }: any) => {

  const [ carregando, setCarregando ] = useState<boolean>(false);
  const [ idClienteEditar, setIdClienteEditar ] = useState<string>("");
  const [ nome, setNome ] = useState<string>("");
  const [ cpf, setCpf ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ telefone, setTelefone ] = useState<string>("");
  const [ dataNascimento, setDataNascimento ] = useState<string>("");
  const [ genero, setGenero ] = useState<string>("");
  const [ cep, setCep ] = useState<string>("");
  const [ endereco, setEndereco ] = useState<string>("");
  const [ cidade, setCidade ] = useState<string>("");
  const [ bairro, setBairro ] = useState<string>("");
  const [ complemento, setComplemento ] = useState<string>("");
  const [ uf, setUf ] = useState<string>("");
  const [ numero, setNumero ] = useState<string>("");
  const [ erroNome, setErroNome ] = useState<string>("");
  const [ erroCpf, setErroCpf ] = useState<string>("");
  const [ erroEmail, setErroEmail ] = useState<string>("");
  const [ erroTelefone, setErroTelefone ] = useState<string>("");
  const [ erroDataNascimento, setErroDataNascimento ] = useState<string>("");
  const [ erroGenero, setErroGenero ] = useState<string>("");
  const [ erroCep, setErroCep ] = useState<string>("");
  const [ erroEndereco, setErroEndereco ] = useState<string>("");
  const [ erroCidade, setErroCidade ] = useState<string>("");
  const [ erroBairro, setErroBairro ] = useState<string>("");
  const [ erroComplemento, setErroComplemento ] = useState<string>("");
  const [ erroUf, setErroUf ] = useState<string>("");
  const [ erroNumero, setErroNumero ] = useState<string>("");
  const [ clienteVisualizar, setClienteVisualizar ] = useState<Cliente | null>(null);
 
  const getEstadosBrasil = (): Array<{ key: string, label: string, valor: string }> => {

    return [
      { key: "AC", label: "Acre", valor: "AC" },
      { key: "AL", label: "Alagoas", valor: "AL" },
      { key: "AP", label: "Amapá", valor: "AP" },
      { key: "AM", label: "Amazonas", valor: "AM" },
      { key: "BA", label: "Bahia", valor: "BA" },
      { key: "CE", label: "Ceará", valor: "CE" },
      { key: "DF", label: "Distrito Federal", valor: "DF" },
      { key: "ES", label: "Espírito Santo", valor: "ES" },
      { key: "GO", label: "Goiás", valor: "GO" },
      { key: "MA", label: "Maranhão", valor: "MA" },
      { key: "MT", label: "Mato Grosso", valor: "MT" },
      { key: "MS", label: "Mato Grosso do Sul", valor: "MS" },
      { key: "MG", label: "Minas Gerais", valor: "MG" },
      { key: "PA", label: "Pará", valor: "PA" },
      { key: "PB", label: "Paraíba", valor: "PB" },
      { key: "PR", label: "Paraná", valor: "PR" },
      { key: "PE", label: "Pernambuco", valor: "PE" },
      { key: "PI", label: "Piauí", valor: "PI" },
      { key: "RJ", label: "Rio de Janeiro", valor: "RJ" },
      { key: "RN", label: "Rio Grande do Norte", valor: "RN" },
      { key: "RS", label: "Rio Grande do Sul", valor: "RS" },
      { key: "RO", label: "Rondônia", valor: "RO" },
      { key: "RR", label: "Roraima", valor: "RR" },
      { key: "SC", label: "Santa Catarina", valor: "SC" },
      { key: "SP", label: "São Paulo", valor: "SP" },
      { key: "SE", label: "Sergipe", valor: "SE" },
      { key: "TO", label: "Tocantins", valor: "TO" }
    ];
  };
  
  const botaoSalvarHabilitado = useMemo(() => {

    if (nome != "" 
      && email != ""
      && cpf != ""
      && dataNascimento != ""
      && telefone != ""
      && genero != ""
      && cep != ""
      && endereco != ""
      && cidade != ""
      && bairro != ""
      && uf != ""
      && erroNome === ""
      && erroCpf === ""
      && erroEmail === ""
      && erroTelefone === ""
      && erroGenero === ""
      && erroCep === ""
      && erroEndereco === ""
      && erroComplemento === ""
      && erroCidade === ""
      && erroUf === ""
      && erroBairro === ""
      && erroNumero === ""
    ) {

      return true;
    }

    return false;
  }, [
    nome,
    cpf,
    email,
    telefone,
    dataNascimento,
    genero,
    cep,
    endereco,
    cidade,
    bairro,
    complemento,
    uf,
    numero,
    erroNome,
    erroCpf,
    erroEmail,
    erroTelefone,
    erroDataNascimento,
    erroGenero,
    erroCep,
    erroComplemento,
    erroEndereco,
    erroBairro,
    erroCidade,
    erroUf,
    erroNumero
  ]);

  const onDigitarNome = (nomeDigitado: string): void => {
    setNome(nomeDigitado);
    setErroNome("");
  }

  const onDigitarEmail = (emailDigitado: string): void => {
    setEmail(emailDigitado);
    setErroEmail("");
  }

  const onDigitarTelefone = (telefoneDigitado: string): void => {
    setTelefone(telefoneDigitado);
    setErroTelefone("");
  }

  const onDigitarDataNascimento = (dataNascimentoDigitado: string): void => {
    setDataNascimento(dataNascimentoDigitado);
    setErroDataNascimento("");
  }

  const onDigitarCep = (cepDigitado: string): void => {
    setCep(cepDigitado);
    setErroCep("");
  }

  const onDigitarEndereco = (enderecoDigitado: string): void => {
    setEndereco(enderecoDigitado);
    setErroEndereco("");
  }

  const onDigitarCidade = (cidadeDigitada: string): void => {
    setCidade(cidadeDigitada);
    setErroCidade("");
  }

  const onDigitarBairro = (bairroDigitado: string): void => {
    setBairro(bairroDigitado);
    setErroBairro("");
  }

  const onDigitarComplemento = (complementoDigitado: string): void => {
    setComplemento(complementoDigitado);
    setErroComplemento("");
  }

  const onDigitarNumero = (numeroDigitado: string): void => {
    setNumero(numeroDigitado);
    setErroNumero("");
  }
  
  const onDigitarCpf = (cpfDigitado: string): void => {
    setCpf(cpfDigitado);
    setErroCpf("");
  }

  useEffect(() => {
    // quando carregar a tela, deixar SP como padrão e Masculino como padrão
    
    if (uf === "") {
      setUf("SP");
    }

    if (genero === "") {
      setGenero("Masculino");
    }

  }, []);

  const apresentarAlertaSucessoSalvarUsuario = (cliente: Cliente): void => {
    setClienteVisualizar(cliente);
  }

  // salvar o cliente(cadastrar/editar)
  const salvar = async () => {
    
    try {
      setCarregando(true);

      const cliente: Cliente = {
        id: idClienteEditar ?? "",
        nome: nome,
        cpf: cpf,
        email: email,
        telefone: telefone,
        dataNascimento: dataNascimento,
        genero: genero,
        endereco: {
          cep: cep,
          complemento: complemento,
          numero: numero,
          endereco: endereco,
          bairro: bairro,
          cidade: cidade,
          uf: uf
        }
      }

      if (idClienteEditar === "") {
        // cadastrar o cliente
        const resp = await cadastrarClienteFirebase(cliente);

        // apresentar alerta
        apresentarAlertaSucessoSalvarUsuario(resp);
      } else {
        // editar o cliente
      }
      
    } catch (e) {

    } finally {
      setCarregando(false);
    }

  }

  const redirecionarUsuarioListagemClientes = (): void => {
    navigation.navigate("clientes");
  }

  return (
    <Tela>
      { clienteVisualizar && <TelaDadosClienteSalvar clienteApresentar={ clienteVisualizar } onRedirecionar={ () => {
        // redirecionar o usuário para a tela com a listagem dos clientes cadastrados
        redirecionarUsuarioListagemClientes();
      } } /> }
      <Loader carregando={ carregando } msg={ idClienteEditar == "" ? 
        "Registrando o cliente no servidor, aguarde..." 
        : "Enviando os dados do cliente para o servidor, aguarde..." } />
      <ScrollView showsVerticalScrollIndicator={ false }>
        { /** nome do cliente */ }
        <Campo
          valor={ nome }
          erro={ erroNome }
          habilitado={ true }
          label="Nome"
          senhaVisivel={ true }
          onVisualizarSenha={ () => {} }
          tipoCampo={ TipoCampo.nomeUsuario }
          alterarValor={ (nomeDigitado: string) => {
            onDigitarNome(nomeDigitado);
          } } />
        { /** cpf do cliente */ }
        <Campo
          valor={ cpf }
          erro={ erroCpf }
          habilitado={ true }
          label="CPF"
          senhaVisivel={ true }
          onVisualizarSenha={ () => {} }
          tipoCampo={ TipoCampo.cpf }
          alterarValor={ (cpfDigitado: string) => {
            onDigitarCpf(cpfDigitado);
          } } />
        { /** e-mail do cliente */ }
        <Campo
          valor={ email }
          erro={ erroEmail }
          habilitado={ true }
          label="E-mail"
          senhaVisivel={ true }
          onVisualizarSenha={ () => {} }
          tipoCampo={ TipoCampo.email }
          alterarValor={ (emailDigitado: string) => {
            onDigitarEmail(emailDigitado);
          } } />
        { /** gênero do cliente */ }
        <Campo
          valor={ genero }
          erro={ erroGenero }
          habilitado={ true }
          label="Gênero"
          senhaVisivel={ true }
          onVisualizarSenha={ () => {} }
          tipoCampo={ TipoCampo.multiploSeletorGenero }
          opcoes={ [
            { key: "masculino", label: "Masculino", valor: "Masculino" },
            { key: "feminino", label: "Feminino", valor: "Feminino" }
          ] }
          onSelecionarOpcao={ (generoSelecionado: string) => setGenero(generoSelecionado) } />
        { /** telefone do cliente */ }
        <Campo
          valor={ telefone }
          erro={ erroTelefone }
          habilitado={ true }
          label="Telefone"
          senhaVisivel={ true }
          onVisualizarSenha={ () => {} }
          tipoCampo={ TipoCampo.telefone }
          alterarValor={ (telefoneDigitado: string) => {
            onDigitarTelefone(telefoneDigitado);
          } } />
        { /** data de nascimento do cliente */ }
        <Campo
          valor={ dataNascimento }
          erro={ erroDataNascimento }
          habilitado={ true }
          label="Data de nascimento"
          senhaVisivel={ true }
          onVisualizarSenha={ () => {} }
          tipoCampo={ TipoCampo.data }
          alterarValor={ (dataNascimentoDigitada: string) => {
            onDigitarDataNascimento(dataNascimentoDigitada);
          } } />
        { /** cep */ }
        <Campo
          valor={ cep }
          erro={ erroCep }
          habilitado={ true }
          label="CEP"
          senhaVisivel={ true }
          onVisualizarSenha={ () => {} }
          tipoCampo={ TipoCampo.cep }
          alterarValor={ (cepDigitado: string) => {
            onDigitarCep(cepDigitado);
          } }
          onConsultarEnderecoPeloCep={ () => {

          } } />
        { /** endereço */ }
        <Campo
          valor={ endereco }
          erro={ erroEndereco }
          habilitado={ true }
          label="Endereço"
          senhaVisivel={ true }
          onVisualizarSenha={ () => {} }
          tipoCampo={ TipoCampo.endereco }
          alterarValor={ (enderecoDigitado: string) => {
            onDigitarEndereco(enderecoDigitado);
          } } />
        { /** complemento */ }
        <Campo
          valor={ complemento }
          erro={ erroComplemento }
          habilitado={ true }
          label="Complemento(opcional)"
          senhaVisivel={ true }
          onVisualizarSenha={ () => {} }
          tipoCampo={ TipoCampo.complemento }
          alterarValor={ (complementoDigitado: string) => {
            onDigitarComplemento(complementoDigitado);
          } } />
        { /** cidade */ }
        <Campo
          valor={ cidade }
          erro={ erroCidade }
          habilitado={ true }
          label="Cidade"
          senhaVisivel={ true }
          onVisualizarSenha={ () => {} }
          tipoCampo={ TipoCampo.endereco }
          alterarValor={ (cidadeDigitada: string) => {
            onDigitarCidade(cidadeDigitada);
          } } />
        { /** bairro */ }
        <Campo
          valor={ bairro }
          erro={ erroBairro }
          habilitado={ true }
          label="Bairro"
          senhaVisivel={ true }
          onVisualizarSenha={ () => {} }
          tipoCampo={ TipoCampo.endereco }
          alterarValor={ (bairroDigitado: string) => {
            onDigitarBairro(bairroDigitado);
          } } />
        { /** estado */ }
        <Campo
          valor={ uf }
          erro={ erroUf }
          habilitado={ true }
          label="Estado"
          senhaVisivel={ true }
          onVisualizarSenha={ () => {} }
          tipoCampo={ TipoCampo.multiploSeletorEndereco }
          opcoes={ getEstadosBrasil() }
          onSelecionarOpcao={ (estadoSelecionado: string) => {
            setUf(estadoSelecionado);
          } } />
        { /** número */ }
        <Campo
          valor={ numero }
          erro={ erroNumero }
          habilitado={ true }
          label="Número(opcional)"
          senhaVisivel={ true }
          onVisualizarSenha={ () => {} }
          tipoCampo={ TipoCampo.endereco }
          alterarValor={ (numeroDigitado: string) => {
            onDigitarNumero(numeroDigitado);
          } } />
        <BotaoPadrao
          titulo={ idClienteEditar != "" ? "Salvar" : "Cadastrar" }
          habilitado={ botaoSalvarHabilitado }
          styleAdicional={ {
            marginBottom: 100
          } }
          onPressionar={ salvar } />
      </ScrollView>
    </Tela>
  );
}

export default CadastroCliente;