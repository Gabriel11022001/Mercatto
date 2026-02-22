type Config = {

  nomeApp: string;
  versao: string;
  cores: Array<{ nomeCor: string, cor: string }>;

}

export const config: Config = {

  nomeApp: "",
  versao: "v1.0",
  cores: [
    {
      nomeCor: "fundo",
      cor: "#F4F6F8"
    },
    {
      nomeCor: "primaria",
      cor: "#1B3A57"
    },
    {
      nomeCor: "texto",
      cor: "#2D3436"
    },
    {
      nomeCor: "branco",
      cor: "#fff"
    },
    {
      nomeCor: "secundaria",
      cor: "#27AE60"
    },
    {
      nomeCor: "borda",
      cor: "#E0E6ED"
    },
    {
      nomeCor: "botao_desabilitado",
      cor: "#C9D6DF"
    },
    {
      nomeCor: "icone_opcao_menu",
      cor: "#2E5C8A"
    }
  ]

}