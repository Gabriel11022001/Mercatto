// validar a data de nascimento
export const validarDataNascimento = (data: string): boolean => {
  if (!data) return false;

  const regex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!regex.test(data)) return false;

  const [ diaStr, mesStr, anoStr ] = data.split('/');
  const dia = parseInt(diaStr, 10);
  const mes = parseInt(mesStr, 10);
  const ano = parseInt(anoStr, 10);

  if (mes < 1 || mes > 12) return false;

  const dataObj = new Date(ano, mes - 1, dia);

  if (
    dataObj.getFullYear() !== ano ||
    dataObj.getMonth() !== mes - 1 ||
    dataObj.getDate() !== dia
  ) {

    return false;
  }

  const hoje = new Date();

  if (dataObj > hoje) return false;

  return true;
}