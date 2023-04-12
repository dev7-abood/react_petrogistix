import React, {useEffect, useState} from "react"
import Select from 'react-select'

const DefaultSelectPermissions = props => {

    const {index} = props
    const {labelAndValue} = props
    const {permissionsDefaultSelected} = props
    const [defaultValue, setDefaultValue] = useState([])

    useEffect(_ => {

        const data = []
        permissionsDefaultSelected.map(el => {
            data.push(labelAndValue[el])
        })
        setDefaultValue(data)

    }, [permissionsDefaultSelected])

    return (<div>
            {defaultValue.length !== 0 ? <Select
                isMulti
                id='permissions'
                placeholder={'Select Permissions...'}
                className="basic-multi-select"
                classNamePrefix="select"
                options={labelAndValue}
                defaultValue={defaultValue}
                onChange={val => {
                    const doc = document.getElementById(`permissions[${index}]`)
                    val.length !== 0 ? doc.value = JSON.stringify(val) : doc.value = ''
                }}
            /> : ''}

        </div>

    )
}

export default DefaultSelectPermissions