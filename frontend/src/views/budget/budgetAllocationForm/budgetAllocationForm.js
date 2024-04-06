import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CRow,
} from '@coreui/react'

const BudgetAllocation = () => {
  const location = useLocation()
  const { allocation } = location.state || {}
  const [formData, setFormData] = useState({
    category: '',
    account_id: '',
    budget_amount: '',
    year: '',
    budget_date: '',
    description: '',
  })

  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])
  const [accounts, setAccounts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (allocation) {
      setFormData({
        category: allocation.category || '',
        account_id: allocation.account_id || '',
        budget_amount: allocation.budget_amount || '',
        year: allocation.year || '',
        budget_date: allocation.budget_date || '',
        description: allocation.description || '',
      })
    }
  }, [allocation])
  useEffect(() => {
    const fetchCategoriesAndAccounts = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:7001/get-categories')
        setCategories(categoriesResponse.data)

        const accountsResponse = await axios.get('http://localhost:7001/get-accounts')
        setAccounts(accountsResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchCategoriesAndAccounts()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleDateChange = (date) => {
    setFormData({ ...formData, budget_date: date })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = {};
  
    if (!formData.category) {
      validationErrors.category = 'Category is required';
    }
    if (!formData.account_id) {
      validationErrors.account_id = 'Account number is required';
    }
    if (!formData.budget_amount) {
      validationErrors.budget_amount = 'Budget amount is required';
    }
    if (!formData.year) {
      validationErrors.year = 'Year is required';
    }
  
    // Set error messages for specific fields
    setError(validationErrors);
  
    // Check if any validation errors exist
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (allocation) {
          // If in edit mode
          await axios.put(`http://localhost:7001/update-budget-allocation/${allocation._id}`, formData);
        } else {
          // If in create mode
          await axios.post('http://localhost:7001/create-budget-allocation', formData);
        }
        setFormData({
          category: '',
          account_id: '',
          budget_amount: '',
          year: '',
          budget_date: '',
          description: '',
        });
        setError('');
        navigate('/budget/budgetAllocationList');
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while saving the allocation.');
      }
    }
  };
  
  const years = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index)

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={8}>
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm onSubmit={handleSubmit}>
                <h1>{allocation ? 'Edit Account' : 'Create Account'}</h1>
                <p className="text-body-secondary">Fill in the details</p>
                {error.general && <div className="text-danger mb-3">{error.general}</div>}
                {error.category && <div className="text-danger mb-3">{error.category}</div>}
                <CInputGroup className="mb-3">
                  <CFormSelect
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    aria-label="category"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CInputGroup>
                {error.account_id && <div className="text-danger mb-3">{error.account_id}</div>}
                <CInputGroup className="mb-3">
                  <CFormSelect
                    name="account_id"
                    value={formData.account_id}
                    onChange={handleChange}
                    aria-label="Account_id"
                  >
                    <option value="">Select Account Number</option>
                    {accounts.map((account) => (
                      <option key={account._id} value={account._id}>
                        {account.account_name} - {account.account_number}
                      </option>
                    ))}
                  </CFormSelect>
                </CInputGroup>
                {error.budget_amount && (
                  <div className="text-danger mb-3">{error.budget_amount}</div>
                )}
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="budget_amount"
                    value={formData.budget_amount}
                    onChange={handleChange}
                    type="Number"
                    placeholder="Budget amount"
                    autoComplete="budget_amount"
                  />
                </CInputGroup>
                {error.year && <div className="text-danger mb-3">{error.year}</div>}
                <CInputGroup className="mb-3">
                  <CFormSelect
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    aria-label="Year"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </CFormSelect>
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <DatePicker
                    name="budget_date"
                    selected={formData.budget_date}
                    onChange={handleDateChange}
                    placeholderText="Budget date"
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CFormInput
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    type="text"
                    placeholder="description"
                    autoComplete="description"
                  />
                </CInputGroup>
                <div className="d-grid">
                  <CButton type="submit" color="primary">
                    {allocation ? 'Save allocation' : 'Create Allocation'}
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default BudgetAllocation
