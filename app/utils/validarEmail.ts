// validar e-mail
const validarEmail = (email: string): boolean => {
  if (!email) return false;

  email = email.trim();

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
}

export default validarEmail;