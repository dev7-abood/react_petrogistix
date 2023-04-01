import {Home, Users, Circle, Settings, Table, PieChart} from 'react-feather'
import { BsBuildings, BsBagDash, BsQuestionSquare } from 'react-icons/bs';

export default [
    {
        id: 'home',
        title: 'Dashboard',
        icon: <Home size={20}/>,
        navLink: '/home'
    },
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
                navLink: '/manage-accounts'
            }
        ]
    },
    {
        id: 'collection',
        title: 'Collections',
        icon: <Table size={20}/>,
        navLink: '/collections',
    },
    {
        id: 'charts',
        title: 'Charts ',
        icon: <PieChart size={20}/>,
        navLink: '/charts',
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
    },
    {
        id: 'jobs',
        title: 'Jobs',
        icon: <BsBagDash size={20}/>,
        navLink: '/jobs',
    },
    {
        id: 'questionGroups',
        title: 'Question',
        icon: <BsQuestionSquare size={20}/>,
        navLink: '/q-groups',
    },
]
