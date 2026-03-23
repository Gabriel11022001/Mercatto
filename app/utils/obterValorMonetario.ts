// obter valor informado mas de forma monetária
const obterValorMonetario = (valor: string): string => {
  const numero = parseFloat(valor);

  if (isNaN(numero)) {

    return "0,00";
  }

  const valorFormatado = numero.toFixed(2).replace(".", ",");

  return valorFormatado;
}

export default obterValorMonetario;