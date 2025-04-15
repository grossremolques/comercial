const API_URL = 'https://apis.datos.gob.ar/georef/api'

export const Provincias = async () => { 
    const response = await fetch(`${API_URL}/provincias?&campos=nombre`);
    return await response.json()
}
export const LocalidadesByProvincia = async (provincia) => {
    const response = await fetch(`${API_URL}/localidades?provincia=${provincia}&campos=nombre&max=1000`);
    return await response.json()
}
//https://apis.datos.gob.ar/georef/api/localidades-censales?
//https://apis.datos.gob.ar/georef/api/localidades?provincia=30&campos=localidad_censal&max=1000
//https://apis.datos.gob.ar/georef/api/localidades?provincia=30&campos=nombre