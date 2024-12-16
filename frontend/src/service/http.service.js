import axios from "axios";

const httpService = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

// Interceptor para solicitudes
httpService.interceptors.request.use(
  (request) => {
    // Obtener el token de acceso desde sessionStorage (si existe)
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = "Bearer " + accessToken;  // Agregar token de acceso al header
    }

    // Continuar con la solicitud
    return request;
  },
  (error) => {
    console.log("Error en la solicitud de Axios: ", error);
    return Promise.reject(error);  // Rechazar la solicitud si ocurre un error
  }
);

// Interceptor para respuestas
httpService.interceptors.response.use(
  (response) => {
    // Simplemente retornar la respuesta si es exitosa
    return response;
  },
  (error) => {
    // Manejo de errores en la respuesta
    console.log("Error en la respuesta de Axios: ", error);

    if (error.response) {
      // Si el error tiene una respuesta del servidor
      if (error.response.status === 401) {
        // No autenticado
        error.message = "Debe loguearse para acceder a esta funcionalidad";
      } else if (error.response.status === 403) {
        // No autorizado
        error.message = "Usuario no autorizado para acceder a esta funcionalidad";
      } else {
        // Otros errores
        error.message =
          error?.response?.data?.message ??
          "Actualmente tenemos inconvenientes en el servidor, por favor intente más tarde";
      }
    } else if (error.request) {
      // Si no hay respuesta del servidor (error en la petición)
      error.message = "No se recibió respuesta del servidor. Intente más tarde.";
    } else {
      // Errores generales, por ejemplo, configuración de la solicitud
      error.message = "Ocurrió un error desconocido. Intente más tarde.";
    }

    // Mostrar el mensaje de error en la consola
    console.error(error.message);

    // Rechazar la promesa con el error
    return Promise.reject(error);
  }
);

export default httpService;
