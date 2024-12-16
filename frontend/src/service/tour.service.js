import axios from 'axios'
const urlResource = "http://localhost:3000/tours";

async function getTours() {
    const resp = await axios.get(`${urlResource}`);
    return resp.data;
}

async function save(item) {
  
      await axios.post(urlResource, item);
  
  }
  

  const getByFilters = async (filtros) => {
    try {
        const response = await axios.get(`${urlResource}`);
        console.log("Datos recibidos:", response.data); // Verifica los datos recibidos
        
        const resultado = response.data.filter((p) => {
            return p.Nombre.toLocaleLowerCase().includes(filtros.Nombre.toLocaleLowerCase());
        });
        console.log(resultado);
        
        return resultado;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
};

const borrar = async (IdTour) => {
  const url = `${urlResource}/${IdTour}`
  const result = await axios.delete(url)
  return result.data
}

const getById = async (IdTour) => {
    const url = `${urlResource}/${IdTour}`
    const result = await axios.get(url)
    return result.data
}

const put = async (tour) => {
    const url = `${urlResource}/${tour.IdTour}`;
    console.log("Datos en service", tour);
    
    const result = await axios.put(url, tour);
    console.log("Respuesta del servidor:", result.data); // Confirma que los datos se actualizaron
    return result.data;
};





export const toursService = {
    getTours,
    getByFilters,
    save,
    getById,
    put,
    borrar
};
