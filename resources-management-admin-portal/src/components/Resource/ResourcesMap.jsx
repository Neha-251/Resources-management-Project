import { useEffect, useState } from "react";
import { Pagination } from "../Pagination/Pagination";




export const ResourcesMap = ({ data, loading }) => {
    console.log('data', data)

    //Pagination

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

    const chooseItem = (i)=> {
        setChosenItem([...chosenItem, i]);
    }

    const handleDelete = (i)=> {
        data.splice(i, 1)
    }



    return (
        <>
            {
                loading ? <div>Loading</div> :

                    <table>
                        <thead>
                            <tr>
                                <th><div className='checkBox'></div></th>
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
                                                {/* <div onClick={(i)=>chooseItem(i)} className='checkBox'></div> */}
                                                <input type="checkbox" />
                                            </td>
                                            <td>{el.title}</td>
                                            <td>{el.description}</td>
                                            <td className="td_link">{el.link}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
            }

            <div className="pagination_con">
                <div>
                    <button className='normal_btn green'>ADD ITEM</button>
                    <button className='normal_btn silver'>DELETE</button>
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