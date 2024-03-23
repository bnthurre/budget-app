import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHeaderCell,
  CTableHead,
  CTableRow,
} from '@coreui/react';

const Tables = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const response = await axios.get('http://localhost:7001/get-categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchcategories();
  }, []);

  return (
    <CRow>
      <CCol xs={12}>
      <div className="d-flex justify-content-end mb-3">
          {/* Link to the account form */}
          <Link to="/accounts/accounts/accountform/accountform.js">
            <CButton color="success" size="sm">
              Create Category
            </CButton>
          </Link>
        </div>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Category</strong> <small>Lists</small>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {categories.map((category) => (
                  <CTableRow key={category._id}>
                    <CTableHeaderCell scope="row">{category.name}</CTableHeaderCell>
                    <CTableHeaderCell>{category.description}</CTableHeaderCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Tables;





