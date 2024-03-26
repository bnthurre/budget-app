import React from 'react';
import { CButton } from '@coreui/react';

const ConfirmationDialog = ({ isOpen, onCancel, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4>Confirm Deletion</h4>
        </div>
        <div className="modal-body">
          Are you sure you want to delete this item?
        </div>
        <div className="modal-footer">
          <CButton color="danger" onClick={onDelete}>
            Delete
          </CButton>
          <CButton color="secondary" onClick={onCancel}>
            Cancel
          </CButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

