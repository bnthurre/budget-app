import React, { useState } from 'react';
import axios from 'axios';
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
} from '@coreui/react';

const Account = () => {
  const [formData, setFormData] = useState({
    account_name: '',
    account_number: '',
    account_type: '',
    description: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7001/create-accounts', formData);
      console.log('Account created:', response.data);
      // Reset form fields after successful submission
      setFormData({
        account_name: '',
        account_number: '',
        account_type: '',
        description: '',
      });
      setError('');
    } catch (error) {
      console.error('Error creating account:', error);
      if (error.response && error.response.status === 409) {
        setError('Account number already exists. Please choose a different account number.');
      } else {
        setError('Account number already exists. Please choose a different account number');
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
                <h1>Create Account</h1>
                <p className="text-body-secondary">Create your account</p>
                {error && <div className="text-danger mb-3">{error}</div>}
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="account_name"
                    value={formData.account_name}
                    onChange={handleChange}
                    placeholder="Account Name"
                    autoComplete="Account Name"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="account_number"
                    value={formData.account_number}
                    onChange={handleChange}
                    placeholder="Account Number"
                    autoComplete="Account Number"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="account_type"
                    value={formData.account_type}
                    onChange={handleChange}
                    type="text"
                    placeholder="Account Type"
                    autoComplete="Account Type"
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CFormInput
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    type="text"
                    placeholder="Description"
                    autoComplete="Description"
                  />
                </CInputGroup>
                <div className="d-grid">
                  <CButton type="submit" color="success">
                    Create Account
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Account;

// import React, { useState } from 'react'
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
//   CInputGroupText,
//   CRow,
// } from '@coreui/react'


// const Account = () => {
//   const [formData, setFormData] = useState({
//     account_name: '',
//     account_number: '',
//     account_type: '',
//     description: '',
//   })
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const response = await axios.post('http://localhost:7001/create-accounts', formData)
//       console.log('Account created:', response.data)
//       // Reset form fields after successful submission
//       setFormData({
//         account_name: '',
//         account_number: '',
//         account_type: '',
//         description: '',
//       })
//     } catch (error) {
//       console.error('Error creating account:', error)
//       // Handle errors if needed
//     }
//   }

//   return (
//     <CContainer>
//       <CRow className="justify-content-center">
//         <CCol md={9} lg={7} xl={8}>
//           <CCard className="mx-4">
//             <CCardBody className="p-4">
//               <CForm onSubmit={handleSubmit}>
//                 <h1>Create Account</h1>
//                 <p className="text-body-secondary">Create your account</p>
//                 <CInputGroup className="mb-3">
//                   <CFormInput
//                     name="account_name"
//                     value={formData.account_name}
//                     onChange={handleChange}
//                     placeholder="Account Name"
//                     autoComplete="Account Name"
//                   />
//                 </CInputGroup>
//                 <CInputGroup className="mb-3">
//                   <CFormInput
//                     name="account_number"
//                     value={formData.account_number}
//                     onChange={handleChange}
//                     placeholder="Account Number"
//                     autoComplete="Account Number"
//                   />
//                 </CInputGroup>
//                 <CInputGroup className="mb-3">
//                   <CFormInput
//                     name="account_type"
//                     value={formData.account_type}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Account Type"
//                     autoComplete="Account Type"
//                   />
//                 </CInputGroup>
//                 <CInputGroup className="mb-4">
//                   <CFormInput
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Description"
//                     autoComplete="Description"
//                   />
//                 </CInputGroup>
//                 <div className="d-grid">
//                   <CButton type="submit" onClick={handleSubmit} color="success">
//                     Create Account
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

// export default Account
