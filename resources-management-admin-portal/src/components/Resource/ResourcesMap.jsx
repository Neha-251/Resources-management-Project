import { useEffect, useState } from "react";
import { Pagination } from "../Pagination/Pagination";
import {Link } from 'react-router-dom';
import { Modal } from "../Modal/Modal";
import {useDispatch} from 'react-redux';
import { setResources } from "../../redux/actions/product";



export const ResourcesMap = ({ data, loading }) => {

    const dispatch = useDispatch();

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


    const [isDelete, setIsDelete] = useState(false);

    const chooseItem = () => {
        setIsDelete(true)
       
    }

    const handleDelete = (i) => {
        if(isDelete){data.splice(i, 1); setIsDelete(false); dispatch(setResources(data))}
    }

    const handleLink = (link) => {
        window.open(`${link}`, `_blank`)
    }


    return (
        <>
            {
                loading ? <Modal/> :

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
                <div className="pagination_btnDiv">
                    <Link to='/additem'><button className='normal_btn green'>ADD ITEM</button></Link>
                    <button onClick={handleDelete} className={isDelete ? 'normal_btn red' : 'normal_btn silver'}>DELETE</button>
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