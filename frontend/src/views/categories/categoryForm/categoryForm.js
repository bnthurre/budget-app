import React, { useEffect, useState } from 'react';
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

const Category = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = location.state || {};
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
      });
    }
  }, [category]);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if category name is empty
    if (formData.name.trim() === '') {
      setError('Category name is required');
      return;
    }
  
    try {
      if (category) {
        // If in edit mode
        await axios.put(`http://localhost:7001/update-category/${category._id}`, formData);
      } else {
        // If in create mode
        await axios.post('http://localhost:7001/create-category', formData);
      }
      // Reset form fields after successful submission
      setFormData({
        name: '',
        description: '',
      });
      setError('');
      navigate('/categories/categoryList');
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
              <h1>{category ? 'Edit Account' : 'Create Account'}</h1>
                <p className="text-body-secondary">Fill in the details</p>
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
                <CButton type="submit" color="primary">
                    {category ? 'Save Category' : 'Create Category'}
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

