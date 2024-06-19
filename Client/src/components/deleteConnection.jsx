import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const deleteConnection = ({
  selectedClient,
  selectedEmployee,
  setTriyngToDelete,
  userToDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmDelete = () => {
    handleModalClose();
  };

  const handleModalClose = () => {
    setTriyngToDelete("");
    setIsModalOpen(false);
  };

  const handleDeleteConnection = async () => {
    if (selectedClient) setTriyngToDelete("Client");
    if (selectedEmployee) setTriyngToDelete("Employee");
  };

  return (
    <div>
      {selectedClient && (
        <button onClick={handleDeleteConnection} className="delete-button">
          Click on me and choose a employee to delete{" "}
        </button>
      )}
      {selectedEmployee && (
        <button onClick={handleDeleteConnection} className="delete-button">
          Click on me and choose a client to delete{" "}
        </button>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Confirm Connection Deletion"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Confirm Connection Deletion</h2>
        <p>
          Are you sure you want to delete the connection between{" "}
          <strong>
            {selectedClient
              ? selectedClient.name
              : userToDelete && userToDelete.name}
          </strong>{" "}
          and{" "}
          <strong>
            {selectedEmployee
              ? selectedEmployee.name
              : userToDelete && userToDelete.name}
          </strong>
          ?
        </p>
        <button onClick={handleConfirmDelete} autoFocus>
          Yes
        </button>
        <button onClick={handleModalClose}>No</button>
      </Modal>
    </div>
  );
};

export default deleteConnection;
