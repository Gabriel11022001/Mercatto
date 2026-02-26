// validar cpf
const validarCpf = (cpf: string): boolean => {
  if (!cpf) return false;

  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const calcularDigito = (base: string, pesoInicial: number): number => {
    let soma = 0;

    for (let i = 0; i < base.length; i++) {
      soma += parseInt(base[i]) * (pesoInicial - i);
    }

    const resto = soma % 11;

    return resto < 2 ? 0 : 11 - resto;
  };

  const primeiroDigito = calcularDigito(cpf.substring(0, 9), 10);

  const segundoDigito = calcularDigito(cpf.substring(0, 10), 11);

  return (
    primeiroDigito === parseInt(cpf[9]) &&
    segundoDigito === parseInt(cpf[10])
  );
}

export default validarCpf;