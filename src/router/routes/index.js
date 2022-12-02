import {lazy} from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
    {
        path: '/home',
        component: lazy(() => import('../../views/Home'))
    },
    {
        path: '/collections',
        component: lazy(() => import('../../views/data-extraction/index'))
    },
    {
        path: '/html-files/:id',
        component: lazy(() => import('../../views/data-extraction/html-files/index'))
    },
    {
        path: '/settings/logo',
        component: lazy(() => import('../../views/settings/logo'))
    },
    {
        path: '/settings/site-name',
        component: lazy(() => import('../../views/settings/site-name'))
    },
    {
        path: '/settings/favicon',
        component: lazy(() => import('../../views/settings/favicon'))
    },
    {
        path: '/my-account',
        component: lazy(() => import('../../views/users/my-account'))
    },
    {
        path: '/manage-accounts',
        component: lazy(() => import('../../views/users/manage-accounts/list')),
        exact: true
    },
    {
        path: '/manage-accounts/edit/:id',
        component: lazy(() => import('../../views/users/manage-accounts/edit')),
    },
    {
        path: '/login',
        component: lazy(() => import('../../views/Login')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/error',
        component: lazy(() => import('../../views/Error')),
        layout: 'BlankLayout'
    }
]

export {DefaultRoute, TemplateTitle, Routes}
