import axios from 'axios'
const urlResource = "http://localhost:3000/bandas";

async function getBandas() {
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

const borrar = async (idBanda) => {
  const url = `${urlResource}/${idBanda}`
  const result = await axios.delete(url)
  return result.data
}

const getById = async (idBanda) => {
    const url = `${urlResource}/${idBanda}`
    const result = await axios.get(url)
    return result.data
}

const put = async (banda) => {
    const url = `${urlResource}/${banda.IdBanda}`;
    console.log("Datos en service", banda);
    await axios.put(url, banda);
    // Confirma que los datos se actualizaron

};





export const bandasService = {
    getBandas,
    getByFilters,
    save,
    getById,
    put,
    borrar
};
