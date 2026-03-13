// obter a data atual
const obterDataAtual = (): string => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const agora = new Date();

  return agora
    .toLocaleString("pt-BR", {
      timeZone: timezone,
      hour12: false
    })
    .replace(/\//g, "-");
}

export default obterDataAtual;