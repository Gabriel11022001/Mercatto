const obterDataFormatada = (data: Date): string => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return data
    .toLocaleString("pt-BR", {
      timeZone: timezone,
      hour12: false
    })
    .replace(/\//g, "-");
}

export default obterDataFormatada;