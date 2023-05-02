import {lazy} from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/collections'
import {can} from '@utils'

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
            title: 'Departments',
            can: can(['DEPARTMENTS_READ', 'DEPARTMENTS_ADD', 'DEPARTMENTS_EDIT', 'DEPARTMENTS_DELETE']),
        }
    },
    {
        path: '/jobs',
        component: lazy(() => import('../../views/jobs')),
        meta: {
            authRoute: false,
            title: 'Jobs',
            can: can(['JOB_READ', 'JOB_ADD', 'JOB_EDIT', 'JOB_DELETE'])
        }
    },
    {
        path: '/group/permissions/:id',
        component: lazy(() => import('../../views/qGroups/Permissions')),
        meta: {
            authRoute: false,
            title: 'Group Permissions',
            can: can(['QUESTIONMANAGEMENT_READ', 'QUESTIONMANAGEMENT_EDIT'])
        }
    },
    {
        path: '/create/questions',
        component: lazy(() => import('../../views/q/Create')),
        meta: {
            authRoute: false,
            title: 'Create Questions',
            can: can(['QUESTIONMANAGEMENT_ADD', 'QUESTIONMANAGEMENT_EDIT'])
        }
    },
    {
        path: '/questions',
        component: lazy(() => import('../../views/showQ/')),
        meta: {
            authRoute: false,
            title: 'Questions',
            can: can(['QUESTIONS_READ'])
        }
    },
    {
        path: '/answers-section',
        component: lazy(() => import('../../views/evaluation/UserDatatable')),
        meta: {
            authRoute: false,
            title: 'Answer Section',
            can: can(['ANSWERSECTION_READ'])
        }
    },
    {
        path: '/collections',
        component: lazy(() => import('../../views/data-extraction/index')),
        meta: {
            authRoute: false,
            title: 'Collections',
            can: can(['COLLECTION_READ'])
        }
    },
    {
        path: '/html-files/:id',
        component: lazy(() => import('../../views/data-extraction/html-files/index')),
        meta: {
            authRoute: false,
            title: 'Html Files',
            can: can(['COLLECTION_READ'])
        }
    },
    {
        path: '/settings/logo',
        component: lazy(() => import('../../views/settings/logo')),
        meta: {
            authRoute: false,
            title: 'logo',
            can: can(['SETTINGS_READ', 'SETTINGS_ADD', 'SETTINGS_EDIT'])
        }
    },
    {
        path: '/settings/site-name',
        component: lazy(() => import('../../views/settings/site-name')),
        meta: {
            authRoute: false,
            title: 'Site Name',
            can: can(['SETTINGS_READ', 'SETTINGS_ADD', 'SETTINGS_EDIT'])

        }
    },
    {
        path: '/settings/favicon',
        component: lazy(() => import('../../views/settings/favicon')),
        meta: {
            authRoute: false,
            title: 'Favicon',
            can: can(['SETTINGS_READ', 'SETTINGS_ADD', 'SETTINGS_EDIT'])
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
            title: 'Manage Accounts',
            can: can(['USER_READ'])
        }
    },
    {
        path: '/user/permissions/:id',
        component: lazy(() => import('../../views/users/permissions/Index')),
        meta: {
            authRoute: false,
            title: 'Permissions',
            can: can(['USER_EDIT'])
        }
    },
    {
        path: '/charts/rig',
        component: lazy(() => import('../../views/charts/rig')),
        meta: {
            authRoute: false,
            title: 'Rig Chart',
            can: can(['CHARTS_READ'])
        }
    },
    {
        path: '/charts/chemicals',
        component: lazy(() => import('../../views/charts/chemical')),
        meta: {
            authRoute: false,
            title: 'Chemicals Chart',
            can: can(['CHARTS_READ'])
        }
    },
    {
        path: '/user/show/answers/:id',
        component: lazy(() => import('../../views/showQ/UserAnswers')),
        meta: {
            authRoute: false,
            title: 'User Answers',
            can: can(['ANSWERSECTION_READ'])
        }
    },
    {
        path: '/periods',
        component: lazy(() => import('../../views/Periods/')),
        meta: {
            authRoute: false,
            title: 'Periods',
            can: can(['PERIODS_READ'])
        }
    },
    {
        path: '/evaluation',
        component: lazy(() => import('../../views/evaluation/')),
        exact: true,
        meta: {
            authRoute: false,
            title: 'Evaluation',
            can: can(['EVALUATION_READ'])
        }
    },
    {
        path: '/evaluation/:user_id',
        component: lazy(() => import('../../views/evaluation/QGroupDatatable')),
        meta: {
            authRoute: false,
            title: 'Evaluate the set of questions',
            can: can(['EVALUATION_READ'])
        }
    },
    {
        path: '/set/evaluation/:id/:user_id/:group_name',
        component: lazy(() => import('../../views/setEvaluation')),
        meta: {
            authRoute: false,
            title: 'Evaluate the set of questions',
            can: can(['EVALUATION_READ', 'EVALUATION_ADD'])
        }
    },
    {
        path: '/group/questions',
        component: lazy(() => import('../../views/qGroups')),
        meta: {
            authRoute: false,
            title: 'Question management',
            can: can(['QUESTIONMANAGEMENT_READ', 'QUESTIONMANAGEMENT_ADD'])
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
