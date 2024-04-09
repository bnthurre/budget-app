import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();
  const { account } = location.state || {};
  const [formData, setFormData] = useState({
    account_name: '',
    account_number: '',
    account_type: '',
    description: '',
  });

  useEffect(() => {
    if (account) {
      setFormData({
        account_name: account.account_name || '',
        account_number: account.account_number || '',
        account_type: account.account_type || '',
        description: account.description || '',
      });
    }
  }, [account]);

  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationErrors = {};
  //   if (!formData.account_name.trim()) {
  //     validationErrors.account_name = 'Account Name is required';
  //   }
  //   if (!String(formData.account_number).trim()) {
  //     validationErrors.account_number = 'Account Number is required';
  //   }
    
  //   if (!formData.account_type.trim()) {
  //     validationErrors.account_type = 'Account Type is required';
  //   }
  //   setErrors(validationErrors);

  //   if (Object.keys(validationErrors).length === 0) {
  //     try {
  //       if (account) {
  //         // If in edit mode
  //         await axios.put(`http://localhost:7001/update-ccounts/${account._id}`, formData);
  //       } else {
  //         // If in create mode
  //         await axios.post('http://localhost:7001/create-accounts', formData);
  //       }
  //       setFormData({
  //         account_name: '',
  //         account_number: '',
  //         account_type: '',
  //         description: '',
  //       });
  //       setError('');
  //       navigate('/accounts/AccountLists');
  //     } catch (error) {
  //       console.error('Error:', error);
  //       setError('An error occurred while saving the account.');
  //     }
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.account_name.trim()) {
      validationErrors.account_name = 'Account Name is required';
    }
    if (!String(formData.account_number).trim()) {
      validationErrors.account_number = 'Account Number is required';
    }
    
    if (!formData.account_type.trim()) {
      validationErrors.account_type = 'Account Type is required';
    }
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (account) {
          // If in edit mode
          await axios.put(`http://localhost:7001/update-ccounts/${account._id}`, formData);
        } else {
          // If in create mode
          await axios.post('http://localhost:7001/create-accounts', formData);
        }
        setFormData({
          account_name: '',
          account_number: '',
          account_type: '',
          description: '',
        });
        setError('');
        navigate('/accounts/AccountLists');
      } catch (error) {
        console.error('Error creating category:', error);
        if (error.response && error.response.status === 409) {
          setError('Error creating account number. Please try again later.');
        } else {
          setError('Account Number already exists');
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
                <h1>{account ? 'Edit Account' : 'Create Account'}</h1>
                <p className="text-body-secondary">Fill in the details</p>
                {errors.account_name && <div className="text-danger mb-3">{errors.account_name}</div>}
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="account_name"
                    value={formData.account_name}
                    onChange={handleChange}
                    placeholder="Account Name"
                    autoComplete="Account Name"
                  />
                </CInputGroup>
                {errors.account_number && <div className="text-danger mb-3">{errors.account_number}</div>}
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="account_number"
                    value={formData.account_number}
                    onChange={handleChange}
                    placeholder="Account Number"
                    autoComplete="Account Number"
                  />
                </CInputGroup>
                {errors.account_type && <div className="text-danger mb-3">{errors.account_type}</div>}
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
                  <CButton type="submit" color="primary">
                    {account ? 'Save Account' : 'Create Account'}
                  </CButton>
                </div>
                {error && <div className="text-danger mt-3">{error}</div>}
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Account;

