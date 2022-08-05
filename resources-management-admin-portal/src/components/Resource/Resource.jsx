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
import { Pagination } from "../Pagination/Pagination";

export const Resource = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const data = useSelector((state) => state.products.product);
    const resources = useSelector((state) => state.products.resources);

    const prodLoading = useSelector((state) => state.products.loading);


    useEffect(() => {
        dispatch(getSingleProduct(id))
    }, [id])


    const handleInp = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            let newData = [];

            resources.forEach((el) => {
                let { title } = el;

                for (let i = 0; i < title.length; i++) {
                    let str = '';
                    for (let j = i; j < title.length; j++) {
                        str += title[j]
                        if (e.target.value === str) {
                            newData.push(el);
                        }
                    }
                }
            })
            dispatch(setResources(newData))
        }

    }

  


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
                    </div>

                    {/* ITEMS MAP */}
                    <ResourcesMap data={resources} loading={prodLoading} />

                   
                </div> : <div>Loading</div>}
        </>
    )
}