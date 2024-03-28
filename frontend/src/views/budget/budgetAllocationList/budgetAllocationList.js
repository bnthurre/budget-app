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
  const [allocations, setallocation] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectAllChecked, setSelectAllChecked] = useState(false)

  useEffect(() => {
    const fetchallocation = async () => {
      try {
        const response = await axios.post('http://localhost:7001/get-budget-allocation')
        setallocation(response.data)
      } catch (error) {
        console.error('Error fetching allocations:', error)
      }
    }

    fetchallocation()
  }, [])

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
  return (
    <CRow>
      <CCol xs={12}>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/budget/budgetAllocationForm">
            <CButton color="success" size="sm">
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
            <CTable striped>
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
                {allocations.map((allocations) => (
                  <CTableRow key={allocations._id}>
                    <CTableHeaderCell>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(allocations._id)}
                        onChange={() => toggleRowSelection(allocations._id)}
                      />
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="row">{allocations.categories.name}</CTableHeaderCell>
                    <CTableHeaderCell>{allocations.accounts.account_number}</CTableHeaderCell>
                    <CTableHeaderCell>{allocations.budget_amount}</CTableHeaderCell>
                    <CTableHeaderCell>{allocations.year}</CTableHeaderCell>
                    <CTableHeaderCell>{allocations.budget_date}</CTableHeaderCell>
                    <CTableHeaderCell>{allocations.description}</CTableHeaderCell>
                    <CTableHeaderCell>
                      <CButton color="danger" size="sm">
                        <CIcon icon={cilDelete} onClick={() => handleDelete(allocations._id)} />
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
