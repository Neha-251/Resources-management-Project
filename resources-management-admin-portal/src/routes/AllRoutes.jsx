import { Routes, Route } from "react-router-dom"
import { AddItem } from "../components/AddItem/AddItem"
import { Home } from "../components/Home/Home"
import { Navbar } from "../components/Navbar/Navbar"
import { Resource } from "../components/Resource/Resource"
import {Signup} from '../components/Signup/Signup';
import { useSelector, useDispatch } from "react-redux"
import { Modal } from "../components/Modal/Modal"
import { setIsSuccess } from "../redux/actions/product"
import { ErrorDiv } from "../components/Error Div/ErrorDiv"

export const AllRoutes = () => {
 
    const dispatch = useDispatch()
    const err = useSelector((state) => state.products.err);
    const isSuccess = useSelector((state) => state.products.isSuccess);

    if(err){
        dispatch(setIsSuccess('no'))
    }

    return (
        <>

        {isSuccess!=='' && <ErrorDiv/>}
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/resource/:id' element={<Resource/>}/>
            <Route path='/additem' element={<AddItem/>}/>
            <Route path='/signup' element={<Signup/>}/>
        </Routes>
        </>
    )
}