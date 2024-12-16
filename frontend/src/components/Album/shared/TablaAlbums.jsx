import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup'
export default function TablaAlbums({ items, onEliminar, onEditar }) {

    const onEliminarClick = (idAlbum) => {
        onEliminar(idAlbum)
    }
    const onEditarClick = (idAlbum) => {
        onEditar(idAlbum)
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
                        <tr key={'album-h'}>
                            
                            <th scope="col">Nombre</th>
                            <th scope="col">Fecha Lanzamiento</th>
                            <th scope="col">Banda</th>
                            <th scope="col">Discografica</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {items.map((item, index) => {
                            if (!item.Eliminado) { // Mostrar solo los no eliminados
                                return (
                            <tr key={'album-' + index}>
                                
                                <td>{item.Nombre}</td>
                                <td>{item.FechaLanzamiento}</td>
                                <td>{item.Banda?.Nombre}</td>
                                <td>{item.Discografica?.Nombre}</td>
                                <td>
                                <ButtonGroup>
                                        <Button variant="danger" onClick={() => onEliminarClick(item.IdAlbum)}>
                                            Eliminar
                                        </Button>
                                        <Button variant="warning" onClick={() => onEditarClick(item.IdAlbum)}>
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
