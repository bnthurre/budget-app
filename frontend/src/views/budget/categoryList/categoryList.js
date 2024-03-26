import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDelete } from '@coreui/icons'

const Tables = () => {
  const [categories, setcategories] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectAllChecked, setSelectAllChecked] = useState(false)

  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const response = await axios.get('http://localhost:7001/get-categories')
        setcategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchcategories()
  }, [])

  useEffect(() => {
    if (selectAllChecked) {
      setSelectedRows(categories.map((category) => category._id))
    } else {
      setSelectedRows([])
    }
  }, [selectAllChecked, categories])

  const toggleRowSelection = (categoryId) => {
    const selectedIndex = selectedRows.indexOf(categoryId)
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, categoryId])
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== categoryId))
    }
  }

  const toggleSelectAll = () => {
    setSelectAllChecked(!selectAllChecked)
  }
  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:7001/delete-category/${categoryId}`)
      setcategories(categories.filter((category) => category._id !== categoryId))
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/accounts/categoryform">
            <CButton color="success" size="sm">
              Create Category
            </CButton>
          </Link>
        </div>
        <CCard className="mb-4">
          <CCardHeader>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div>
                <strong>Category</strong> <small>Lists</small>
              </div>
              {selectedRows.length > 0 && (
                <div className="mb-2">
                  {selectedRows.length === categories.length ? (
                    <div>All categories are selected</div>
                  ) : (
                    <div>{selectedRows.length}selected</div>
                  )}
                </div>
              )}
            </div>
          </CCardHeader>

          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>
                    <input type="checkbox" checked={selectAllChecked} onChange={toggleSelectAll} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {categories.map((category) => (
                  <CTableRow key={category._id}>
                    <CTableHeaderCell>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(category._id)}
                        onChange={() => toggleRowSelection(category._id)}
                      />
                    </CTableHeaderCell>
                    <CTableHeaderCell>{category.name}</CTableHeaderCell>
                    <CTableHeaderCell>{category.description}</CTableHeaderCell>
                    <CTableHeaderCell>
                      <CButton color="danger" size="sm">
                        <CIcon icon={cilDelete} onClick={() => handleDelete(category._id)} />
                      </CButton>
                    </CTableHeaderCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables

