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
  const [allocations, setallocation] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectAllChecked, setSelectAllChecked] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 5 // Number of items per page

  useEffect(() => {
    const fetchallocation = async () => {
      try {
        const response = await axios.post(`http://localhost:7001/get-budget-allocation?page=${currentPage}&size=${PAGE_SIZE}`)
        setallocation(response.data)
      } catch (error) {
        console.error('Error fetching allocations:', error)
      }
    }

    fetchallocation()
  }, [currentPage])
 
  useEffect(() => {
    if (selectAllChecked) {
      setSelectedRows(allocations.map((account) => account._id))
    } else {
      setSelectedRows([])
    }
  }, [selectAllChecked, allocations])

  const toggleRowSelection = (accountId) => {
    const selectedIndex = selectedRows.indexOf(accountId)
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, accountId])
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== accountId))
    }
  }

  const toggleSelectAll = () => {
    setSelectAllChecked(!selectAllChecked)
  }
  const handleDelete = async (allocationId) => {
    try {
      await axios.delete(`http://localhost:7001/delete-budget-allocation/${allocationId}`)
      setallocation(allocations.filter((allocations) => allocations._id !== allocationId))
    } catch (error) {
      console.error('Error deleting allocations:', error)
    }
  }
  const pageCount = Math.ceil(allocations.length / PAGE_SIZE)

  const paginatedAccounts = allocations.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  return (
    <CRow>
      <CCol xs={12}>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/budget/budgetAllocationForm">
          <CButton  color="primary" size="sm" >
              Create allocations
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
                <strong>allocation</strong> <small>Lists</small>
              </div>
              {selectedRows.length > 0 && (
                <div className="mb-2">
                  {selectedRows.length === allocations.length ? (
                    <div>All allocations are selected</div>
                  ) : (
                    <div>{selectedRows.length}selected</div>
                  )}
                </div>
              )}
            </div>
          </CCardHeader>

          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>
                    <input type="checkbox" checked={selectAllChecked} onChange={toggleSelectAll} />
                    </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                  <CTableHeaderCell scope="col">account Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Budget Amount</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Year</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Budget Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
              {paginatedAccounts.map((allocation) => (
                  <CTableRow key={allocation._id}>
                    <CTableHeaderCell>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes( allocation._id)}
                        onChange={() => toggleRowSelection(allocation._id)}
                      />
                    </CTableHeaderCell>
                    <CTableDataCell>{allocation.categories.name}</CTableDataCell>
                    <CTableDataCell>{allocation.accounts.account_number}</CTableDataCell>
                    <CTableDataCell>{allocation.budget_amount}</CTableDataCell>
                    <CTableDataCell>{allocation.year}</CTableDataCell>
                    <CTableDataCell>{new Date(allocation.budget_date).toLocaleDateString()}</CTableDataCell>
                    <CTableDataCell>{allocation.description}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="danger" size="sm">
                        <CIcon icon={cilDelete} onClick={() => handleDelete(allocations._id)} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <CPagination aria-label="Page navigation example">
              <CPaginationItem disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </CPaginationItem>
              {[...Array(pageCount).keys()].map((index) => (
                <CPaginationItem key={index} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem disabled={currentPage === pageCount} onClick={() => setCurrentPage(currentPage + 1)}>
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
