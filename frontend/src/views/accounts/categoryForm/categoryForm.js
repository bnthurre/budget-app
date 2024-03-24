import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Category = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7001/create-category', formData);
      console.log('Category created:', response.data);
      // Reset form fields after successful submission
      setFormData({
        name: '',
        description: '',    
      });
      setError('');
      navigate('/accounts/categoryList')
    } catch (error) {
      console.error('Error creating category:', error);
      if (error.response && error.response.status === 409) {
        setError('Error creating category. Please try again later.');
      } else {
        setError('Category already exists');
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
                <h1>Create Category</h1>
                <p className="text-body-secondary">Create category</p>
                {error && <div className="text-danger mb-3">{error}</div>}
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    autoComplete="Name"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    autoComplete="description"
                  />
                </CInputGroup>
                <div className="d-grid">
                  <CButton type="submit" color="success">
                    Create Category
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

export default Category;
