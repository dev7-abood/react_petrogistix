import {useEffect, useState} from 'react'

const Can = props => {

    const {have} = props

    const [has, setHas] = useState(false)

    useEffect(_ => {

        const have_permissions = localStorage.getItem('permissions')

        for (const el of have) {
            const check = have_permissions.includes(el)
            if (check) {
                setHas(true)
                break
            }
        }

        if (Boolean(have_permissions.includes('ALL_READ'))) {
            setHas(true)
        }
    }, [])

    return (
        <>
            {has ? props.children : ''}
        </>
    )
}

export default Can