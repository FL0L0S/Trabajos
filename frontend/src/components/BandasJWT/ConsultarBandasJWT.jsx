import React, { useState, useEffect } from "react";
import TablaBandasJWT from './shared/TablaBandasJWT'
import FiltrosBandasJWt from "./shared/FiltrosBandasJWT";
import { bandasJWTService } from "../../service/bandasJWT.service";
import {useNavigate} from 'react-router-dom'

function ConsultarBandasJWT() {
  const tituloPagina = "Bandas JWT (solo para administradores)";
  const [bandas, setBandas] = useState(null);
  const navigate = useNavigate();


  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    getBandas();
  }, []);


  async function getBandas() {
     try {
      let data = await bandasJWTService.getBandasJWT();
      setBandas(data);
    } catch (error) {
      console.log("error al buscar datos en el servidor!")
    }
  }
  const onConsultar = async (filtros) => {
    const bandas = await bandasJWTService.getByFilters(filtros)
    console.log(bandas);
    setBandas(bandas);
}

  const onEliminar = async (idBanda) => {
    await bandasJWTService.borrar(idBanda)
    getBandas()
}
const onEditar = (idBanda) => {
    console.log('onEditar', idBanda);
    navigate(`/bandasJWT/editar/${idBanda}`)   
}
if (!Array.isArray(bandas) || bandas.length === 0) {
  console.warn("bandas no es un arreglo o está vacío:", bandas);
  return <h4>Exclusivo para administradores</h4>;
    
}
  return (
    <>
      <div className="row">
                <br></br>
                <div className="col-12">
                    <FiltrosBandasJWt
                        onConsultarBandas={onConsultar}>
                    </FiltrosBandasJWt>

                    
                    
                </div>
                
                <br></br>
                <br></br>
                <div className="col-12">
                    <TablaBandasJWT items={bandas} 
                    onEliminar={onEliminar}
                    onEditar={onEditar}
                    >
                    </TablaBandasJWT>
                </div>
            </div>
        </>
  );
}
ConsultarBandasJWT.NombreComponenteNoOfuscado = "bandasJWT";
export { ConsultarBandasJWT };