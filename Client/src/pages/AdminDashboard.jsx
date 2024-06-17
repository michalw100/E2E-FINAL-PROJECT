import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import ClientDetails from "./ClientDetails";
// import EmployeeDetails from "./EmployeeDetails";
import "../css/adminDashboard.css";

const initialClients = [
  { id: 1, name: "Client A" },
  { id: 2, name: "Client B" },
  { id: 3, name: "Client C" },
];

const initialEmployees = [
  { id: 101, name: "Employee X" },
  { id: 102, name: "Employee Y" },
  { id: 103, name: "Employee Z" },
];

const AdminDashboard = () => {
  const [clients, setClients] = useState(initialClients);
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    // Fetch clients
    fetchClients();
    // Fetch employees
    fetchEmployees();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/clients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error.message);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/employees", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <div className="admin-dashboard">
      <div className="clients-list">
        <h3>Clients</h3>
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              <Link
                to={`/admin/client/${client.id}`}
                onClick={() => handleClientClick(client)}
              >
                {client.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="employees-list">
        <h3>Employees</h3>
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              <Link
                to={`/admin/employee/${employee.id}`}
                onClick={() => handleEmployeeClick(employee)}
              >
                {employee.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="details-section">
        <div className="client-details">
          {selectedClient && <ClientDetails client={selectedClient} />}
        </div>
        <div className="employee-details">
          {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
        </div>
      </div> */}
    </div>
  );
};

export default AdminDashboard;
