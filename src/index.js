// ** React Imports
import {Suspense, lazy} from 'react'
import ReactDOM from 'react-dom'

// ** Redux Imports
import {Provider} from 'react-redux'
import {store} from './redux/storeConfig/store'

// ** Toast & ThemeColors Context
import {ToastContainer} from 'react-toastify'
import {ThemeContext} from './utility/context/ThemeColors'

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner'

// ** Ripple Button
import './@core/components/ripple-button'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Toastify
import '@styles/react/libs/toastify/toastify.scss'

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/core.scss'
import './assets/scss/style.scss'

// ** Service Worker
import * as serviceWorker from './serviceWorker'

import axios from "axios"

// ** Lazy load app
const LazyApp = lazy(() => import('./App'))

import env from '@src/env.json'

axios.defaults.baseURL = env.API_BASE_URL

// Add a request interceptor

if (window.location.pathname !== '/login') {
    axios.interceptors.request.use(config => {

        if (localStorage.getItem('access_tk')) {
            config.headers['Accept'] = 'application/json'

            config.headers.Authorization = `Bearer ${localStorage.getItem('access_tk')}`
            // console.log('Intercepting the request before sending it', config)
            return config // nxt jwt.php
        }

    }, error => {
        // console.log("Request error: ", error)
        return Promise.reject(error)
    })
}

// Add a response interceptor
// axios.interceptors.response.use(response => {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     console.log(response)
//     return response;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
// });

ReactDOM.render(<Provider store={store}>
    <Suspense fallback={<Spinner/>}>
        <ThemeContext>
            <LazyApp/>
            <ToastContainer newestOnTop/>
        </ThemeContext>
    </Suspense>
</Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
