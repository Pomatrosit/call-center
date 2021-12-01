import { FC, Dispatch, SetStateAction } from 'react'
import { Pagination } from 'react-bootstrap'

interface ICustomPaginationProps {
    pageCount: number
    activePage: number
    setActivePage: Dispatch<SetStateAction<number>>
}

const CustomPagination: FC<ICustomPaginationProps> = ({ activePage, setActivePage, pageCount }) => {
    
  let pages = []

  for (let number = 1; number <= pageCount; number++) {
    pages.push(
      <Pagination.Item key={number} active={number === activePage} onClick={() => setActivePage(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <Pagination>{pages}</Pagination>
  )
}

export default CustomPagination