import { GET_UNIDADES_GROSS, GET_ATRIBUTOS_GROSS } from "../types";
export const UnidadesGrossReducer = (state, action) => {
    const {type, payload} = action;
    switch(type) {
        case GET_UNIDADES_GROSS:
            return {
               ...state,
                unidadesGross: payload
            };
        case GET_ATRIBUTOS_GROSS:
            return {
               ...state,
                atributosGross: payload
            };    

        default:
            return state;
    }
}