import React from 'react'

const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Users = React.lazy(() => import('./views/UsersContainer'))
const Products = React.lazy(() => import('./views/ProductsContainer'))

const Page404 = React.lazy(() => import('./views/Page404'))

const routes = [
    {path: '/dashboard', name: 'Thống kê', element: Dashboard, exact: true},
    {path: '/users', name: 'Người dùng', element: Users, exact: true},
    {path: '/products', name: 'Sản phẩm', element: Products, exact: true},
]

export default routes
