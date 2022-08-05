import "./pagination.css"
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';


export const Pagination = ({ totalPage, paginate, paginatePrev, paginateNext, currPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }
  console.log('pageNumbers', pageNumbers)

  return (
    <div className='pagination_container'>

      <ul className='pagination'>
        <li className="page_item"><span onClick={paginatePrev} ><RiArrowLeftSLine /></span></li>
        {pageNumbers.map(number => (
          number < 3 ? <li key={number} className={number === currPage ? 'currPage_item' : 'page_item'}>
            <span onClick={() => paginate(number)}>
              {number}
            </span>
          </li> : null
        ))}
        <li className='page_item'>.....</li>
        {pageNumbers.map(number => (
          number >= 3 && number <= totalPage-2 && number === currPage ? <li key={number} className={number === currPage ? 'currPage_item' : 'page_item'}>
            <span onClick={() => paginate(number)}>
              {number}
            </span>
          </li> : null
        ))}

        {pageNumbers.map(number => (
          number > totalPage - 2 ? <li key={number} className={number === currPage ? 'currPage_item' : 'page_item'}>
            <span onClick={() => paginate(number)}>
              {number}
            </span>
          </li> : null
        ))}

        <li className="page_item"><span onClick={paginateNext} ><RiArrowRightSLine /></span></li>

      </ul>


    </div>
  );
};