// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import Datatable from './Datatable'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Categories = () => {
  return (
    <>
      <Breadcrumbs breadCrumbTitle='Categories' breadCrumbParent='Home' breadCrumbActive='Categories' />
      <div>
          <Datatable />
      </div>
    </>
  )
}

export default Categories
