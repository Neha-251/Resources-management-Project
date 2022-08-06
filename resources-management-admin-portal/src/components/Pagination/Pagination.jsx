import "./pagination.css"
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';


export const Pagination = ({ totalPage, paginate, paginatePrev, paginateNext, currPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination_container'>

      <ul className='pagination'>
        { currPage!==1 && <li onClick={paginatePrev} className="page_item"><span ><RiArrowLeftSLine /></span></li>}
        {pageNumbers.map(number => (
          number < 3 ? <li key={number}  onClick={() => paginate(number)} className={number === currPage ? 'currPage_item' : 'page_item'}>
            <span>
              {number}
            </span>
          </li> : null
        ))}
        { totalPage > 4 && <li className='page_item'>.....</li>}
        {pageNumbers.map(number => (
          number >= 3 && number <= totalPage-2 && number === currPage ? <li key={number} onClick={() => paginate(number)} className={number === currPage ? 'currPage_item' : 'page_item'}>
            <span>
              {number}
            </span>
          </li> : null
        ))}

        {pageNumbers.map(number => (
          number > totalPage - 2 ? <li key={number} onClick={() => paginate(number)} className={number === currPage ? 'currPage_item' : 'page_item'}>
            <span>
              {number}
            </span>
          </li> : null
        ))}

        {currPage!==totalPage && <li onClick={paginateNext} className="page_item"><span><RiArrowRightSLine /></span></li>}

      </ul>


    </div>
  );
};