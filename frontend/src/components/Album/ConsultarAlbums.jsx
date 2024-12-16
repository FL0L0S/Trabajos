import Button from 'react-bootstrap/Button'
import { useEffect, useState } from "react";
import FiltroAlbums from "./shared/FiltroAlbums";
import TablaAlbums from "./shared/TablaAlbums";
import {albumsService} from "../../service/album.service";
import {useNavigate} from 'react-router-dom'

export default function ConsultarAlbums() {
    const [albums, setAlbums] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        
        getAlbums();
    }, [])

    const getAlbums = async () => {
        const albums = await albumsService.getAlbums()
        console.log(albums);
        setAlbums(albums);
    }

    const onConsultar = async (filtros) => {
        const albums = await albumsService.getByFilters(filtros)
        console.log(albums);
        setAlbums(albums);
    }
    
    const onEliminar = async (idAlbum) => {
        await albumsService.borrar(idAlbum)
        getAlbums()
    }
    const onEditar = (idAlbum) => {
        console.log('onEditar', idAlbum);
        navigate(`/albums/editar/${idAlbum}`)   
    }
    

    return (
        <>
            <div className="row">
                <br></br>
                <div className="col-12">
                    <FiltroAlbums
                        onConsultarAlbums={onConsultar}>
                    </FiltroAlbums>

                </div>
                
                <br></br>
                <br></br>
                <div className="col-12">
                    <TablaAlbums items={albums} 
                    onEliminar={onEliminar}
                    onEditar={onEditar}
                    >
                    </TablaAlbums>
                </div>
            </div>
        </>
    )
}