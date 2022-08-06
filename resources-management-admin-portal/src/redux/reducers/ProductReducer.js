import {
    PROD_ERROR,
    PROD_LOADING,
    SET_PRODUCTS,
    SET_SINGLE_PRODUCT,
    SET_RESOURCES
} from '../constants/ActionTypes';

const initialState ={
   products: [],
   product: {},
   resources: [],
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
            return { ...state,  err: false, products: payload}
        case SET_SINGLE_PRODUCT:
            return { ...state,  err: false, product: payload}
        case SET_RESOURCES:
            return {...state, err: false, resources: payload}
        default:
        return state
    }
}
