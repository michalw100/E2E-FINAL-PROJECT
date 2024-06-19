import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const addConnection = ({
  selectedClient,
  selectedEmployee,
  clients,
  currentClients,
  employees,
  currentEmployees,
  setSelectedClient,
  setSelectedEmployee,
  isModalOpenAdd,
  setIsModalOpenAdd,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [triyngToAdd, setTriyngToAdd] = useState(null);

  // console.log("selectedClient")
  // console.log(selectedClient)

  useEffect(() => {
    setSearchTerm("");
  }, [selectedClient, selectedEmployee]);

  useEffect(() => {
    if (selectedEmployee) {
      const filteredClients = clients.filter(
        (client) =>
          !currentClients.some((c) => c.userID === client.userID) &&
          client.name.toLowerCase().includes(searchTerm)
      );
      setSearchResults(filteredClients);
    } else if (selectedClient) {
      const filteredEmployees = employees.filter(
        (employee) =>
          !currentEmployees.some((e) => e.userID === employee.userID) &&
          employee.name.toLowerCase().includes(searchTerm)
      );
      setSearchResults(filteredEmployees);
    } else setSearchResults([]);
  }, [searchTerm]);

  const handleSearch = (event) => {
    const searchTerm1 = event.target.value.toLowerCase();
    setSearchTerm(searchTerm1);
  };

  const handleSearchItemClick = (item) => {
    // setSearchTerm("");
    // setSearchResults([]);
    setTriyngToAdd(item);
    setIsModalOpenAdd(true);
  };

  const handleConfirmAdd = () => {
    handleModalClose();
  };

  const handleModalClose = () => {
    setIsModalOpenAdd(false);
  };

  return (
    <div>
      {(selectedClient || selectedEmployee) && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search employees or clients..."
            onChange={handleSearch}
            value={searchTerm}
            className="search-input"
          />
          {searchResults.length > 0 && (
            <ul className="search-results visible">
              {searchResults.map((item) => (
                <li
                  className="search-result"
                  key={item.userID}
                  onClick={() => handleSearchItemClick(item)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <Modal
        isOpen={isModalOpenAdd}
        onRequestClose={handleModalClose}
        contentLabel="Confirm Connection Deletion"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Confirm Connection Deletion</h2>
        <p>
          Are you sure you want to add the connection between{" "}
          <strong>
            {selectedClient
              ? selectedClient.name
              : triyngToAdd && triyngToAdd.name}
          </strong>{" "}
          and{" "}
          <strong>
            {selectedEmployee
              ? selectedEmployee.name
              : triyngToAdd && triyngToAdd.name}
          </strong>
          ?
        </p>
        <button onClick={handleConfirmAdd} autoFocus>
          Yes
        </button>
        <button onClick={handleModalClose}>No</button>
      </Modal>
    </div>
  );
};

export default addConnection;
