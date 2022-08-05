import { useEffect, useState } from "react";
import { Pagination } from "../Pagination/Pagination";
import { DeleteResource } from "./DeleteResource";
import {Link } from 'react-router-dom';



export const ResourcesMap = ({ data, loading }) => {

    //Pagination

    const [currPage, setCurrPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(6);
    const [currItems, setCurrItems] = useState([])
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        setTotalPage(Math.ceil(data.length / itemPerPage))
        const indLastItem = currPage * itemPerPage;
        const indFirstItem = indLastItem - itemPerPage
        setCurrItems(data.slice(indFirstItem, indLastItem))
    }, [data, currPage])

    const paginate = pageNumber => setCurrPage(pageNumber);
    const paginateNext = () => { currPage < totalPage && setCurrPage(prev => prev + 1) };
    const paginatePrev = () => { currPage > 1 && setCurrPage(prev => prev - 1) };

    const pageNumbers = [];

    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }

    //pagination


    const [chosenItem, setChosenItem] = useState([]);
    console.log('chosenItem', chosenItem)
    const [isDelete, setIsDelete] = useState(false);

    const chooseItem = (title) => {

        if (chosenItem.length === 0) {
            setChosenItem([...chosenItem, title])
        } else {

            let item = currItems.filter((el)=> el.title===title)

            if(item[0]){
                let arr = [];
                chosenItem.forEach((el) => {
                    if (title !== el.title) {
                        arr.push(el)
                    }
                })
                setChosenItem(arr)
            } else {
                setChosenItem([...chosenItem, title])
  
            }
            
        }
    }

    const handleDelete = (i) => {
        data.splice(i, 1)
    }

    const handleLink = (link) => {
        window.open(`${link}`, `_blank`)
    }


    return (
        <>
            {
                loading ? <div>Loading</div> :

                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currItems.map((el) => {
                                    return (
                                        <tr key={el.id}>
                                            <td>
                                                <input id='checkBox' onClick={() => chooseItem(el.title)} type="checkbox" />

                                            </td>
                                            <td>{el.title}</td>
                                            <td>{el.description}</td>
                                            <td onClick={()=> handleLink(el.link)} className="td_link">{el.link}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
            }

            <div className="pagination_con">
                <div>
                    <Link to='/additem'><button className='normal_btn green'>ADD ITEM</button></Link>
                    <button className={isDelete ? 'normal_btn red' : 'normal_btn silver'}>DELETE</button>
                </div>
                <div>
                    <Pagination
                        totalPage={totalPage}
                        paginate={paginate}
                        paginateNext={paginateNext}
                        paginatePrev={paginatePrev}
                        currPage={currPage}
                    />
                </div>
            </div>

        </>
    )
}