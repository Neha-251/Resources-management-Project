import { Routes, Route } from "react-router-dom"
import { Home } from "../components/Home/Home"
import { Navbar } from "../components/Navbar/Navbar"



export const AllRoutes = () => {

    return (
        <>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
        </Routes>
        </>
    )
}