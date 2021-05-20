import AdminLogin from '../pages/admin/auth/Login'
import NotAuthorized from '../pages/NotAuthorized.jsx'
import Dashboard from '../pages/admin/Dashboard.jsx'

import AppModule from '../pages/admin/appModule/AppModule.jsx'

export const webRoutes =  [
    { 
        path:'/',
        component: AdminLogin
    }
];

export const privateRoutes = [
    {
        path: '/dashboard',
        component: Dashboard
    }
];

export const adminRoutes = [
    {
        path: '/app-module/:module_id?',
        component: AppModule
    }
]