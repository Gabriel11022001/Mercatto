// validar telefone
export const validarTelefone = (telefone: string): boolean => {
  if (!telefone) return false;

  const apenasNumeros = telefone.replace(/\D/g, '');

  if (apenasNumeros.length !== 10 && apenasNumeros.length !== 11) {

    return false;
  }

  const ddd = apenasNumeros.substring(0, 2);
  const numero = apenasNumeros.substring(2);

  if (ddd.startsWith('0')) return false;

  if (apenasNumeros.length === 11) {
    
    return numero.startsWith('9');
  }

  return true;
}