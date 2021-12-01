import { FC, useState } from "react"
import { Table } from 'react-bootstrap' 
import CustomPagination from '../CustomPagination/CustomPagitation'
import classes from "./BidList.module.scss"
import { BID_LIST_TABLE_COLUMNS } from '../../constants/bidListTableColumns'

const BidList: FC = () => {

  const [activePage, setActivePage] = useState<number>(1)

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
          <CustomPagination pageCount = { 12 } activePage = { activePage } setActivePage={ setActivePage }/>
      </div>
    </div>
  )
}

export default BidList