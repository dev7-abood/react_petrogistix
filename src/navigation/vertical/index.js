import {Home, Users, Circle, Settings, Table} from 'react-feather'

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
    }
]
