
import { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { Pagination } from '../Pagination/Pagination';
import { Link } from 'react-router-dom';

export const CardContainer = ({ data }) => {

    const [prodData, setProdData] = useState([])


    useEffect(() => {
        setProdData(data)
    }, [data])

    const handleInp = (e) => {

        // notes={notes.filter((el)=>el.text.toLowerCase().includes(search))} 
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
            setProdData(newData);
        }

    }


    //pagination

    const [currPage, setCurrPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(6);
    const [currItems, setCurrItems] = useState([])
    console.log('currItems', currItems)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        setTotalPage(Math.ceil(data.length / itemPerPage))
        const indLastItem = currPage * itemPerPage;
        console.log('indLastItem', indLastItem)
        const indFirstItem = indLastItem - itemPerPage
        console.log('indFirstItem', indFirstItem)
        setCurrItems(prodData.slice(indFirstItem, indLastItem))
    }, [prodData, currPage])

    const paginate = pageNumber => setCurrPage(pageNumber);
    const paginateNext = () => { currPage < totalPage && setCurrPage(prev => prev + 1) };
    const paginatePrev = () => { currPage > 1 && setCurrPage(prev => prev - 1) };

    const pageNumbers = [];

    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }
    console.log('pageNumbers', pageNumbers)

    //pagination

    return (

        <div>
            <div>
                <div className="search_container">
                    <span><AiOutlineSearch className='searchIcon' /></span>
                    <input type="text" placeholder="Search" className="search_inp" onKeyUp={handleInp} />
                </div>

            </div>
            <div className="card_container">

                {
                    currItems.map((el) => {
                        return (
                            <div className="card" key={el.id}>
                                <Link to={`/resource/${el.id}`}>
                                    <div className='card_upper'>
                                        <div className='card_upper1'>
                                            <img className="card_img" src={el.icon_url} alt={el.title} />
                                        </div>
                                        <div className='card_upper2'>
                                            <p>{el.title}</p>
                                            <p>{el.category}</p>
                                        </div>

                                    </div>
                                    <div className='card_lower'>
                                        <p>{el.link}</p>
                                        <p>{el.description}</p>
                                    </div>
                                </Link>

                            </div>
                        )
                    })
                }
            </div>

            <Pagination
                totalPage={totalPage}
                paginate={paginate}
                paginateNext={paginateNext}
                paginatePrev={paginatePrev}
                currPage={currPage}
            />

        </div>
    )
}