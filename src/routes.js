import React from 'react'
import page500 from "./views/Page500";

const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Users = React.lazy(() => import('./views/UsersContainer'))

const Page404 = React.lazy(() => import('./views/Page404'))
const Page500 = React.lazy(() => import('./views/Page500'))

const Login = React.lazy(() => import('./views/Login'))

const routes = [
  { path: '/*', name: '404', element: Page404},
  { path: '/error', name: '500', element: page500},

  { path: '/login', name: 'login', element: Login},
  { path: '/dashboard', name: 'Thống kê', element: Dashboard, exact: true},
  { path: '/users', name: 'Người dùng', element: Users },
]

export default routes
