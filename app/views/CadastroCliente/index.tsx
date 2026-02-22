import BotaoPadrao from "@/app/components/BotaoPadrao";
import Campo, { TipoCampo } from "@/app/components/Campo";
import Loader from "@/app/components/Loader";
import Tela from "@/app/components/Tela";
import { useMemo, useState } from "react";
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

  return (
    <Tela>
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

          } } />
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
            
          } } />
        { /** complemento */ }
        <Campo
          valor={ bairro }
          erro={ erroBairro }
          habilitado={ true }
          label="Bairro"
          senhaVisivel={ true }
          onVisualizarSenha={ () => {} }
          tipoCampo={ TipoCampo.endereco }
          alterarValor={ (bairroDigitado: string) => {
            
          } } />
        <BotaoPadrao
          titulo={ idClienteEditar != "" ? "Salvar" : "Cadastrar" }
          habilitado={ botaoSalvarHabilitado }
          styleAdicional={ {
            marginBottom: 100
          } }
          onPressionar={ () => {

          } } />
      </ScrollView>
    </Tela>
  );
}

export default CadastroCliente;