import { GET_CLIENTES, GET_PROVINCIAS } from "../types";
export const ClientesReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CLIENTES:
            return {
               ...state,
                clientes: payload
            };
        case GET_PROVINCIAS:
            return {
               ...state,
                provincias: payload
            };
        
        default:
            return state;
    }
}