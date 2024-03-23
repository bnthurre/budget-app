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
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:7001/get-accounts');
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <CRow>
      <CCol xs={12}>
      <div className="d-flex justify-content-end mb-3">
          {/* Link to the account form */}
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
                  <CTableHeaderCell scope="col">Account Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Account Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Account Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {accounts.map((account) => (
                  <CTableRow key={account._id}>
                    <CTableHeaderCell scope="row">{account.account_number}</CTableHeaderCell>
                    <CTableHeaderCell>{account.account_name}</CTableHeaderCell>
                    <CTableHeaderCell>{account.account_type}</CTableHeaderCell>
                    <CTableHeaderCell>{account.description}</CTableHeaderCell>
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




// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CTable,
//   CTableBody,
//   CTableCaption,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
// } from '@coreui/react'

// const Tables = () => {
//   const [accounts, setAccounts] = useState([])

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const response = await axios.get('http://localhost:7003/get-accounts')
//         setAccounts(response.data)
//       } catch (error) {
//         console.error('Error fetching accounts:', error)
//       }
//     }

//     fetchAccounts()
//   }, [])

//   return (
//     <CRow>
//       <CCol xs={12}>
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
//                     <CTableDataCell>{account.account_name}</CTableDataCell>
//                     <CTableDataCell>{account.account_type}</CTableDataCell>
//                     <CTableDataCell>{account.description}</CTableDataCell>
//                   </CTableRow>
//                 ))}
//               </CTableBody>
//             </CTable>
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   )
// }

// export default Tables
