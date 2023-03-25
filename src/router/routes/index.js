import {lazy} from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
    {
        path: '/home',
        component: lazy(() => import('../../views/Home')),
        meta: {
            authRoute: false,
            title: 'Home'
        }
    },
    {
        path: '/department',
        component: lazy(() => import('../../views/department')),
        meta: {
            authRoute: false,
            title: 'Departments'
        }
    },
    {
        path: '/jobs',
        component: lazy(() => import('../../views/jobs')),
        meta: {
            authRoute: false,
            title: 'Jobs'
        }
    },
    {
        path: '/questions',
        component: lazy(() => import('../../views/q')),
        meta: {
            authRoute: false,
            title: 'questions'
        }
    },
    {
        path: '/collections',
        component: lazy(() => import('../../views/data-extraction/index')),
        meta: {
            authRoute: false,
            title: 'Collections'
        }
    },
    {
        path: '/html-files/:id',
        component: lazy(() => import('../../views/data-extraction/html-files/index')),
        meta: {
            authRoute: false,
            title: 'Html Files'
        }
    },
    {
        path: '/settings/logo',
        component: lazy(() => import('../../views/settings/logo')),
        meta: {
            authRoute: false,
            title: 'logo'
        }
    },
    {
        path: '/settings/site-name',
        component: lazy(() => import('../../views/settings/site-name')),
        meta: {
            authRoute: false,
            title: 'Site Name'
        }
    },
    {
        path: '/settings/favicon',
        component: lazy(() => import('../../views/settings/favicon')),
        meta: {
            authRoute: false,
            title: 'Favicon'
        }
    },
    {
        path: '/my-account',
        component: lazy(() => import('../../views/users/my-account')),
        meta: {
            authRoute: false,
            title: 'My Account'
        }
    },
    {
        path: '/manage-accounts',
        component: lazy(() => import('../../views/users/manage-accounts/list')),
        exact: true,
        meta: {
            authRoute: false,
            title: 'Manage Accounts'
        }
    },
    {
        path: '/user/permissions/:id',
        component: lazy(() => import('../../views/users/permissions/Index')),
        meta: {
            authRoute: false,
            title: 'Permissions'
        }
    },
    {
        path: '/charts/rig',
        component: lazy(() => import('../../views/charts/rig')),
        meta: {
            authRoute: false,
            title: 'Rig Chart'
        }
    },
    {
        path: '/show-q',
        component: lazy(() => import('../../views/showQ')),
        meta: {
            authRoute: false,
            title: 'Show questions'
        }
    },
    {
        path: '/charts/chemicals',
        component: lazy(() => import('../../views/charts/chemical')),
        meta: {
            authRoute: false,
            title: 'Chemicals Chart'
        }
    },
    {
        path: '/login',
        component: lazy(() => import('../../views/Login')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true,
            title: 'Login'
        }
    },
    {
        path: '/error',
        component: lazy(() => import('../../views/Error')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true,
            title: 'Error'
        }
    }
]

export {DefaultRoute, TemplateTitle, Routes}
