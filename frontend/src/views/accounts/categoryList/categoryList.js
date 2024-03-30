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
  CPaginationItem,
  CPagination,
  CTableDataCell
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDelete } from '@coreui/icons'

const Tables = () => {
  const [categories, setcategories] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectAllChecked, setSelectAllChecked] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 5 // Number of items per page

  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7001/get-categories?page=${currentPage}&size=${PAGE_SIZE}`,
        )
        setcategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchcategories()
  }, [currentPage])

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
  const pageCount = Math.ceil(categories.length / PAGE_SIZE)

  const paginatedAccounts = categories.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  return (
    <CRow>
      <CCol xs={12}>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/accounts/categoryform">
          <CButton  color="primary" size="sm" >
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
                {paginatedAccounts.map((category) => (
                  <CTableRow key={category._id}>
                    <CTableHeaderCell>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(category._id)}
                        onChange={() => toggleRowSelection(category._id)}
                      />
                    </CTableHeaderCell>
                    <CTableDataCell>{category.name}</CTableDataCell>
                    <CTableDataCell>{category.description}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="danger" size="sm">
                        <CIcon icon={cilDelete} onClick={() => handleDelete(category._id)} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <CPagination aria-label="Page navigation example">
              <CPaginationItem
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </CPaginationItem>
              {[...Array(pageCount).keys()].map((index) => (
                <CPaginationItem
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem
                disabled={currentPage === pageCount}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
