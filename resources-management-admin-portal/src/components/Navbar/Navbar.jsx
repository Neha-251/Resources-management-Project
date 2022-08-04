import "./navbar.css";
import {AiOutlineUser} from 'react-icons/ai'


export const Navbar = () => {
    return (
        <nav>
            <img src="https://accounts.ccbp.in/images/icons/Nxtwave_384_384.png" alt="img"/>
            <AiOutlineUser className="userIcon"/>
        </nav>
    )
}