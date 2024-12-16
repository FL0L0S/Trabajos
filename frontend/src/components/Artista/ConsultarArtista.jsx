import { useEffect, useState } from "react";
import FiltrosArtistas from "./shared/FiltrosArtistas";
import TablaArtista from "./shared/TablaArtistas";
import {artistasService} from "../../service/artistas.service";
import {useNavigate} from 'react-router-dom'

export default function ConsultarArtista() {
    const [artista, setArtista] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getArtistas();
    }, [])

    const getArtistas = async () => {
        const artistas = await artistasService.getArtistas()
        console.log(artistas);
        setArtista(artistas);
    }

    const onConsultar = async (filtros) => {
        const artista = await artistasService.getByFilters(filtros)
        console.log(artista);
        setArtista(artista);
    }
    
    const onEliminar = async (IdArtista) => {
        await artistasService.borrar(IdArtista)
        getArtistas()
    }
    const onEditar = (IdArtista) => {
        console.log('onEditar', IdArtista);
        navigate(`/artistas/editar/${IdArtista}`)
        
        
    }

    return (
        <>

    
            <div className="row">
                <br></br>
                <div className="col-12">
                    <FiltrosArtistas
                        onConsultarArtistas={onConsultar}>
                    </FiltrosArtistas>
                </div>
                
                <br></br>
                <br></br>
                <div className="col-12">
                    <TablaArtista items={artista} 
                    onEliminar={onEliminar}
                    onEditar={onEditar}
                    >
                    </TablaArtista>
                </div>
            </div>
        </>
    )
}