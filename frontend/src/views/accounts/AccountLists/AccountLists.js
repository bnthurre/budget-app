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
  const [accounts, setAccounts] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectAllChecked, setSelectAllChecked] = useState(false)

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:7001/get-accounts')
        setAccounts(response.data)
      } catch (error) {
        console.error('Error fetching accounts:', error)
      }
    }

    fetchAccounts()
  }, [])

  useEffect(() => {
    if (selectAllChecked) {
      setSelectedRows(accounts.map((account) => account._id))
    } else {
      setSelectedRows([])
    }
  }, [selectAllChecked, accounts])

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

  const handleDelete = async (accountId) => {
    try {
      await axios.delete(`http://localhost:7001/delete-account/${accountId}`)
      setAccounts(accounts.filter((account) => account._id !== accountId))
      setSelectedRows(selectedRows.filter((id) => id !== accountId))
    } catch (error) {
      console.error('Error deleting account:', error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/accounts/accounts/accountform/accountform.js">
            <CButton color="success" size="sm">
              Create Account
            </CButton>
          </Link>
        </div>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Account</strong> <small>Lists</small>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell><div>
                    <input type="checkbox" checked={selectAllChecked} onChange={toggleSelectAll} />
                  </div></CTableHeaderCell>

                  <CTableHeaderCell scope="col">Account Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Account Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Account Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {accounts.map((account) => (
                  <CTableRow key={account._id}>
                    <CTableHeaderCell>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(account._id)}
                        onChange={() => toggleRowSelection(account._id)}
                      />
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="row">{account.account_number}</CTableHeaderCell>
                    <CTableHeaderCell>{account.account_name}</CTableHeaderCell>
                    <CTableHeaderCell>{account.account_type}</CTableHeaderCell>
                    <CTableHeaderCell>{account.description}</CTableHeaderCell>
                    <CTableHeaderCell>
                      <CButton color="danger" size="sm" onClick={() => handleDelete(account._id)}>
                        <CIcon icon={cilDelete} />
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

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import axios from 'axios';
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CTable,
//   CTableBody,
//   CTableHeaderCell,
//   CTableHead,
//   CTableRow,
// } from '@coreui/react';

// const Tables = () => {
//   const [accounts, setAccounts] = useState([]);

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const response = await axios.get('http://localhost:7001/get-accounts');
//         setAccounts(response.data);
//       } catch (error) {
//         console.error('Error fetching accounts:', error);
//       }
//     };

//     fetchAccounts();
//   }, []);

//   return (
//     <CRow>
//       <CCol xs={12}>
//       <div className="d-flex justify-content-end mb-3">
//           {/* Link to the account form */}
//           <Link to="/accounts/accounts/accountform/accountform.js">
//             <CButton color="success" size="sm">
//               Create Account
//             </CButton>
//           </Link>
//         </div>
//         <CCard className="mb-4">
//           <CCardHeader>
//             <strong>Account</strong> <small>Lists</small>
//           </CCardHeader>
//           <CCardBody>
//             <CTable striped>
//               <CTableHead>
//                 <CTableRow>
//                   <CTableHeaderCell scope="col">Account Number</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">Account Name</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">Account Type</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">Description</CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>
//                 {accounts.map((account) => (
//                   <CTableRow key={account._id}>
//                     <CTableHeaderCell scope="row">{account.account_number}</CTableHeaderCell>
//                     <CTableHeaderCell>{account.account_name}</CTableHeaderCell>
//                     <CTableHeaderCell>{account.account_type}</CTableHeaderCell>
//                     <CTableHeaderCell>{account.description}</CTableHeaderCell>
//                   </CTableRow>
//                 ))}
//               </CTableBody>
//             </CTable>
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   );
// };

// export default Tables;
