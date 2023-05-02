// ** Router Import
import Router from './router/Router'
import axios from 'axios'
import {useEffect} from 'react'

const App = props => {

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/c_permission/get_user_selected_permissions/')
                localStorage.setItem('permissions', res.data.data.types)
            } catch (err) {

            }
        })()
    }, [])

    return <Router/>
}

export default App
