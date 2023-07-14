import Select from 'react-select'

const SelectPermissions = props => {

    const {index} = props
    const {labelAndValue} = props

    return (
        <Select
            isMulti
            backgroundColor={false}
            id='permissions'
            placeholder={'Permissions...'}
            className="basic-multi-select"
            classNamePrefix="select"
            options={labelAndValue.reverse()}
            onChange={val => {
                const doc = document.getElementById(`permissions[${index}]`)
                val.length !== 0 ? doc.value = JSON.stringify(val) : doc.value = ''
            }}
        />
    )
}

export default SelectPermissions