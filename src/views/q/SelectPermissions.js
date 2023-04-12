import Select from 'react-select'

const SelectPermissions = props => {

    const {index} = props
    const {labelAndValue} = props

    return (
        <Select
            isMulti
            id='permissions'
            placeholder={'Select Permissions...'}
            className="basic-multi-select"
            classNamePrefix="select"
            options={labelAndValue}
            onChange={val => {
                const doc = document.getElementById(`permissions[${index}]`)
                val.length !== 0 ? doc.value = JSON.stringify(val) : doc.value = ''
            }}
        />
    )
}

export default SelectPermissions