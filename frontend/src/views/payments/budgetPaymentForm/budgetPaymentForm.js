import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' // Import DatePicker styles
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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

const BudgetPayment = () => {
  const location = useLocation()
  const { Payment } = location.state || {}
  const [formData, setFormData] = useState({
    category: '',
    account_id: '',
    paid_amount: '',
    year: '',
    payment_date: '',
    description: '',
  })

  const [error, setError] = useState({})
  const [categories, setCategories] = useState([])
  const [accounts, setAccounts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (Payment) {
      setFormData({
        category: Payment.category || '',
        account_id: Payment.account_id ||'',
        paid_amount: Payment.paid_amount ||'',
        year: Payment.year ||'',
        payment_date: Payment.payment_date ||'',
        description:  Payment.description ||'',
      })
    }
  }, [Payment])
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
    setFormData({ ...formData, payment_date: date })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = {}

    if (!formData.category) {
      validationErrors.category = 'Category is required'
    }
    if (!formData.account_id) {
      validationErrors.account_id = 'Account number is required'
    }
    if (!formData.paid_amount) {
      validationErrors.paid_amount = 'Paid amount is required'
    }
    if (!formData.year) {
      validationErrors.year = 'Year is required'
    }

    setError(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      try {
        if (Payment) {
          // If in edit mode
          await axios.put(`http://localhost:7001/update-budget-payment/${Payment._id}`, formData);
          toast.success('Budget payment updated successfully');

        } else {
          // If in create mode
          const response = await axios.post('http://localhost:7001/create-budget-payment', formData)
          console.log('Budget payment created:', response.data)
          toast.success('Budget payment created successfully');

        }
        setFormData({
          category: '',
          account_id: '',
          paid_amount: '',
          year: '',
          payment_date: '',
          description: '',
        })
        setError({})
        navigate('/budget/BudgetPaymentList')
      } catch (error) {
        console.error('Error creating Budget payment:', error)
        setError('Error creating Budget payment')
      }
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
              <h1>{Payment ? 'Edit Payment' : 'Create Payment'}</h1>
                <p className="text-body-secondary">Fill in the details</p>
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
                {error.paid_amount && <div className="text-danger mb-3">{error.paid_amount}</div>}

                <CInputGroup className="mb-3">
                  <CFormInput
                    name="paid_amount"
                    value={formData.paid_amount}
                    onChange={handleChange}
                    type="Number"
                    placeholder="Paid Amount"
                    autoComplete="paid_amount"
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
                    name="payment_date"
                    selected={formData.payment_date}
                    onChange={handleDateChange}
                    placeholderText="Payment Date"
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
                    {Payment ? 'Save Payment' : 'Create Payment'}
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

export default BudgetPayment
