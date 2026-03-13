const obterDataAcrescidoMinutos = (dataStr: string): Date => {
  const [dataParte, horaParte] = dataStr.split(', ');

  const [dia, mes, ano] = dataParte.split('-').map(Number);
  const [hora, minuto, segundo] = horaParte.split(':').map(Number);

  const data = new Date(ano, mes - 1, dia, hora, minuto, segundo);

  data.setMinutes(data.getMinutes() + 30);

  return data;
}

export default obterDataAcrescidoMinutos;
