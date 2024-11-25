import { createContext, useContext, useReducer } from "react";
import { ClientesReducer } from "./ClientesReducer";
import { GoogleSheet } from "../../API/AuthGoogle";

const ClientesContext = createContext();

export const useClientes = () => useContext(ClientesContext);

const ss_clientes = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_CLIENTES,
  rowHead: 1,
  nameSheet: "Registro",
});
const ss_provincias = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_CLIENTES,
  rowHead: 1,
  nameSheet: "Provincias",
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
    const data = await ss_provincias.getData();
    dispatch({
      type: "GET_PROVINCIAS",
      payload: data,
    });
  };
  return (
    <ClientesContext.Provider
      value={{
        clientes: state.clientes,
        getClientes,
        getClienteById,
        provincias: state.provincias,
        getProvincias
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};
