import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
const navigate = useNavigate()
  const handleRegister = async () => {
    try {
      if (password !== repeatPassword) {
        setError('Passwords do not match');
        return;
      }
  
      const response = await axios.post('http://localhost:7001/api/auth/register', {
        username,
        email,
        password,
      });
  
      // If the registration is successful, navigate to the login page
      // You can use the `useNavigate` hook from React Router for navigation
      navigate('/login');
  
      console.log('User registered successfully:');
    } catch (error) {
      // Check if the error message indicates that the username or email already exists
      if (error.response && error.response.data.error.includes('already exists')) {
        setError('Username or email already exists');
      } else {
        setError(error.response.data.error);
      }
    }
  };
  
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </CInputGroup>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="d-grid">
                    <CButton color="primary" onClick={handleRegister}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;

// import React from 'react'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilLockLocked, cilUser } from '@coreui/icons'

// const Register = () => {
//   return (
//     <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={9} lg={7} xl={6}>
//             <CCard className="mx-4">
//               <CCardBody className="p-4">
//                 <CForm>
//                   <h1>Register</h1>
//                   <p className="text-body-secondary">Create your account</p>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilUser} />
//                     </CInputGroupText>
//                     <CFormInput placeholder="Username" autoComplete="username" />
//                   </CInputGroup>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>@</CInputGroupText>
//                     <CFormInput placeholder="Email" autoComplete="email" />
//                   </CInputGroup>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type="password"
//                       placeholder="Password"
//                       autoComplete="new-password"
//                     />
//                   </CInputGroup>
//                   <CInputGroup className="mb-4">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type="password"
//                       placeholder="Repeat password"
//                       autoComplete="new-password"
//                     />
//                   </CInputGroup>
//                   <div className="d-grid">
//                     <CButton color="success">Create Account</CButton>
//                   </div>
//                 </CForm>
//               </CCardBody>
//             </CCard>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   )
// }

// export default Register
