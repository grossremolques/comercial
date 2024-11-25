import { GET_CAMIONES, GET_ATRIBUTOS } from "../types";

export const CamionesReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_CAMIONES:
            return {
                ...state, 
                camiones: payload
            };
        case GET_ATRIBUTOS:
            return {
                ...state,
                atributos: payload
            };        default:
            return state;
    }
}