


export const CardDetails = ({ data }) => {


    return (
        <div className='cardDetails_con'>
            <div className='cardDetails_upper'>
                <div>
                    <img src={data.icon_url} alt={data.title} className="card_img" />
                </div>
                <div className='cardDetails_upper2'>
                    <p>{data.title}</p>
                    <p>{data.resource_items.length}</p>
                    <p>{data.link}</p>
                </div>
            </div>
            <div>
                {data.description}
            </div>
        </div>
    )
}