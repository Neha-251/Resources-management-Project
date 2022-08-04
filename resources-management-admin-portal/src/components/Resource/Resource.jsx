import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { RiArrowLeftSLine } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from "axios";
import './resource.css'
import { Link } from 'react-router-dom';
import { CardDetails } from "./CardDetails";

export const Resource = () => {

    const { id } = useParams();
    const [data, setData] = useState({})
    const [resources, setResources] = useState([])
    console.log('resources', resources)

    useEffect(() => {
        axios.get(`https://media-content.ccbp.in/website/react-assignment/resource/${id}.json`)
            .then(res => { setData(res.data); setResources(res.data.resource_items) }).catch(err => console.log(err))
    }, [id])

    const handleInp = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            let newData = [];

            data.forEach((el) => {
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
            setData(newData);
        }

    }

    console.log(data)

    return (
        <>
            <div className='home_main_container'>
                <Link to='/'>
                    <div className="homeLink_con">
                        <RiArrowLeftSLine className="arrowIcon" />
                        <p>Resources</p>
                    </div>
                </Link>

               <CardDetails data={data} />

                <div>
                    <button>UPDATE</button>
                </div>

                <div>
                    <p>Items</p>
                    <div className="search_container">
                        <span><AiOutlineSearch className='searchIcon' /></span>
                        <input type="text" placeholder="Search" className="search_inp" onKeyUp={handleInp} />
                    </div>
                </div>

                <div>
                    {/* ITEMS MAP */}
                </div>

                <div>
                    <div>
                        <button>ADD ITEM</button>
                        <button>DELETE</button>
                    </div>
                    <div>
                        {/* PAGINATION */}
                    </div>
                </div>
            </div>
        </>
    )
}