import axios from 'axios';
import { useEffect, useState } from 'react';
import './addItem.css';
import "@sweetalert2/themes/material-ui/material-ui.css";
import Swal from 'sweetalert2/src/sweetalert2.js';
import { useSelector, useDispatch } from 'react-redux';
import { setIsSuccess, setProdErr } from '../../redux/actions/product';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { ErrorDiv } from '../Error Div/ErrorDiv';


export const AddItem = () => {

    const [namef, setNamef] = useState(false);
    const [linkf, setLinkf] = useState(false);
    const [reNamef, setReNamef] = useState(false);
    const [descf, setDescf] = useState(false);

    const dispatch = useDispatch();
    const err = useSelector((state) => state.products.err);
    const isSuccess = useSelector((state)=> state.products.isSuccess)

  
   
    const [data, setData] = useState({
        title: '',
        link: '',
        description: '',
        res_name: ''
    })

    const handleChange = (e) => {
        let { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        })
    }

    const [errObj, setErrObj] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault()
        let { title, link, description, res_name } = data;

        let obj = {
            title: '',
            link: '',
            res_name: '',
            description: ''
        }

        if (title.length === 0) {
            obj.title = 'Title should not be empty'
        } else if (title.length < 2 || title.length > 20) {
            obj.title = 'Title should not be less than 2 or exceed 20 characters'
        }

        if (link.length === 0) {
            obj.link = 'Link should not be empty'
        } else if ((link.length < 6) || (!link.includes('http') && !link.includes('www'))) {
            obj.link = 'Link should be a valid link'
        }

        if (res_name.length === 0) {
            obj.res_name = 'Resource Name should not be empty'
        } else if (res_name.length < 2 || res_name.length > 15) {
            obj.res_name = 'Resource Name should not be less than 2 or exceed 20 characters'
        }

        if (description.length === 0) {
            obj.description = 'Description should not be empty'
        } else if (description.length < 10 || description.length > 50) {
            obj.description = 'Description should not be less than 10 or exceed 50 characters'
        }

        setErrObj(obj)

        if (obj.title === '' && obj.link === '' && obj.res_name === '' && obj.description === '') {
            axios.get('https://media-content.ccbp.in/website/react-assignment/add_resource.json')
                .then(res => {dispatch(setProdErr(false))
                    dispatch(setIsSuccess('yes'))
                }
                ).catch(err => { dispatch(setIsSuccess('no'));})
        }

    }

    return (
        <>

        {isSuccess!=='' && <ErrorDiv/> }

            <div className='addItem_con'>
                <Link to='/'>
                    <div className="homeLink_con">
                        <RiArrowLeftSLine className="arrowIcon" />
                        <p>Resources</p>
                    </div>
                </Link>
                <div className='addItem_upper'>
                    <h1>Item Details</h1>

                    <form className='form'>
                        <label className={namef ? 'display_block' : 'display_none'}>ITEM NAME</label> <br />
                        <input name='title' className='addInp' onChange={(e) => { e.target.value === '' ? setNamef(false) : setNamef(true); handleChange(e) }} type="text" id='name' placeholder="ITEM NAME" /> <br />
                        <div className='err_div'>{errObj.title}</div>

                        <label className={linkf ? 'display_block' : 'display_none'}>LINK</label><br />
                        <input name='link' className='addInp' onChange={(e) => { e.target.value === '' ? setLinkf(false) : setLinkf(true); handleChange(e) }} type="text" id='link' placeholder="LINK" /><br />
                        <div className='err_div'>{errObj.link}</div>

                        <label className={reNamef ? 'display_block' : 'display_none'}>RESOURCE NAME</label><br />
                        <input name='res_name' className='addInp' onChange={(e) => { e.target.value === '' ? setReNamef(false) : setReNamef(true); handleChange(e) }} type="text" id='re_name' placeholder="RESOURCE NAME" /><br />
                        <div className='err_div'>{errObj.res_name}</div>

                        <label className={descf ? 'display_block' : 'display_none'}>DESCRIPTION</label><br />
                        <textarea name='description' className='addInp desc' onChange={(e) => { e.target.value === '' ? setDescf(false) : setDescf(true); handleChange(e) }} type="text" id='desc' placeholder="DESCRIPTION" /><br />
                        <div className='err_div'>{errObj.description}</div>

                    </form>
                    <button onClick={handleSubmit} className="normal_btn blue formBtn">CREATE</button>

                </div>

                <div className='addItem_lower'>
                    <img src='https://media.istockphoto.com/photos/beautiful-spring-flowers-flying-in-the-air-against-teal-background-picture-id1321518288?b=1&k=20&m=1321518288&s=170667a&w=0&h=UzOlgB6XTKmR2aNH64YM8xTTBDSLMMg-qPya1VqMhOc=' alt='img' />
                </div>
            </div>
        </>
    )
}