import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';

export default function TablaRecital({ items, onEliminar, onEditar }) {
 

    const onEliminarClick = (IdRecital) => {
        onEliminar(IdRecital); // Llamar a la función para eliminar

    };

    const onEditarClick = (IdRecital) => {
        onEditar(IdRecital); // Llamar a la función para editar
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
                        <tr key={'recital-h'}>
                            
                            <th scope="col">Lugar</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Tour</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {items.map((item, index) => {
                            if (!item.Eliminado) { // Mostrar solo los no eliminados
                                return (
                                    <tr key={'recital-' + index}>
                                        
                                        <td>{item.Lugar}</td>
                                        <td>{item.Fecha}</td>
                                        <td>{item.Tour?.Nombre}</td>
                                        
                                        <td>
                                        <ButtonGroup>
                                        <Button variant="danger" onClick={() => onEliminarClick(item.IdRecital)}>
                                            Eliminar
                                        </Button>
                                        <Button variant="warning" onClick={() => onEditarClick(item.IdRecital)}>
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
