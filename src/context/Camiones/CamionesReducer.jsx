import { GET_CAMIONES } from "../types";

export const CamionesReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_CAMIONES:
            return {
                ...state, 
                camiones: payload
            };
        default:
            return state;
    }
}