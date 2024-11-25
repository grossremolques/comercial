import { createContext, useContext, useReducer } from "react";
import { CamionesReducer } from "./CamionesReducer";
import { GoogleSheet } from "../../API/AuthGoogle";
import { createId } from "../../utils/functions";
import { useModal } from "../ModalContext";

const CamionesContext = createContext();
export const useCamiones = () => useContext(CamionesContext);
const ss_camiones = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_CAMIONES,
  rowHead: 1,
  nameSheet: "Propuesta",
  description: 'REG-CO-0169 Camiones REV 01'
});
const ss_atributos = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_CAMIONES,
  rowHead: 1,
  nameSheet: "Atributos",
});

export function CamionesProvider({ children }) {
  const {handleModalShow }= useModal()
  const initialState = {
    camiones: [],
    atributos: [],
  };
  const [state, dispatch] = useReducer(CamionesReducer, initialState);
  const getCamiones = async () => {
    const data = await ss_camiones.getData();
    if(data.error) {
      const messageError = () => {
        return (
          <div>
            <p>Hubo un error al intentar obtener los camiones.</p>
            <code>Code: {data.error.code}</code><br/>
            <code>Message: {data.error.message}</code><br/>
            <code>Status: {data.error.status}</code>
          </div>
        )
      }
      handleModalShow('error', messageError)
    }
    else {
      dispatch({
        type: "GET_CAMIONES",
        payload: data.reverse(),
      });
    } 
  };
  const getAtributos = async () => {
    const data = await ss_atributos.getData();
    dispatch({
      type: "GET_ATRIBUTOS",
      payload: data,
    });
  };
  const postCamion = async (data) => {
    try {
      const dataCamiones = await ss_camiones.getData();
      const isAlreadyIn = dataCamiones.some(
        (item) => item.vin === data.vin || item.dominio === data.dominio
      );
      if (!isAlreadyIn) {
        try {
          const id = createId({
            num: "4",
            data: dataCamiones,
            columnId: "trazabilidad",
          });
          try {
            data.trazabilidad = id;
            const response = await ss_camiones.postData(data);
            return response;
          } catch (error) {
            console.error(error);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        return { isAlreadyIn: "El camión ya se encuentra ingresado, " };
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getCamionById = async (value) => {
    const camion = await ss_clientes.getDataById("trazabilidad", value);
    return camion;
  }
  const updateCamion = async (data, id) => {
    try {
      const response = await ss_camiones.updateData({colName: "trazabilidad", id: id, values: data});
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <CamionesContext.Provider
      value={{
        camiones: state.camiones,
        getCamiones,
        atributos: state.atributos,
        getAtributos,
        postCamion,
        getCamionById,
        updateCamion
      }}
    >
      {children}
    </CamionesContext.Provider>
  );
}
