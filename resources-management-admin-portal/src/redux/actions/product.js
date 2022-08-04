import { PROD_LOADING, SET_PRODUCTS, PROD_ERROR } from '../constants/ActionTypes'


export const setProdLoading = (payload) => {
    return {
        type: PROD_LOADING,
        payload: payload
    }
}

export const setProdErr = (err) => {
    return {
        type: PROD_ERROR,
        payload: err
    }
}


export const setAllProducts = (products) => {
    return {
        type: SET_PRODUCTS,
        payload: products
    }
}



export const getProducts = () => (dispatch) => {
    dispatch(setProdLoading(true));

    fetch("https://media-content.ccbp.in/website/react-assignment/resources.json")
        .then((res) => res.json())
        .then((res) => dispatch(setAllProducts(res)))
        .catch((err) => dispatch(setProdErr(err)));
};