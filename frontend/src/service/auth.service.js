import httpService from "./http.service"; // Asegúrate de que httpService esté importado correctamente
import { config } from "../config";
const login = async (username, password, navigateToComponent) => {
  try {
    // Realizamos la solicitud de login
    let resp = await httpService.post(config.urlServidor + "/login", {
      username,
      password,
    });

    if (resp.data?.accessToken) {
      // Si obtenemos un token de acceso, lo almacenamos en sessionStorage
      sessionStorage.setItem("usuarioLogueado", username);
      sessionStorage.setItem("accessToken", resp.data.accessToken);
      sessionStorage.setItem("refreshToken", resp.data.refreshToken);

      // Llamamos a la función CambioUsuarioLogueado si está definida
      if (CambioUsuarioLogueado) CambioUsuarioLogueado(username);

      // Navegar al componente deseado
      navigateToComponent();

    } else {
      // Si no se obtiene un accessToken, mostramos un mensaje de error
      if (CambioUsuarioLogueado) CambioUsuarioLogueado(null);

      // Mostrar el mensaje de error en consola o con alert
      console.error("Usuario o clave incorrectos");
      alert("Usuario o clave incorrectos"); // Puedes usar alert o cualquier otro método para notificar al username
    }
  } catch (error) {
    // Manejo de errores en caso de que algo falle en la solicitud
    console.error("Error al intentar iniciar sesión:", error);
    alert("Ocurrió un error al intentar iniciar sesión. Intente nuevamente más tarde.");
  }
};

const logout = () => {
  // Limpiamos la sesión al cerrar sesión
  sessionStorage.removeItem("usuarioLogueado");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");

  // Llamamos a la función CambioUsuarioLogueado si está definida
  if (CambioUsuarioLogueado) CambioUsuarioLogueado(null);
};

const getUsuarioLogueado = () => {
  // Retorna el username logueado desde sessionStorage
  return sessionStorage.getItem("usuarioLogueado");
};

let CambioUsuarioLogueado = null;

const subscribeUsuarioLogueado = (x) => {
  // Suscribe una función para ser notificada cuando el username cambie
  CambioUsuarioLogueado = x;
};

const AuthService = {
  login,
  logout,
  getUsuarioLogueado,
  subscribeUsuarioLogueado
};

export default AuthService;
