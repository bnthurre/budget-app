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
  CInputGroup,
  CRow,
} from '@coreui/react'
// const budgetAllocationSchema = new mongoose.Schema({
//   category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
//   account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
//   budget_amount: { type: Number, required: true },
//   year: { type: Number, required: true },
//   budget_date: { type: Date, default: Date.now }, // Consider user input or automatic setting in frontend
//   description: { type: String },
// });

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
                  <CFormInput
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    placeholder="Category_id"
                    autoComplete="category_id"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name=" account_id"
                    value={formData.account_id}
                    onChange={handleChange}
                    placeholder=" Account_id"
                    autoComplete=" account_id"
                  />
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
