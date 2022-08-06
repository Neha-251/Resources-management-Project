import { Routes, Route } from "react-router-dom"
import { AddItem } from "../components/AddItem/AddItem"
import { Home } from "../components/Home/Home"
import { Navbar } from "../components/Navbar/Navbar"
import { Resource } from "../components/Resource/Resource"
import {Signup} from '../components/Signup/Signup';
import { useSelector } from "react-redux/es/hooks/useSelector"
import { Modal } from "../components/Modal/Modal"

export const AllRoutes = () => {

    const loading = useSelector((state)=> state.products.loading)
    console.log('loading', loading)

    return (
        <>
        <Navbar/>
        { loading && <Modal/>}
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/resource/:id' element={<Resource/>}/>
            <Route path='/additem' element={<AddItem/>}/>
            <Route path='/signup' element={<Signup/>}/>
        </Routes>
        </>
    )
}