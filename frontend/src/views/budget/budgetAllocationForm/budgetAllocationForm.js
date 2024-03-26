import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect, // Import CFormSelect for select input
  CInputGroup,
  CRow,
} from '@coreui/react'

const BudgetAllocation = () => {
  const [formData, setFormData] = useState({
    category_id: '',
    account_id: '',
    budget_amount: '',
    year: '',
    budget_date: '',
    description: '',
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:7001/create-budget-allocation', formData)
      console.log('BudgetAllocation created:', response.data)
      // Reset form fields after successful submission
      setFormData({
        category_id: '',
        account_id: '',
        budget_amount: '',
        year: '',
        budget_date: '',
        description: '',
      })
      setError('')
      if (!error) {
        navigate('/budget/BudgetAllocationList')
      }
    } catch (error) {
      console.error('Error creating BudgetAllocation:', error)
    }
  }

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={8}>
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm onSubmit={handleSubmit}>
                <h1>Create BudgetAllocation</h1>
                <p className="text-body-secondary">Create your BudgetAllocation</p>
                {error && <div className="text-danger mb-3">{error}</div>}
                <CInputGroup className="mb-3">
                  <CFormSelect
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    aria-label="Category_id"
                  >
                    <option value="">Select Category</option>
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                    <option value="3">Category 3</option>
                  </CFormSelect>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormSelect
                    name="account_id"
                    value={formData.account_id}
                    onChange={handleChange}
                    aria-label="Account_id"
                  >
                    <option value="">Select Account</option>
                    <option value="1">Account 1</option>
                    <option value="2">Account 2</option>
                    <option value="3">Account 3</option>
                  </CFormSelect>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="budget_amount"
                    value={formData.budget_amount}
                    onChange={handleChange}
                    type="text"
                    placeholder="Budget amount"
                    autoComplete="budget_amount"
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CFormInput
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    type="text"
                    placeholder="Year"
                    autoComplete="year"
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CFormInput
                    name="budget_date"
                    value={formData.budget_date}
                    onChange={handleChange}
                    type="text"
                    placeholder="Budget date"
                    autoComplete="budget_date"
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
