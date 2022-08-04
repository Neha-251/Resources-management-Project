
import { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

export const CardContainer = ({data}) => {

    const [prodData, setProdData] = useState(data)

    // const [inp, setInp] = useState('');

    // useEffect((event)=> {
        
        

    // }, [inp])

    // const handleInp = (e) => {
    //     // if(e.charCode === 13){
    //     //     let newData = [];
    //     //     prodData.forEach((el) => {
    //     //         if(el.title === e.target.value) {
    //     //             newData.push(el)
    //     //         }
    //     //     })
    //     //     setProdData(newData)
    //     // }
    // }

    return (
        <div>
            <div>
                <div className="search_container">
                    <span><AiOutlineSearch className='searchIcon' /></span>
                    <input type="text" placeholder="Search" className="search_inp"  />
                </div>

            </div>
            <div className="card_container">

                {
                    prodData.map((el) => {
                        return (
                            <div className="card" key={el.id}>
                                <div className='card_upper'>
                                    <div  className='card_upper1'>
                                        <img className="card_img" src={el.icon_url} alt={el.title} />
                                    </div>
                                    <div  className='card_upper2'>
                                        <p>{el.title}</p>
                                        <p>{el.category}</p>
                                    </div>

                                </div>
                                <div className='card_lower'>
                                    <p>{el.link}</p>
                                    <p>{el.tag}</p>
                                    <p>{el.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}