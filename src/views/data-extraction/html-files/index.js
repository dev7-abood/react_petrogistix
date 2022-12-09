// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import {Row, Col} from 'reactstrap'

import Filter from "./Filter";

// ** Tables
import Datatable from './Datatable'

// ** Styles

import { useParams } from "react-router-dom";

import { useState } from 'react'

const HtmlFiles = _ => {

    const { id } = useParams();
    const [collectionId, setCollectionId] = useState(id)
    const [selectYear, setSelectYear] = useState('')
    const [search, setSearch] = useState('')
    const [collectionName, setCollectionName] = useState('')

    return (
        <>
            <Breadcrumbs breadCrumbTitle='Data' breadCrumbParent='Home' breadCrumbActive='Data'/>
            <div>
                <Filter
                    collectionId={collectionId}
                    setCollectionId={setCollectionId}
                    setSelectYear={setSelectYear}
                    setSearch={setSearch}
                    setCollectionName={setCollectionName}
                />
            </div>
            <div>
                <Datatable
                    collection_id={collectionId}
                    selectYear={selectYear}
                    search={search}
                    collectionName={collectionName}
                />
            </div>
        </>
    )
}

export default HtmlFiles
