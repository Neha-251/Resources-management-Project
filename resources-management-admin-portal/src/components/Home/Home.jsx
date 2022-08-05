import { CardContainer } from "./CardContainer";
import './home.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/product";


export const Home = () => {

    const [showContainer, setShowContainer] = useState('resources');
    console.log('showContainer', showContainer)

    const dispatch = useDispatch();
    const data = useSelector((state) => state.products.products);
    const [prodData, setProdData] = useState(data);
    const [filteredData, setFilteredData] = useState([]);


    useEffect(() => {
        dispatch(getProducts())
    }, [])
    useEffect(()=> {
        setProdData(data)
    }, [data])
    

    useEffect(()=> {
        if(showContainer==='resources'){

            setFilteredData(prodData);
        } else if(showContainer==='requests'){
            let data = [];

            prodData.forEach((el)=> {
                if(el.tag === 'request'){
                    data.push(el);
                }
            })
            setFilteredData(data)

        } else {
            let data = [];

            prodData.forEach((el)=> {
                if(el.tag === 'user'){
                    data.push(el);
                }
            })
            setFilteredData(data)
        }

    }, [showContainer, prodData])

    return (

        <div className="home_main_container">
            <div className="home_btn_container">
                <button className={showContainer==='resources'? 'clicked_btn' : 'home_btn'} onClick={()=> setShowContainer('resources')}>Resources</button>
                <button className={showContainer==='requests'? 'clicked_btn' : 'home_btn'} onClick={()=> setShowContainer('requests')}>Requests</button>
                <button className={showContainer==='users'? 'clicked_btn' : 'home_btn'} onClick={()=> setShowContainer('users')}>Users</button>
            </div>
            <CardContainer data={filteredData}/>

        </div>

    )
}