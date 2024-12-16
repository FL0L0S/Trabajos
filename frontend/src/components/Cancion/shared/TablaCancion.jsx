import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';

export default function TablaCancion({ items, onEliminar, onEditar }) {
 

    const onEliminarClick = (IdCancion) => {
        onEliminar(IdCancion); // Llamar a la función para eliminar

    };

    const onEditarClick = (IdCancion) => {
        onEditar(IdCancion); // Llamar a la función para editar
    };

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
                        <tr key={'artista-h'}>
                            
                            <th scope="col">Nombre</th>
                            <th scope="col">Fecha Lanzamiento</th>
                            <th scope="col">Album</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {items.map((item, index) => {
                            if (!item.Eliminado) { // Mostrar solo los no eliminados
                                return (
                                    <tr key={'artista-' + index}>
                                        
                                        <td>{item.Nombre}</td>
                                        <td>{item.FechaLanzamiento}</td>
                                        <td>{item.Album?.Nombre}</td>
                                        
                                        <td>
                                        <ButtonGroup>
                                        <Button variant="danger" onClick={() => onEliminarClick(item.IdCancion)}>
                                            Eliminar
                                        </Button>
                                        <Button variant="warning" onClick={() => onEditarClick(item.IdCancion)}>
                                            Editar
                                        </Button>
                                    </ButtonGroup>
                                        </td>
                                    </tr>
                                );
                            }
                            return null;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
