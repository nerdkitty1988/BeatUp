import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddGroupForm from './AddGroupForm';

function AddGroupModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add Group</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddGroupForm />
        </Modal>
      )}
    </>
  );
}

export default AddGroupModal;
