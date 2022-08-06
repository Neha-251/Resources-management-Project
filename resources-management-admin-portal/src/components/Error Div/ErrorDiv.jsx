import { useSelector, useDispatch } from "react-redux"
import { setIsSuccess } from "../../redux/actions/product"
import './errDiv.css'

export const ErrorDiv = () => {

    const dispatch = useDispatch()
    const isSuccess = useSelector((state)=> state.products.isSuccess)

    if(isSuccess !== '') {
        setTimeout(()=> {
            dispatch(setIsSuccess(''))
        }, 3000)
    }
    return (
        <div className={isSuccess==='yes'? 'errDiv green' : "errDiv red"}>
            <span onClick={()=> dispatch(setIsSuccess(''))}>✖</span>
            <p>
                {isSuccess==='yes'? 'Request is Successful' : 'Request Failed'}
            </p>
        </div>
    )
}