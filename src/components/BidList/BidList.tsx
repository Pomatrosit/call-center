import { FC } from "react"
import { Table, Pagination } from 'react-bootstrap'
import classes from "./BidList.module.scss"
import { BID_LIST_TABLE_COLUMNS } from '../../constants/bidListTableColumns'

const BidList: FC = () => {

  const activePage = 1
  let bids = []

  for (let number = 1; number <= 5; number++) {
      bids.push(
      <Pagination.Item key={number} active={number === activePage}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div className={classes.bidList}>
      <Table striped bordered hover>
        <thead>
            <tr>
            {
                BID_LIST_TABLE_COLUMNS.map(item => <th key={ item.id }>{ item.title }</th>)
            }
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            </tr>
            <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            </tr>
            <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@twitter</td>
            <td>123</td>
            </tr>
        </tbody>
      </Table>

      <div className={ classes.pagination }>
          <Pagination>{bids}</Pagination>
      </div>
    </div>
  )
}

export default BidList