/**
 * Formatea un RUT chileno
 * Entrada: "123456789" o "12.345.678-9" o "12345678-9"
 * Salida: "12.345.678-9"
 */
export const formatearRUT = (rut) => {
  // Eliminar todo excepto números y la K
  const rutLimpio = rut.replace(/[^0-9kK]/g, "");

  // Si está vacío, retornar vacío
  if (!rutLimpio) return "";

  // Separar dígito verificador
  let cuerpo = rutLimpio.slice(0, -1);
  let dv = rutLimpio.slice(-1).toUpperCase();

  // Si solo hay un carácter, no formatear
  if (rutLimpio.length <= 1) return rutLimpio;

  // Formatear cuerpo con puntos
  cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Retornar formato completo
  return `${cuerpo}-${dv}`;
};

/**
 * Valida si un RUT es válido
 */
export const validarRUT = (rut) => {
  // Eliminar puntos y guión
  const rutLimpio = rut.replace(/[.-]/g, "");

  // Validar formato básico
  if (!/^[0-9]+[0-9kK]$/.test(rutLimpio)) return false;

  // Separar cuerpo y dígito verificador
  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1).toUpperCase();

  // Calcular dígito verificador
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvCalculado =
    dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

  return dv === dvCalculado;
};
