import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';

export default function TablaDiscografica({ items, onEliminar, onEditar }) {
 

    const onEliminarClick = (IdDiscografica) => {
        onEliminar(IdDiscografica); // Llamar a la función para eliminar

    };

    const onEditarClick = (IdDiscografica) => {
        onEditar(IdDiscografica); // Llamar a la función para editar
    };

    // Verificamos que `items` sea un arreglo antes de intentar usar `map()`
    if (!Array.isArray(items) || items.length === 0) {
        console.warn("items no es un arreglo o está vacío:", items);
        return <p>No hay datos para mostrar</p>;
    }

    return (
        <div className="card">
            <div className="card-body">
                <table className="table table-responsive" >
                    <thead className="table-primary" >
                        
                        <tr key={'discografica-h'} >
                            
                            <th scope="col">Nombre</th>
                            <th scope="col">Fecha Union</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    
                    <tbody className="table-group-divider">
                        {items.map((item, index) => {
                            if (!item.Eliminado) { // Mostrar solo los no eliminados
                                return (
                                    <tr key={'discografica-' + index}>
                                        
                                        <td>{item.Nombre}</td>
                                        <td>{item.FechaUnion}</td>
                                        <td>
                                        <ButtonGroup>
                                            <Button variant="danger" onClick={() => onEliminarClick(item.IdDiscografica)}>
                                                Eliminar
                                            </Button>
                                            <Button variant="warning" onClick={() => onEditarClick(item.IdDiscografica)}>
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
