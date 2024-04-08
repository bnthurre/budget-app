import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const AccountForm = React.lazy(() => import('./views/accounts/accountform/accountform'))
const AccountLists = React.lazy(() => import('./views/accounts/AccountLists/AccountLists'))
const CategoryForm = React.lazy(() => import('./views/categories/categoryForm/categoryForm'))
const CategoryList = React.lazy(() => import('./views/categories/categoryList/categoryList'))


//budget
const budgetAllocationForm = React.lazy(() => import('./views/budget/budgetAllocationForm/budgetAllocationForm'))
const budgetAllocationList = React.lazy(() => import('./views/budget/budgetAllocationList/budgetAllocationList'))
const budgetPaymentForm = React.lazy(() => import('./views/budget/budgetPaymentForm/budgetPaymentForm'))
const budgetPaymentList = React.lazy(() => import('./views/budget/budgetPaymentList/budgetPaymentList'))


//users
const UserForm = React.lazy(() => import('./views/users/userForm/userForm'))
const UsersList = React.lazy(() => import('./views/users/usersList/usersList'))




const routes = [
  { path: '/dashboard', exact: true, name: 'Home' , element: Dashboard  },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/accounts', name: 'Accounts', element: AccountLists, exact: true },
  { path: '/accounts/accountForm', name: 'Create Account', element: AccountForm},
  { path: '/accounts/AccountLists', name: 'AccountLists', element: AccountLists},
  { path: '/categories', name: 'Categories', element: CategoryList, exact: true },
  { path: '/categories/categoryForm', name: 'Create Category', element: CategoryForm },
  { path: '/categories/categoryList', name: 'Category Lists', element: CategoryList},
  { path: '/budget', name: 'Budget', element: budgetAllocationList, exact: true },
  { path: '/budget/budgetAllocationForm', name: ' Create BudgetAllocation', element: budgetAllocationForm},
  { path: '/budget/budgetAllocationList', name: 'BudgtAllocation List', element: budgetAllocationList},
  { path: '/budget/budgetPaymentForm', name: 'Create budgetPayment', element: budgetPaymentForm },
  { path: '/budget/budgetPaymentList', name: 'BudgetPayment List', element: budgetPaymentList},
  { path: '/users', name: 'Users', element: budgetAllocationList, exact: true },
  { path: '/users/userForm', name: ' Create User', element: UserForm},
  { path: '/users/usersList', name: 'users List', element: UsersList},
  { path: '/budget/budgetPaymentForm', name: 'Create budgetPayment', element: budgetPaymentForm },
  { path: '/budget/budgetPaymentList', name: 'BudgetPayment List', element: budgetPaymentList},
  
]

export default routes

