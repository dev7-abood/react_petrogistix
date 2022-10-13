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
        navLink: '/users',
        children: [
            {
                id: 'myAccount',
                title: 'My account',
                icon: <Circle/>,
                navLink: '/admin/my-account'
            },
            {
                id: 'manageAccounts',
                title: 'Manage accounts',
                icon: <Circle/>,
                navLink: '/admin/manage-accounts'
            }
        ]
    },
    {
        id: 'Tables',
        title: 'Tables',
        icon: <Table size={20}/>,
        children: [
            {
                id: 'categories',
                title: 'Categories',
                icon: <Circle/>,
                navLink: '/admin/categories'
            },
            {
                id: 'htmlData',
                title: 'Data',
                icon: <Circle/>,
                navLink: '/admin/data'
            }
        ]
    },
    {
        id: 'settings',
        title: 'Settings',
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
                id: 'siteLogo',
                title: 'Site logo',
                icon: <Circle/>,
                navLink: '/settings/site-logo'
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
