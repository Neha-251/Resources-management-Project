import { useState } from 'react';
import './addItem.css';


export const AddItem = () => {

    const [namef, setNamef] = useState(false);
    const [linkf, setLinkf] = useState(false);
    const [reNamef, setReNamef] = useState(false);
    const [descf, setDescf] = useState(false);

    const [data, setData] = useState({
    title: '',
    link: '',
    description: '',
    res_name: ''
    })
    console.log('data', data)

    const handleChange = (e) => {
        let {name, value} = e.target;
        setData({...data, 
            [name]: value
        })
    }

    return (
        <>
            <div className='addItem_con'>
                <div className='addItem_upper'>
                    <form className='form'>
                        <h1>Item Details</h1>
                        <label className={namef ? 'display_block' : 'display_none'}>ITEM NAME</label> <br />
                        <input name='title' className='addInp' onChange={handleChange} onChange={(e) => { e.target.value === '' ? setNamef(false) : setNamef(true) }}  type="text" id='name' placeholder="ITEM NAME" /> <br />
                       
                        <label className={linkf ? 'display_block' : 'display_none'}>LINK</label><br />
                        <input name='link' className='addInp' onChange={(e) => { e.target.value === '' ? setLinkf(false) : setLinkf(true)}} type="text" id='link' placeholder="LINK" /><br />
                       
                        <label className={reNamef ? 'display_block' : 'display_none'}>RESOURCE NAME</label><br />
                        <input name='res_name' className='addInp' onChange={(e) => { e.target.value === '' ? setReNamef(false) : setReNamef(true)}} type="text" id='re_name' placeholder="RESOURCE NAME" /><br />
                        <label className={descf ? 'display_block' : 'display_none'}>DESCRIPTION</label><br />
                        <textarea name='description' className='addInp desc' onChange={(e) => { e.target.value === '' ? setDescf(false) : setDescf(true)}} type="text" id='desc' placeholder="DESCRIPTION" /><br />
                        <button className="normal_btn blue formBtn">CREATE</button>
                    </form>
                </div>

                <div className='addItem_lower'>
                    <img src='https://media.istockphoto.com/photos/beautiful-spring-flowers-flying-in-the-air-against-teal-background-picture-id1321518288?b=1&k=20&m=1321518288&s=170667a&w=0&h=UzOlgB6XTKmR2aNH64YM8xTTBDSLMMg-qPya1VqMhOc=' alt='img' />
                </div>
            </div>
        </>
    )
}