import { Routes, Route } from "react-router-dom"
import { AddItem } from "../components/AddItem/AddItem"
import { Home } from "../components/Home/Home"
import { Navbar } from "../components/Navbar/Navbar"
import { Resource } from "../components/Resource/Resource"
import {Signup} from '../components/Signup/Signup';


export const AllRoutes = () => {

    return (
        <>
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