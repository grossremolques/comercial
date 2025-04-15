import { createContext, useContext, useReducer } from "react";
import { GoogleSheet } from "../../API/AuthGoogle";
import { GestoriaReducer } from "./GestoriaReducer";
const GestoriaContext = createContext();
export const useGestoria = () => useContext(GestoriaContext);
const ss_gestoria = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_GESTORIA,
  rowHead: 1,
  nameSheet: "Registro",
});

export function GestoriaProvider({ children }) {
  const initialState = {
    gestoria: [],
  };
  const [state, dispatch] = useReducer(GestoriaReducer, initialState);
  const getGestoria = async () => {
    const data = await ss_gestoria.getData();
    dispatch({
      type: "GET_GESTORIA",
      payload: data,
    });
  };
  return (
    <GestoriaContext.Provider value={{ gestoria: state.gestoria, getGestoria }}>
      {children}
    </GestoriaContext.Provider>
  );
}
