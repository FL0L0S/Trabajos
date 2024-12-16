import { useState } from "react"
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom"

export default function FiltrosAlbums({onConsultarAlbums}) {
    const [albums, setAlbums] = useState('') 
    const navigate = useNavigate();

    const onFiltrarClick = () => {
        onConsultarAlbums({Nombre: albums})
    }

    const onRegistrarClick = () => {
        navigate(`/albums/registrar`)
    }

    
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 fs-3">
                            <label htmlFor="staticEmail2"
                                className="visually-hidden">Albums</label>
                            <input type="text"
                                readOnly
                                className="form-control-plaintext"
                                id="staticEmail2"
                                value="Album">
                            </input>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="inputPassword2"
                                className="visually-hidden">Albums</label>
                            <input type="text"
                                className="form-control"
                                id="inputPassword2" 
                                placeholder="Album"
                                onChange={(event) => {setAlbums(event.target.value)}}>
                            </input>
                                                               
                        </div>
                        <div  className="col-auto">
                           
                                <Button variant="primary"
                                        onClick={()=>onFiltrarClick()}>
                                            Consultar
                                </Button>
                                
                                
                        </div>
                        <div className="col-auto ">
                            <Button variant="success"
                                    onClick={()=>onRegistrarClick()}>
                                        Registrar
                            </Button></div>
                    </div>
                </div>
            </div>
        </>
    )
}