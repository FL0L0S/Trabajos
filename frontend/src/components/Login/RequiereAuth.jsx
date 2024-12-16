import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../service/auth.service";


function RequireAuth({ children }) {
  let usuarioLogueado = AuthService.getUsuarioLogueado();


  // verificar la autenticacion
  if (!usuarioLogueado) {
    
    return <Navigate to={"/login/" + children.type.NombreComponenteNoOfuscado } />;
}


return children;
}


export { RequireAuth };
