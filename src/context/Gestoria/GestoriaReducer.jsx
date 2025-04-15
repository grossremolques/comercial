import { GET_GESTORIA } from "../types";
export const GestoriaReducer = (state, action) => {
    const {type, payload} = action;
    switch(type) {
        case GET_GESTORIA:
            return {
               ...state,
                gestoria: payload
            };
        default:
            return state;
    }
}