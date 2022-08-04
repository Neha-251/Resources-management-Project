import "./pagination.css"
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';


export const Pagination = ({ itemPerPage, totalPage, paginate, paginatePrev, paginateNext, currPage }) => {
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
          <li key={number} className={ number===currPage? 'currPage_item' : 'page_item'}>
            <span onClick={() => paginate(number)}>
              {number}
            </span>
          </li>
        ))}
        <li className="page_item"><span onClick={paginateNext} ><RiArrowRightSLine /></span></li>

      </ul>


    </div>
  );
};