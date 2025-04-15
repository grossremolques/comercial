import { createContext, useContext, useReducer } from "react";
import { GoogleSheet } from "../../API/AuthGoogle";
import { UnidadesGrossReducer } from "./UnidadesGrossReducer";
const UnidadesGrossContext = createContext();
export const useUnidadesGross = () => useContext(UnidadesGrossContext);
const ss_unidades_gross = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_UNIDADES_GROSS,
  rowHead: 1,
  nameSheet: "Registro",
});
const ss_atributos = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_UNIDADES_GROSS,
  rowHead: 1,
  nameSheet: "Atributos",
});

export function UnidadesGrossProvider({ children }) {
  const initialState = {
    unidadesGross: [],
    atributosGross: [],
  };
  const [state, dispatch] = useReducer(UnidadesGrossReducer, initialState);
  const getUnidadesGross = async () => {
    const data = await ss_unidades_gross.getData();
    dispatch({
      type: "GET_UNIDADES_GROSS",
      payload: data.reverse(),
    });
  };
  const getAtributos = async () => {
    const data = await ss_atributos.getData();
    dispatch({
      type: "GET_ATRIBUTOS_GROSS",
      payload: data,
    });
  };
  return (
    <UnidadesGrossContext.Provider
      value={{
        unidadesGross: state.unidadesGross,
        getUnidadesGross,
        atributosGross: state.atributosGross,
        getAtributos,
      }}
    >
      {children}
    </UnidadesGrossContext.Provider>
  );
}
