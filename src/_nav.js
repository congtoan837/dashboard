import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBarChart,
  cilUser,
  cilInbox,
  cilCursor,
  cilDrop,
  cilNotes,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Thống kê',
    to: '/dashboard',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'Quản lý',
  },
  {
    component: CNavItem,
    name: 'Người dùng',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Sản phẩm',
    to: '/products',
    icon: <CIcon icon={cilInbox} customClassName="nav-icon" />,
  }
]

export default _nav
