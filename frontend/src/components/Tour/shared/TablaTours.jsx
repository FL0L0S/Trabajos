import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
export default function TablaTours({ items, onEliminar, onEditar }) {

    const onEliminarClick = (idTour) => {
        onEliminar(idTour)
    }
    const onEditarClick = (idTour) => {
        onEditar(idTour)
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
                            
                            <th scope="col">Nombre</th>
                            <th scope="col">Fecha de Inicio</th>
                            <th scope="col">Fecha de fin</th>
                            <th scope="col">Nombre de la banda</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead> 
                    <tbody className="table-group-divider">
                        {items.map((item, index) => {
                            if (!item.Eliminado) { // Mostrar solo los no eliminados
                                return (
                            <tr key={'tour-' + index}>
                                
                                <td>{item.Nombre}</td>
                                <td>{item.FechaInicio}</td>
                                <td>{item.FechaFin}</td>
                                <td>{item.Banda?.Nombre}</td>
                                <td>
                                <ButtonGroup>
                                        <Button variant="danger" onClick={() => onEliminarClick(item.IdTour)}>
                                            Eliminar
                                        </Button>
                                        <Button variant="warning" onClick={() => onEditarClick(item.IdTour)}>
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
