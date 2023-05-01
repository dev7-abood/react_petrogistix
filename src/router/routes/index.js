import {lazy} from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/collections'

// ** Merge Routes
const Routes = [
    // {
    //     path: '/home',
    //     component: lazy(() => import('../../views/Home')),
    //     meta: {
    //         authRoute: false,
    //         title: 'Home'
    //     }
    // },
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
        path: '/group/permissions/:id',
        component: lazy(() => import('../../views/qGroups/Permissions')),
        meta: {
            authRoute: false,
            title: 'Group Permissions'
        }
    },
    {
        path: '/create/questions',
        component: lazy(() => import('../../views/q/Create')),
        meta: {
            authRoute: false,
            title: 'Create Questions'
        }
    },
    {
        path: '/questions',
        component: lazy(() => import('../../views/showQ/')),
        meta: {
            authRoute: false,
            title: 'Questions'
        }
    },
    {
        path: '/answers-section',
        component: lazy(() => import('../../views/evaluation/UserDatatable')),
        meta: {
            authRoute: false,
            title: 'Answer Section'
        }
    },
    {
        path: '/show-questions',
        component: lazy(() => import('../../views/evaluation/')),
        meta: {
            authRoute: false,
            title: 'Show Questions'
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
        path: '/user/show/answers/:id',
        component: lazy(() => import('../../views/showQ/UserAnswers')),
        meta: {
            authRoute: false,
            title: 'User Answers'
        }
    },
    {
        path: '/periods',
        component: lazy(() => import('../../views/Periods/')),
        meta: {
            authRoute: false,
            title: 'Periods'
        }
    },
    {
        path: '/evaluation',
        component: lazy(() => import('../../views/evaluation/')),
        exact: true,
        meta: {
            authRoute: false,
            title: 'Evaluation'
        }
    },
    {
        path: '/evaluation/:user_id',
        component: lazy(() => import('../../views/evaluation/QGroupDatatable')),
        meta: {
            authRoute: false,
            title: 'Evaluate the set of questions'
        }
    },
    {
        path: '/set/evaluation/:id/:user_id/:group_name',
        component: lazy(() => import('../../views/setEvaluation')),
        meta: {
            authRoute: false,
            title: 'Evaluate the set of questions'
        }
    },
    {
        path: '/group/questions',
        component: lazy(() => import('../../views/qGroups')),
        meta: {
            authRoute: false,
            title: 'Question management'
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
