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
import Dialoga from '../../Dialog'
import CIcon from '@coreui/icons-react'
import { cilWindowMaximize } from '@coreui/icons'
import DeleteMany from '../../DeleteMany'

const PAGE_SIZE = 5 // Number of items per page

const Tables = () => {
  const [users, setUsers] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectAllChecked, setSelectAllChecked] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7001/get-all-users?page=${currentPage}&size=${PAGE_SIZE}`,
        )
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [currentPage])

  useEffect(() => {
    if (selectedRows.length === users.length) {
      setSelectAllChecked(true)
    } else {
      setSelectAllChecked(false)
    }
  }, [selectedRows, users])

  const toggleRowSelection = (userId) => {
    const selectedIndex = selectedRows.indexOf(userId)
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, userId])
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== userId))
    }
  }

  const toggleSelectAll = () => {
    setSelectAllChecked(!selectAllChecked)
    if (!selectAllChecked) {
      setSelectedRows(users.map((user) => user._id))
    } else {
      setSelectedRows([])
    }
  }

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:7001/delete-user/${userId}`)
      toast.success('User deleted successfully')

      setUsers(users.filter((user) => user._id !== userId))
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleDeleteAll = async () => {
    try {
      // Send a POST request to delete multiple accounts
      await axios.post('http://localhost:7001/delete-many-users', { usersids: selectedRows })
      toast.success('All selected users deleted successfully')

      // After successful deletion, update the accounts state by fetching fresh data
      const response = await axios.get(
        `http://localhost:7001/get-all-users?page=${currentPage}&size=${PAGE_SIZE}`,
      )
      setUsers(response.data)
      // Clear selected rows
      setSelectedRows([])
    } catch (error) {
      console.error('Error deleting users:', error)
    }
  }
  const pageCount = Math.ceil(users.length / PAGE_SIZE)

  const paginatedUsers = users.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const handleEdit = (userId) => {
    history.push(`/users/userForm?edit=${userId}`)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/users/userForm">
            <CButton color="primary" size="sm">
              Create user
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
                <strong>users</strong> <small>Lists</small>
              </div>
              {selectedRows.length > 0 && (
                <div className="mb-2">
                  {selectedRows.length === users.length ? (
                    <div>{users.length} selected</div>
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
                        checked={selectAllChecked}
                        onChange={toggleSelectAll}
                      />
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Company</CTableHeaderCell>
                    <CTableHeaderCell scope="col">City</CTableHeaderCell>
                    <CTableHeaderCell scope="col">State/Region</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell
                        colSpan="6"
                        style={{ textAlign: 'center', fontStyle: 'italic', color: 'gray' }}
                      >
                        <CIcon icon={cilWindowMaximize} size="xxl" />

                        <div> No item found</div>
                      </CTableDataCell>
                    </CTableRow>
                  ) : (
                    paginatedUsers.map((user) => (
                      <CTableRow key={user._id} style={{ fontWeight: 'normal' }}>
                        <CTableHeaderCell>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(user._id)}
                            onChange={() => toggleRowSelection(user._id)}
                          />
                        </CTableHeaderCell>
                        <CTableDataCell>{user.fullName}</CTableDataCell>
                        <CTableDataCell>{user.email}</CTableDataCell>
                        <CTableDataCell>{user.username}</CTableDataCell>
                        <CTableDataCell>{user.address}</CTableDataCell>
                        <CTableDataCell>{user.company}</CTableDataCell>
                        <CTableDataCell>{user.city}</CTableDataCell>
                        <CTableDataCell>{user.stateRegion}</CTableDataCell>
                        <CTableDataCell>{user.role}</CTableDataCell>
                        <CTableDataCell>
                          {/* <Dialoga itemId={user._id} handleDelete={handleDelete}/>   */}
                          <Dialoga
                            type="user"
                            itemId={user._id}
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
