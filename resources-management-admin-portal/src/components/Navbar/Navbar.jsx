import "./navbar.css";
import { AiOutlineUser } from 'react-icons/ai'
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

export const Navbar = () => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user_login'));

    const [username, setUsername] = useState('')

    useEffect(() => {
        if(user){
            setUsername(user.name);
        }
    }, [user])

    return (
        <nav>
            <img src="https://accounts.ccbp.in/images/icons/Nxtwave_384_384.png" alt="img" />
            <div>
                <div>
                    <AiOutlineUser className="userIcon" />
                    <p className="username">{username}</p>
                </div>
                <div>
                    {username!==''? <button onClick={()=> {
                        localStorage.removeItem('user_login')
                        setUsername('')
                    }} className="normal_btn blue">LOGOUT</button>
                     : 
                     <button 
                     onClick={()=> navigate('/signup')}
                     className="normal_btn blue">LOGIN</button>
            
                    }
                </div>
            </div>

        </nav>
    )
}