export const getAuthErrorMessage = (error) => {
  switch (error?.code) {
    case "auth/invalid-email":
      return "El formato del correo electrónico no es válido.";
    case "auth/user-disabled":
      return "Esta cuenta ha sido deshabilitada.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Correo electrónico o contraseña incorrectos.";
    case "auth/email-already-in-use":
      return "Ya existe una cuenta registrada con ese correo electrónico.";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";
    case "auth/too-many-requests":
      return "Demasiados intentos seguidos. Esperá unos minutos e intentá de nuevo.";
    case "auth/network-request-failed":
      return "Error de red. Verificá tu conexión a internet.";
    default:
      return "No se pudo completar la operación. Intentá nuevamente.";
  }
};
