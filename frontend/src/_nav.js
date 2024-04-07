import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilBank,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilPeople,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  
  },
  {
    component: CNavTitle,
    name: 'Accounts',
  },
  {
    component: CNavItem,
    name: 'Create Account',
    to: '/accounts/accountForm',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />, 
  },
  {
    component: CNavItem,
    name: 'Accounts lists',
    to: '/accounts/AccountLists',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Create Category',
    to: '/accounts/categoryForm',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,

  },
  {
    component: CNavItem,
    name: 'category List',
    to: '/accounts/categoryList',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,

  },
  {
    component: CNavTitle,
    name: 'Budget',
  },
  {
    component: CNavItem,
    name: 'Create Budget Allocation',
    to: '/budget/budgetAllocationForm',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />, 
  },
  {
    component: CNavItem,
    name: 'Budget allocations',
    to: '/budget/budgetAllocationList',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Create Budget Payment',
    to: '/budget/budgetPaymentForm',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,

  },
  {
    component: CNavItem,
    name: 'Budget Payments',
    to: '/budget/budgetPaymentList',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,

  },
  {
    component: CNavTitle,
    name: 'Users',
  },
  {
    component: CNavItem,
    name: 'Create user',
    to: '/users/userForm',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />, 
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users/usersList',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
]

export default _nav
