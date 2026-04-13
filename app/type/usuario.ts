export type Usuario = {

  id?: string;
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  ativo: boolean;
  dataUltimoLogin?: string;
  tentativasRestantesLogin?: number;

}