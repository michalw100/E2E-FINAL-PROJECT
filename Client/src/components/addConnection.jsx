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
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const searchTerm1 = event.target.value.toLowerCase();
    setSearchTerm(searchTerm1);
    if (selectedEmployee) {
      const filteredClients = clients.filter(
        (client) =>
          !currentClients.some((c) => c.userID === client.userID) &&
          client.name.toLowerCase().includes(searchTerm1)
      );
      setSearchResults(filteredClients);
      console.log("filteredClients");
      console.log(filteredClients);
    }
    if (selectedClient) {
      const filteredEmployees = employees.filter(
        (employee) =>
          !currentEmployees.some((e) => e.userID === employee.userID) &&
          employee.name.toLowerCase().includes(searchTerm1)
      );
      setSearchResults(filteredEmployees);
      console.log("filteredEmployees");
      console.log(filteredEmployees);
    }
  };

  const handleSearchItemClick = (item) => {
    setSearchTerm("");
    setSearchResults([]);
    // הוספת הלוגיקה המתאימה לבחירה ברשימת החיפוש
    if (item.type === "client") {
      console.log("item.type === client");
      setSelectedClient(item);
      setSelectedEmployee(null);
    } else if (item.type === "employee") {
      setSelectedEmployee(item);
      setSelectedClient(null);
    }
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
    </div>
  );
};

export default addConnection;
