import {
    PROD_ERROR,
    PROD_LOADING,
    SET_PRODUCTS
} from '../constants/ActionTypes';

const initialState ={
   products: [],
   loading: false,
   err: false,
}

export const productReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case PROD_LOADING:
            return { ...state, loading: payload}
        case PROD_ERROR:
            return { ...state, loading: false, err: payload}
        case SET_PRODUCTS:
            return { ...state, loading: false, err: false, products: payload}
        default:
        return state
    }
}
