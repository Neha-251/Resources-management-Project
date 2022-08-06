import { PROD_LOADING, SET_PRODUCTS, PROD_ERROR, SET_SINGLE_PRODUCT, SET_RESOURCES, IS_SUCCESS } from '../constants/ActionTypes'



export const setIsSuccess = (payload) => {
    return {
        type: IS_SUCCESS,
        payload: payload
    }
}


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

export const setSingleProduct = (product) => {
    return{
        type: SET_SINGLE_PRODUCT,
        payload: product
    }
}

export const setResources = (resources) => {
    return{
        type: SET_RESOURCES,
        payload: resources
    }
}


export const getProducts = () => (dispatch) => {
    dispatch(setProdLoading(true));

    fetch("https://media-content.ccbp.in/website/react-assignment/resources.json")
        .then((res) => res.json())
        .then((res) => dispatch(setAllProducts(res)))
        .catch((err) => dispatch(setProdErr(err)));
};

export const getSingleProduct = (id) => (dispatch) => {

    dispatch(setProdLoading(true));


    fetch(`https://media-content.ccbp.in/website/react-assignment/resource/${id}.json`)
        .then((res) => res.json())
        .then((res) => {dispatch(setSingleProduct(res)); dispatch(setProdLoading(false)); dispatch(setResources(res.resource_items))})
        .catch((err) => dispatch(setProdErr(err)));
}