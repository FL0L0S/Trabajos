import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup'

export default function TablaBandas({ items }) {

   

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
                            <th scope="col">Vocalista</th>
                            <th scope="col">Fecha Creacion</th>
                          
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {items.map((item, index) => {
                            if (!item.Eliminado) { // Mostrar solo los no eliminados
                                return (
                            <tr key={'banda-' + index}>
                                <td>{item.Nombre}</td>
                                <td>{item.Artista?.Nombre}</td>
                                <td>{item.FechaCreacion}</td>
                               
                            </tr>
                        )}})}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
