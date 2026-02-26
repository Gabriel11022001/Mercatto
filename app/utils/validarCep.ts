// validar cep
export const validarCep = (cep: string): boolean => {
  if (!cep) return false;

  const apenasNumeros = cep.replace(/\D/g, '');

  if (apenasNumeros.length !== 8) return false;

  if (/^(\d)\1{7}$/.test(apenasNumeros)) return false;

  return true;
}