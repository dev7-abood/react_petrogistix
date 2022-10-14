// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import HtmlDatatable from './HtmlDatatable'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Datatable = () => {
  return (
    <>
      <Breadcrumbs breadCrumbTitle='Datatable' breadCrumbParent='Home' breadCrumbActive='Datatable' />
      <div>
          <HtmlDatatable />
      </div>
    </>
  )
}

export default Datatable
