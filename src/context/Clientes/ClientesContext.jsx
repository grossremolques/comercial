import { createContext, useContext, useReducer } from "react";
import { ClientesReducer } from "./ClientesReducer";
import { GoogleSheet } from "../../API/AuthGoogle";
import { Provincias } from "../../API/Georef";
const ClientesContext = createContext();

export const useClientes = () => useContext(ClientesContext);

const ss_clientes = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_CLIENTES,
  rowHead: 1,
  nameSheet: "Datos Generales",
});
const ss_localidades = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_CLIENTES,
  rowHead: 1,
  nameSheet: "Localidades",
});

export const ClientesProvider = ({ children }) => {
  const initialState = {
    clientes: [],
    provincias: []
  };
  const [state, dispatch] = useReducer(ClientesReducer, initialState);
  const getClientes = async () => {
    const data = await ss_clientes.getData();
    dispatch({
      type: "GET_CLIENTES",
      payload: data.reverse(),
    });
  };
  const getClienteById = async (value) => {
    const id = await ss_clientes.getDataById("id", value);
    return id;
  };
  const getProvincias = async () => {
    const data = await ss_localidades.getData();
    const provincias = [...new Set(data.map(item => item.provincia))]
    dispatch({
      type: "GET_PROVINCIAS",
      payload: provincias,
    });
  };
  const getLocalidades = async (codPostal) => {
    const data = await ss_localidades.getData();
    return data.filter(item => item.cod_postal == codPostal)
  };
  const postCliente = async (data) => {
    try {
      const dataClientes = await ss_clientes.getData();
      const isAlreadyIn = dataClientes.some(
        (item) => item.cuit === data.cuit
      );
      if (!isAlreadyIn) {
        const response = await ss_clientes.postData(data)
        return response;
      } else {
        return { isAlreadyIn: "Repetido" };
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updateCliente = async (data, cuit) => {
    try {
      const dataClientes = await ss_clientes.getData();
      const isAlreadyIn = dataClientes.some(
        (item) => item.id == data.id
      );
      if (!isAlreadyIn) {
        const response = await ss_clientes.updateData({colName: "cuit", id: cuit, values: data});
        return response;
      }
      else {
        return { isAlreadyIn: "Repetido Id" };
      }
      
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ClientesContext.Provider
      value={{
        clientes: state.clientes,
        getClientes,
        getClienteById,
        provincias: state.provincias,
        getProvincias,
        postCliente,
        updateCliente,
        getLocalidades
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};
