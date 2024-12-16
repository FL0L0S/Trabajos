import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';


export default function TablaVideos({ items, onEliminar, onEditar }) {

    const onEliminarClick = (IdVideoClip) => {
        onEliminar(IdVideoClip)
    }
    const onEditarClick = (IdVideoClip) => {
        onEditar(IdVideoClip)
    }

    // Verificamos que `items` sea un arreglo antes de intentar usar `map()`
    if (!Array.isArray(items) || items.length === 0) {
        console.warn("items no es un arreglo o está vacío:", items);
        return <p>No hay datos para mostrar</p>;
    }

    return (
        <div className="card">
            <div className="card-body">
                <table className="table table-responsive">
                    <thead className="table-primary">
                        <tr key={'banda-h'}>
                            
                            <th scope="col">Titulo</th>
                            <th scope="col">Link</th>
                            <th scope="col">Fecha de Lanzamiento</th>
                            <th scope="col">Nombre de la cancion</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead> 
                    <tbody className="table-group-divider">
                        {items.map((item, index) => {
                            if (!item.Eliminado) { // Mostrar solo los no eliminados
                                return (
                            <tr key={'tour-' + index}>
                                
                                <td>{item.Titulo}</td>
                                <td><a href={item.Link} target="_blank" rel="noopener noreferrer">{item.Link}</a></td>
                                <td>{item.FechaLanzamiento}</td>
                                <td>{item.Cancion?.Nombre}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button variant="danger" onClick={() => onEliminarClick(item.IdVideoClip)}>
                                            Eliminar
                                        </Button>
                                        <Button variant="warning" onClick={() => onEditarClick(item.IdVideoClip)}>
                                            Editar
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )}})}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
