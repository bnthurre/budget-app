import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  CFormSelect,
} from '@coreui/react'

const User = () => {
  const location = useLocation()
  const { user } = location.state || {}
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    stateRegion: '',
    address: '',
    city: '',
    role: '',
    company: '',
  })

  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        username: user.username || '',
        email: user.email || '',
        stateRegion: user.stateRegion || '',
        address: user.address || '',
        city: user.city || '',
        role: user.role || '',
        company: user.company || '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form fields
    const validationErrors = {}
    if (!formData.fullName.trim()) {
      validationErrors.fullName = 'Full Name is required'
    }
    if (!formData.username.trim()) {
      validationErrors.username = 'Username is required'
    }
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required'
    }
    if (!formData.company.trim()) {
      validationErrors.company = 'Company is required'
    }
    if (!formData.address.trim()) {
      validationErrors.address = 'Address is required'
    }
    if (!formData.city.trim()) {
      validationErrors.city = 'City is required'
    }
    if (!formData.stateRegion.trim()) {
      validationErrors.stateRegion = 'State is required'
    }
    if (!formData.role.trim()) {
      validationErrors.role = 'Role is required'
    }
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      try {
        if (user) {
          // If in edit mode
          await axios.put(`http://localhost:7001/update-user/${user._id}`, formData)
        } else {
          // If in create mode
          await axios.post('http://localhost:7001/create-user', formData)
        }
        setFormData({
          fullName: '',
          username: '',
          email: '',
          stateRegion: '',
          address: '',
          city: '',
          role: '',
          company: '',
        })
        setErrors('')
        navigate('/users/usersList')
      } catch (error) {
        console.error('Error creating User:', error)
        if (error.response && error.response.status === 409) {
          setErrors('Username or Email already exists')
        } else {
          setErrors('Failed to create user')
        }
      }
    }
  }
  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={8}>
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm onSubmit={handleSubmit}>
                <h1>{user ? 'Edit User' : 'Create User'}</h1>
                <p className="text-body-secondary">Fill in the details</p>
                {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    autoComplete="Full Name"
                  />
                </CInputGroup>
                {errors.email && <div className="text-danger">{errors.email}</div>}
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    autoComplete="email"
                  />
                </CInputGroup>
                {errors.username && <div className="text-danger">{errors.username}</div>}
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    type="text"
                    placeholder="Username"
                    autoComplete="username"
                  />
                </CInputGroup>
                {errors.stateRegion && <div className="text-danger">{errors.stateRegion}</div>}
                <CInputGroup className="mb-4">
                  <CFormInput
                    name="stateRegion"
                    value={formData.stateRegion}
                    onChange={handleChange}
                    type="text"
                    placeholder="State/Region"
                    autoComplete="state region"
                  />
                </CInputGroup>
                {errors.city && <div className="text-danger">{errors.city}</div>}
                <CInputGroup className="mb-4">
                  <CFormInput
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    type="text"
                    placeholder="City"
                    autoComplete="city"
                  />
                </CInputGroup>
                {errors.company && <div className="text-danger">{errors.company}</div>}
                <CInputGroup className="mb-4">
                  <CFormInput
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    type="text"
                    placeholder="Company"
                    autoComplete="Company"
                  />
                </CInputGroup>
                {errors.address && <div className="text-danger">{errors.address}</div>}
                <CInputGroup className="mb-4">
                  <CFormInput
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    type="text"
                    placeholder="Address"
                    autoComplete="Address"
                  />
                </CInputGroup>
                {errors.role && <div className="text-danger">{errors.role}</div>}
                <CInputGroup className="mb-4">
                  <CFormSelect
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    aria-label="Role"
                  >
                    <option value="">Select Role</option>
                    <option value="super admin">Super Admin</option>
                    <option value="admin">Admin</option>
                  </CFormSelect>
                </CInputGroup>
                <div className="d-grid">
                  <CButton type="submit" color="primary">
                    {user ? 'Save User' : 'Create User'}
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

export default User
