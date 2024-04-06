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
  CFormSelect,
} from '@coreui/react'

const User = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields
    const validationErrors = {};
    if (!formData.fullName.trim()) {
      validationErrors.fullName = 'Full Name is required';
    }
    if (!formData.username.trim()) {
      validationErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    }
    if (!formData.company.trim()) {
      validationErrors.company = 'Company is required';
    }
    if (!formData.address.trim()) {
      validationErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      validationErrors.city = 'City is required';
    }
    if (!formData.stateRegion.trim()) {
      validationErrors.stateRegion = 'State is required';
    }
    if (!formData.role.trim()) {
      validationErrors.role = 'Role is required';
    }
    setErrors(validationErrors);
  
    // Check if there are any validation errors
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:7001/create-user', formData);
        console.log('User created:', response.data);
        setFormData({
          fullName: '',
          username: '',
          email: '',
          stateRegion: '',
          address: '',
          city: '',
          role: '',
          company: '',
        });
        setErrors('');
        navigate('/users/usersList');
      } catch (error) {
        console.error('Error creating User:', error);
        if (error.response && error.response.status === 409) {
          setErrors('Username or Email already exists');
        } else {
          setErrors('Failed to create user');
        }
      }
    }
  };
  
  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={8}>
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm onSubmit={handleSubmit}>
                <h1>Create User</h1>
                <p className="text-body-secondary">Create your User</p>
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
                    Create User
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

// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CRow,
//   CFormSelect,
// } from '@coreui/react'
// const User = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     username: '',
//     email: '',
//     stateRegion: '',
//     address:'',
//     city: '',
//     role: '',
//     company: '',
//   })

//   const [error, setError] = useState('')
//   const [errors, setErrors] = useState({})
//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     // Validate form fields

//       try {
//         const response = await axios.post('http://localhost:7001/create-user', formData)
//         console.log('User created:', response.data)
//         setFormData({
//           fullName:'',
//           username: '',
//           email: '',
//           stateRegion: '',
//           address:'',
//           city: '',
//           role: '',
//           company: '',
//         })
//         setError('')
//         navigate('/users/usersList')
//       } catch (error) {
//         console.error('Error creating User:', error)
//       }

//   }
//   return (
//     <CContainer>
//       <CRow className="justify-content-center">
//         <CCol md={9} lg={7} xl={8}>
//           <CCard className="mx-4">
//             <CCardBody className="p-4">
//               <CForm onSubmit={handleSubmit}>
//                 <h1>Create User</h1>
//                 <p className="text-body-secondary">Create your User</p>
//                 {errors.account_number && (
//                   <div className="text-danger mb-3">{errors.account_number}</div>
//                 )}
//                 <CInputGroup className="mb-3">
//                   <CFormInput
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     placeholder="Full Name"
//                     autoComplete="Full Name"
//                   />
//                 </CInputGroup>
//                 {errors.account_name && (
//                   <div className="text-danger mb-3">{errors.account_name}</div>
//                 )}
//                 <CInputGroup className="mb-3">
//                   <CFormInput
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Email"
//                     autoComplete="email"
//                   />
//                 </CInputGroup>
//                 {errors.account_type && (
//                   <div className="text-danger mb-3">{errors.account_type}</div>
//                 )}
//                 <CInputGroup className="mb-3">
//                   <CFormInput
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Username"
//                     autoComplete="username"
//                   />
//                 </CInputGroup>
//                 <CInputGroup className="mb-4">
//                   <CFormInput
//                     name="stateRegion"
//                     value={formData.stateRegion}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="State/Region"
//                     autoComplete="state region"
//                   />
//                 </CInputGroup>
//                 <CInputGroup className="mb-4">
//                   <CFormInput
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="City"
//                     autoComplete="city"
//                   />
//                 </CInputGroup>
//                 <CInputGroup className="mb-4">
//                   <CFormInput
//                     name="company"
//                     value={formData.company}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Company"
//                     autoComplete="Company"
//                   />
//                 </CInputGroup>
//                 <CInputGroup className="mb-4">
//                   <CFormInput
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Address"
//                     autoComplete="Address"
//                   />
//                 </CInputGroup>
//                 <CInputGroup className="mb-4">
//                   <CFormSelect
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     aria-label="Role"
//                   >
//                     <option value="">Select Role</option>
//                     <option value="super admin">Super Admin</option>
//                     <option value="admin">Admin</option>
//                   </CFormSelect>
//                 </CInputGroup>
//                 <div className="d-grid">
//                   <CButton type="submit" color="primary">
//                     Create User
//                   </CButton>
//                 </div>
//               </CForm>
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow>
//     </CContainer>
//   )
// }

// export default User
