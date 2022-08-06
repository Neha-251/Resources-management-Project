import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { RiArrowLeftSLine } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from "axios";
import './resource.css'
import { useSelector, useDispatch } from "react-redux/es/exports";
import { Link } from 'react-router-dom';
import { CardDetails } from "./CardDetails";
import { getSingleProduct, setResources } from "../../redux/actions/product";
import { ResourcesMap } from "./ResourcesMap";
import "@sweetalert2/themes/material-ui/material-ui.css";
import Swal from 'sweetalert2/src/sweetalert2.js';
import {MdSort} from 'react-icons/md';


export const Resource = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const data = useSelector((state) => state.products.product);
    const resources = useSelector((state) => state.products.resources);
    const err = useSelector((state)=> state.products.err)
    const prodLoading = useSelector((state) => state.products.loading);

    useEffect(()=> {
        if(err){
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: 'Something Went Wrong'
            })
        }
    }, [err])
    useEffect(() => {
        dispatch(getSingleProduct(id))
    }, [id])


    const handleInp = (e) => {

        let search = e.target.value
        if (e.key === 'Enter' && search !== '') {
            let newData = [];
            newData = resources.filter(el => el.title.toLowerCase().includes(search))
            dispatch(setResources(newData));
        }

    }

    //Sorting

    const [sortValue, setSortValue] = useState('');
    const [sortedData, setSortedData] = useState([]);
    

    useEffect(()=> {
        let arr = [...resources];
        if(sortValue === 'recent') {
            arr.sort((a, b) => {return b.id-a.id})
        } else if(sortValue === 'ascend'){
            arr.sort((a, b) => {return a.title.localeCompare(b.title)})
        } else if(sortValue === 'descend'){
            arr.sort((a, b) => {return b.title.localeCompare(a.title)})
        } 
        setSortedData(arr)
    }, [sortValue, resources])

    return (
        <>
            {!prodLoading ?
                <div className='home_main_container'>
                    <Link to='/'>
                        <div className="homeLink_con">
                            <RiArrowLeftSLine className="arrowIcon" />
                            <p>Resources</p>
                        </div>
                    </Link>

                    <CardDetails data={data} />

                    <div>
                        <button className='normal_btn blue'>UPDATE</button>
                    </div>

                    <div className='searchMain_con'>
                        <p>Items</p>
                        <div className="search_container">
                            <span><AiOutlineSearch className='searchIcon' /></span>
                            <input type="text" placeholder="Search" className="search_inp" onKeyUp={handleInp} />
                        </div>
                        <select className='sort_con' name="sort" onChange={(e)=> setSortValue(e.target.value)}>
                            <option className="option_1" value=""><p>Sort</p></option>
                            <option value="recent">Recently Added</option>
                            <option value="ascend">Ascending</option>
                            <option value="descend">Descending</option>
                        </select>
                    </div>

                    {/* ITEMS MAP */}
                    <ResourcesMap data={ sortedData} loading={prodLoading} />

                   
                </div> : <div>Loading</div>}
        </>
    )
}