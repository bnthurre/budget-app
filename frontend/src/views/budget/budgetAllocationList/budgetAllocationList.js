import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CPagination,
  CRow,
  CTable,
  CTableBody,
  CTableHeaderCell,
  CTableHead,
  CTableRow,
  CPaginationItem,
  CTableDataCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWindowMaximize } from '@coreui/icons'
import Dialoga from '../../Dialog'
import DeleteMany from '../../DeleteMany'

const Tables = () => {
  const [allocations, setAllocations] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectAllChecked, setSelectAllChecked] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const PAGE_SIZE = 5 // Number of items per page

  useEffect(() => {
    const fetchAllocations = async () => {
      try {
        const response = await axios.post(
          `http://localhost:7001/get-budget-allocation?page=${currentPage}&size=${PAGE_SIZE}`,
        )
        setAllocations(response.data)
      } catch (error) {
        console.error('Error fetching allocations:', error)
      }
    }

    fetchAllocations()
  }, [currentPage])

  useEffect(() => {
    setSelectAllChecked(selectedRows.length === allocations.length)
  }, [selectedRows, allocations])

  const toggleRowSelection = (allocationId) => {
    const updatedSelectedRows = selectedRows.includes(allocationId)
      ? selectedRows.filter((id) => id !== allocationId)
      : [...selectedRows, allocationId]
    setSelectedRows(updatedSelectedRows)
  }

  const toggleSelectAll = () => {
    if (allocations.length > 0) {
      if (!selectAllChecked) {
        setSelectedRows(allocations.map((allocation) => allocation._id))
      } else {
        setSelectedRows([])
      }
      setSelectAllChecked(!selectAllChecked)
    }
  }

  const handleDelete = async (allocationId) => {
    try {
      await axios.delete(`http://localhost:7001/delete-budget-allocation/${allocationId}`)
      toast.success('Allocation deleted successfully')

      setAllocations(allocations.filter((allocation) => allocation._id !== allocationId))
      setSelectedRows(selectedRows.filter((id) => id !== allocationId))
      setSelectAllChecked(false) // Uncheck "Select All" when deleting an allocation
    } catch (error) {
      console.error('Error deleting allocations:', error)
    }
  }
  const handleDeleteAll = async () => {
    try {
      // Send a POST request to delete multiple accounts
      await axios.post('http://localhost:7001/delete-budget-allocations', {
        allocationIds: selectedRows,
      })
      toast.success('All selected allocations deleted successfully')

      // After successful deletion, update the accounts state by fetching fresh data
      const response = await axios.post(
        `http://localhost:7001/get-budget-allocation?page=${currentPage}&size=${PAGE_SIZE}`,
      )
      setAllocations(response.data)
      // Clear selected rows
      setSelectedRows([])
    } catch (error) {
      console.error('Error deleting allocations:', error)
    }
  }

  const pageCount = Math.ceil(allocations.length / PAGE_SIZE)

  const paginatedAllocations = allocations.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )
  const handleEdit = (accountId) => {
    history.push(`/budget/budgetAllocationForm?edit=${accountId}`)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/budget/budgetAllocationForm">
            <CButton color="primary" size="sm">
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
                <strong>Allocation</strong> <small>Lists</small>
              </div>
              {selectedRows.length > 0 && (
                <div className="mb-2">
                  {selectedRows.length === allocations.length ? (
                    <div>All allocations are selected</div>
                  ) : (
                    <div>{selectedRows.length} selected</div>
                  )}
                </div>
              )}
              {selectedRows.length > 1 && (
                <DeleteMany handleDeleteMany={handleDeleteAll} itemId={selectedRows} />
              )}
            </div>
          </CCardHeader>

          <CCardBody>
            <div className="table-responsive" style={{ overflowX: 'scroll' }}>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>
                      <input
                        type="checkbox"
                        checked={selectAllChecked && allocations.length > 0}
                        onChange={toggleSelectAll}
                        disabled={allocations.length === 0}
                      />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Category</CTableHeaderCell>
                    <CTableHeaderCell>Account Number</CTableHeaderCell>
                    <CTableHeaderCell>Budget Amount</CTableHeaderCell>
                    <CTableHeaderCell>Year</CTableHeaderCell>
                    <CTableHeaderCell>Budget Date</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {allocations.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell
                        colSpan="7"
                        style={{ textAlign: 'center', fontStyle: 'italic', color: 'gray' }}
                      >
                        <CIcon icon={cilWindowMaximize} size="xxl" />
                        <div> No item found</div>
                      </CTableDataCell>
                    </CTableRow>
                  ) : (
                    paginatedAllocations.map((allocation) => (
                      <CTableRow key={allocation._id}>
                        <CTableHeaderCell>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(allocation._id)}
                            onChange={() => toggleRowSelection(allocation._id)}
                          />
                        </CTableHeaderCell>
                        <CTableDataCell>{allocation.categories.name}</CTableDataCell>
                        <CTableDataCell>{allocation.accounts.account_number}</CTableDataCell>
                        <CTableDataCell>${allocation.budget_amount}</CTableDataCell>
                        <CTableDataCell>{allocation.year}</CTableDataCell>
                        <CTableDataCell>
                          {new Date(allocation.budget_date).toLocaleDateString()}
                        </CTableDataCell>
                        <CTableDataCell>{allocation.description}</CTableDataCell>
                        <CTableDataCell>
                          <Dialoga
                            type="allocation"
                            itemId={allocation._id}
                            handleDelete={handleDelete}
                            onEdit={handleEdit}
                          />
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  )}
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
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
