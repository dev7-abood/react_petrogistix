import {Home, Users, Circle, Settings, Table, PieChart} from 'react-feather'
import { BsBuildings, BsBagDash, BsQuestionSquare } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { CiViewTimeline } from 'react-icons/ci';
import { TbListCheck } from 'react-icons/tb';
import {can} from '@utils'
export default [
    // {
    //     id: 'home',
    //     title: 'Dashboard',
    //     icon: <Home size={20}/>,
    //     navLink: '/home',
    //     isHidden: false
    // },
    {
        id: 'users',
        title: 'Users',
        icon: <Users size={20}/>,
        children: [
            {
                id: 'myAccount',
                title: 'My account',
                icon: <Circle/>,
                navLink: '/my-account'
            },
            {
                id: 'manageAccounts',
                title: 'Manage accounts',
                icon: <Circle/>,
                navLink: '/manage-accounts',
                isHidden: !can(['USER_READ', 'USER_ADD', 'USER_EDIT', 'USER_DELETE']),
            }
        ]
    },
    {
        id: 'collection',
        title: 'Collections',
        icon: <Table size={20}/>,
        navLink: '/collections',
        isHidden: !can(['COLLECTION_READ', 'COLLECTION_ADD', 'COLLECTION_EDIT', 'COLLECTION_DELETE']),

    },
    {
        id: 'charts',
        title: 'Charts ',
        icon: <PieChart size={20}/>,
        navLink: '/charts',
        isHidden: !can(['CHARTS_READ', 'CHARTS_ADD', 'CHARTS_EDIT', 'CHARTS_DELETE']),
        children: [
            {
                id: 'rig',
                title: 'Rig',
                icon: <Circle/>,
                navLink: '/charts/rig'
            },
            {
                id: 'chemicals',
                title: 'Chemicals',
                icon: <Circle/>,
                navLink: '/charts/chemicals'
            }
        ]
    },
    {
        id: 'settings',
        title: 'settings',
        icon: <Settings size={20}/>,
        navLink: '/settings',
        isHidden: !can(['SETTINGS_READ', 'SETTINGS_ADD', 'SETTINGS_EDIT', 'SETTINGS_DELETE']),
        children: [
            {
                id: 'siteName',
                title: 'Site name',
                icon: <Circle/>,
                navLink: '/settings/site-name'
            },
            {
                id: 'logo',
                title: 'Logo',
                icon: <Circle/>,
                navLink: '/settings/logo'
            },
            {
                id: 'favicon',
                title: 'Favicon',
                icon: <Circle/>,
                navLink: '/settings/favicon'
            }
        ]
    },
    {
        id: 'departments',
        title: 'Departments',
        icon: <BsBuildings size={20}/>,
        navLink: '/department',
        isHidden: !can(['DEPARTMENTS_READ', 'DEPARTMENTS_ADD', 'DEPARTMENTS_EDIT', 'DEPARTMENTS_DELETE']),
    },
    {
        id: 'jobs',
        title: 'Jobs',
        icon: <BsBagDash size={20}/>,
        navLink: '/jobs',
        isHidden: !can(['JOB_READ', 'JOB_ADD', 'JOB_EDIT', 'JOB_DELETE']),
    },
    {
        id: 'QuestionManagement',
        title: 'Question management',
        icon: <BsQuestionSquare size={20}/>,
        navLink: '/group/questions',
        isHidden: !can(['QUESTIONMANAGEMENT_READ', 'QUESTIONMANAGEMENT_ADD', 'QUESTIONMANAGEMENT_EDIT', 'QUESTIONMANAGEMENT_DELETE']),
    },
    {
        id: 'Questions',
        title: 'Questions',
        icon: <CiViewTimeline size={20}/>,
        navLink: '/questions',
        isHidden: !can(['QUESTIONS_READ', 'QUESTIONS_ADD', 'QUESTIONS_EDIT', 'QUESTIONS_DELETE']),
    },
    {
        id: 'Evaluation',
        title: 'Evaluation',
        icon: <TbListCheck size={20}/>,
        navLink: '/evaluation',
        isHidden: !can(['EVALUATION_READ', 'EVALUATION_ADD', 'EVALUATION_EDIT', 'EVALUATION_DELETE']),
    },
    {
        id: 'Periods',
        title: 'Periods',
        icon: <BiTimeFive size={20}/>,
        navLink: '/periods',
        isHidden: !can(['PERIODS_READ', 'PERIODS_ADD', 'PERIODS_EDIT', 'PERIODS_DELETE']),
    },
]
