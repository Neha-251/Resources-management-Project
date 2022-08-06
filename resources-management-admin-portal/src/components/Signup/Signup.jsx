import { useEffect, useState } from "react";
import "./signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "@sweetalert2/themes/material-ui/material-ui.css";
import Swal from 'sweetalert2/src/sweetalert2.js'
// @import '~@sweetalert2/themes/dark/dark.scss';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import {TiTick} from 'react-icons/ti';
import {ImCross} from 'react-icons/im';
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setProdErr } from "../../redux/actions/product";

export const Signup = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const Proderr = useSelector((state)=> state.products.err)

    useEffect(()=> {

    })

    const [err, setErr] = useState({
        name: '',
        email: ''
    })

    const [seePsd, setSeePsd] = useState(false);

    const [inp, setInp] = useState({
        name: "",
        email: "",
        password: "",
    })



    const handleChange = (e) => {
        let { name, value } = e.target;
        setInp({
            ...inp,
            [name]: value
        })
    }

    
    const handleSubmit = (e) => {
        e.preventDefault()
        let { name, email } = inp;

        let obj = {
            name: "",
            email: "",
        }

        if (name.length === 0) {
            obj.name = 'Title should not be empty'
        } else if (name.length < 2 || name.length > 20) {
            obj.name = 'Name should not be less than 2 or exceed 20 characters'
        }

        if (email.length === 0) {
            obj.email = 'Email should not be empty'
        } else if ((email.length < 6) || (!email.includes('.com') && !email.includes('@'))) {
            obj.email = 'Email should be a valid email id'
        }

        setErr(obj)

        if(obj.name === '' && obj.email === '' && upperCase && lowercase && num && specialChar && char){
            dispatch(setProdErr(false))
            localStorage.setItem('user_login', JSON.stringify(inp))
            navigate('/')
        } else {
            dispatch(setProdErr(true))
        }
    }


    const [upperCase, setUpperCase] = useState(false)
    console.log('upperCase', upperCase)
    const [lowercase, setLowercase] = useState(false)
    const [char, setChar] = useState(false)
    const [num, setNum] = useState(false)
    const [specialChar, setSpecialChar] = useState(false)

    useEffect(()=> {
        let {password} = inp;

        if(password.length >= 0){
            console.log('coming');
            let calp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let salp = 'abcdefghijklmnopqrstuvwxyz';
            let numStr = '1234567890';
            let spc = '!@#$%^&*-/?';

            let uc = 0;
            let lc = 0;
            let sc = 0;
            let nc = 0;

            for(let i = 0; i < password.length; i++){

                for(let j = 0; j < 26; j++) {
                    if(calp[j] === password[i]){
                        setUpperCase(true)
                        uc++;
                    }
                    if(salp[j] === password[i]){
                        setLowercase(true);
                        lc++;
                    }
                }
                for(let j = 0; j < spc.length; j++) {
                    if(spc[j] === password[i]){
                        setSpecialChar(true);
                        sc++;
                    }
                }
                for(let j = 0; j < numStr.length; j++) {
                    if(numStr[j] === password[i]){
                        setNum(true);
                        nc++;
                    }
                }
            }

            if(password.length >= 8){
                setChar(true)
            } 


            if(uc < 1) {
                setUpperCase(false)
            }
            if(lc < 1) {
                setLowercase(false)
            }
            if(nc < 1) {
                setNum(false)
            }
            if(sc < 1) {
                setSpecialChar(false)
            }
            if(password.length < 8){
                setChar(false)
            } 

           
        }

    }, [inp])

    return (
        <>


            <div className="signup_form">

                <h1 className="heading_register">Login</h1>


                <form>
                    <div className="inp_con">
                        <span className={inp.name !== '' ? "label" : 'display_none'}>Name</span>
                        <input onChange={handleChange} type="text" placeholder="Name" name="name" className="form_inp" /> <br />
                        <div className='err_div'>{err.name}</div>
                    </div>
                    <div className="inp_con">
                        <span className={inp.email !== '' ? "label" : 'display_none'}>Email</span>
                        <input onChange={handleChange} type="email" placeholder="Email" name="email" className="form_inp" /><br />
                        <div className='err_div'>{err.email}</div>
                    </div>
                    <div className="inp_con">
                        <span className={inp.password !== '' ? "label" : 'display_none'}>Password</span>
                        <div className='psd_div'>
                            <input onChange={handleChange} type={seePsd ? "text" : "password"} placeholder="Password" name="password" /><br />
                            <span onClick={() => seePsd ? setSeePsd(false) : setSeePsd(true)}>{seePsd ? <AiFillEye /> : <AiFillEyeInvisible />}</span>
                        </div>

                        <div className={inp.password!=='' ? 'psd_st' : 'display_none'}>
                            <div className={ char? 'psd_green' : 'psd_red'}>
                                <span>{char? <TiTick/> : <ImCross/>}</span>
                                <p>Atleast 8 characters</p>
                            </div>
                            <div className={ upperCase? 'psd_green' : 'psd_red'}>
                                <span>{upperCase? <TiTick/> : <ImCross/>}</span>
                                <p>Must Contain 1 Uppercase</p>
                            </div>
                            <div className={ lowercase? 'psd_green' : 'psd_red'}>
                                <span>{lowercase? <TiTick/> : <ImCross/>}</span>
                                <p>Must Contain 1 Lowercase</p>
                            </div>
                            <div className={ num? 'psd_green' : 'psd_red'}>
                                <span>{num? <TiTick/> : <ImCross/>}</span>
                                <p>Must Contain 1 Number</p>
                            </div>
                            <div className={ specialChar? 'psd_green' : 'psd_red'}>
                                <span>{specialChar? <TiTick/> : <ImCross/>}</span>
                                <p>Must Contain 1 special character</p>
                            </div>
                        </div>
                    </div>


                </form>
                <button onClick={handleSubmit} className="normal_btn blue">LOGIN</button>


            </div>
        </>
    )
}

