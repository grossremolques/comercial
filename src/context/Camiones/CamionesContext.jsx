import { createContext, useContext, useReducer } from "react";
import { CamionesReducer } from "./CamionesReducer";
import { GoogleSheet } from "../../API/AuthGoogle";

const CamionesContext = createContext();
export const useCamiones = () => useContext(CamionesContext);
const ss_camiones = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_CAMIONES,
    rowHead: 1,
    nameSheet: 'Propuesta'
})

export function CamionesProvider({ children }) {
  const initialState = {
    camiones: [],
  };
  const [state, dispatch] = useReducer(CamionesReducer, initialState);
  const getCamiones = async () => {
    const data = await ss_camiones.getData()
    dispatch({
      type: "GET_CAMIONES",
      payload:data.reverse(),
    });
  };
  return (
    <CamionesContext.Provider value={{ camiones: state.camiones, getCamiones }}>
      {children}
    </CamionesContext.Provider>
  );
}
