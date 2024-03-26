import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
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
    const fetchCategoriesAndAccounts = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get('http://localhost:7001/get-categories')
        setCategories(categoriesResponse.data)

        // Fetch accounts
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
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:7001/create-budget-allocation', formData)
      console.log('BudgetAllocation created:', response.data)
      // Reset form fields after successful submission
      setFormData({
        category: '',
        account_id: '',
        budget_amount: '',
        year: '',
        budget_date: '',
        description: '',
      })
      setError('')
      navigate('/budget/BudgetAllocationList')
    } catch (error) {
      console.error('Error creating BudgetAllocation:', error)
      setError('Error creating BudgetAllocation')
    }
  }
  // Generate an array of years starting from the current year and going back 10 years
  const years = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index)

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={8}>
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm onSubmit={handleSubmit}>
                <h1>Create Budget Allocation</h1>
                <p className="text-body-secondary">Create your Budget Allocation</p>
                {error && <div className="text-danger mb-3">{error}</div>}
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
                  <CButton type="submit" color="success">
                    Create BudgetAllocation
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
