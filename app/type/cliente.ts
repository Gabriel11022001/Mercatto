export type Cliente = {

  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  genero: string;
  endereco: Endereco;
  foto?: string;

}

export type Endereco = {

  cep: string;
  endereco: string;
  complemento: string;
  cidade: string;
  bairro: string;
  uf: string;
  numero: string;

}