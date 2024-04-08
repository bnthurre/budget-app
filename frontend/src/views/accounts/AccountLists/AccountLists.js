import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
} from '@coreui/react';
import Dialoga from '../../Dialog';
import CIcon from '@coreui/icons-react';
import { cilWindowMaximize } from '@coreui/icons';
import DeleteMany from '../../DeleteMany';

const PAGE_SIZE = 5; // Number of items per page

const Tables = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7001/get-accounts?page=${currentPage}&size=${PAGE_SIZE}`
        );
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, [currentPage]);

  useEffect(() => {
    if (selectedRows.length === accounts.length) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }
  }, [selectedRows, accounts]);

  const toggleRowSelection = (accountId) => {
    const selectedIndex = selectedRows.indexOf(accountId);
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, accountId]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== accountId));
    }
  };

  const toggleSelectAll = () => {
    if (accounts.length > 0) {
      setSelectAllChecked(!selectAllChecked);
      if (!selectAllChecked) {
        setSelectedRows(accounts.map((account) => account._id));
      } else {
        setSelectedRows([]);
      }
    }
  };

  const handleDelete = async (accountId) => {
    try {
      await axios.delete(`http://localhost:7001/delete-account/${accountId}`);
      // Remove the deleted account from the accounts state
      setAccounts(accounts.filter((account) => account._id !== accountId));
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      // Send a POST request to delete multiple accounts
      await axios.post('http://localhost:7001/delete-accounts', { accountIds: selectedRows });
      // After successful deletion, update the accounts state by fetching fresh data
      const response = await axios.get(
        `http://localhost:7001/get-accounts?page=${currentPage}&size=${PAGE_SIZE}`
      );
      setAccounts(response.data);
      // Clear selected rows
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting accounts:', error);
    }
  };

  const pageCount = Math.ceil(accounts.length / PAGE_SIZE);

  const paginatedAccounts = accounts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleEdit = (accountId) => {
    history.push(`/accounts/accountform?edit=${accountId}`);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/accounts/accountform">
            <CButton color="primary" size="sm">
              Create Account
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
                <strong>Account</strong> <small>Lists</small>
              </div>
              {selectedRows.length > 0 && selectedRows.length > 1 && (
                <div className="mb-2">
                  {selectedRows.length === accounts.length ? (
                    <div>All accounts are selected</div>
                  ) : (
                    <div>{selectedRows.length} selected</div>
                  )}
                </div>
              )}
              {selectedRows.length > 1 && <DeleteMany handleDeleteMany={handleDeleteAll} itemId={selectedRows} />}
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
                        checked={selectAllChecked && accounts.length > 0}
                        onChange={toggleSelectAll}
                        disabled={accounts.length === 0}
                      />
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Account Number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Account Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Account Type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {accounts.length === 0 ? (
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
                    paginatedAccounts.map((account) => (
                      <CTableRow key={account._id} style={{ fontWeight: 'normal' }}>
                        <CTableHeaderCell>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(account._id)}
                            onChange={() => toggleRowSelection(account._id)}
                          />
                        </CTableHeaderCell>
                        <CTableDataCell>{account.account_number}</CTableDataCell>
                        <CTableDataCell>{account.account_name}</CTableDataCell>
                        <CTableDataCell>{account.account_type}</CTableDataCell>
                        <CTableDataCell>{account.description}</CTableDataCell>
                        <CTableDataCell>
                          <Dialoga
                            type="account"
                            itemId={account._id}
                            handleDelete={handleDelete}
                            onEdit={handleEdit}
                          />
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  )}
                </CTableBody>
              </CTable>
            </div>
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
  );
};

export default Tables;

