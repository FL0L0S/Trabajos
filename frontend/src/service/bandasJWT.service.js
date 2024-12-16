import httpService from "./http.service";


const urlResource = "http://localhost:3000/bandasJWT";

async function getBandasJWT() {
    const resp = await httpService.get(`${urlResource}`);
    return resp.data;
}

async function save(item) {
    await httpService.post(urlResource, item);
}


const getByFilters = async (filtros) => {
  try {
      const response = await httpService.get(`${urlResource}`);
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
const result = await httpService.delete(url)
return result.data
}

const getById = async (idBanda) => {
  const url = `${urlResource}/${idBanda}`
  const result = await httpService.get(url)
  return result.data
}

const put = async (banda) => {
  const url = `${urlResource}/${banda.IdBanda}`;
  console.log("Datos en service", banda);
  await httpService.put(url, banda);
  // Confirma que los datos se actualizaron

};





export const bandasJWTService = {
  getBandasJWT,
  getByFilters,
  save,
  getById,
  put,
  borrar
};