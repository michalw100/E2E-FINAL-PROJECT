import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import ClientDetails from "./ClientDetails";
// import EmployeeDetails from "./EmployeeDetails";
import "../css/adminDashboard.css";

const initialClients = [
  { id: 1, name: "Client A" },
  { id: 2, name: "Client B" },
  { id: 3, name: "Client C" },
  { id: 4, name: "Client D" },
  { id: 5, name: "Client E" },
  { id: 6, name: "Client F" },
  { id: 7, name: "Client G" },
  { id: 8, name: "Client H" },
  { id: 9, name: "Client I" },
  { id: 10, name: "Client J" },
  { id: 11, name: "Client K" },
  { id: 12, name: "Client L" },
  { id: 13, name: "Client M" },
  { id: 14, name: "Client N" },
  { id: 15, name: "Client O" },
  { id: 16, name: "Client P" },
  { id: 17, name: "Client Q" },
  { id: 18, name: "Client R" },
  { id: 19, name: "Client S" },
  { id: 20, name: "Client T" },
];

const initialEmployees = [
  { id: 101, name: "Employee X" },
  { id: 102, name: "Employee Y" },
  { id: 103, name: "Employee Z" },
];

const relationships = [
  { clientId: 1, employeeId: 101 }, // קשר כלשהו
  { clientId: 2, employeeId: 102 },
  { clientId: 3, employeeId: 103 },
  { clientId: 4, employeeId: 101 },
  { clientId: 5, employeeId: 102 },
  { clientId: 6, employeeId: 103 },
  { clientId: 7, employeeId: 101 },
  { clientId: 8, employeeId: 102 },
  { clientId: 9, employeeId: 103 },
  { clientId: 10, employeeId: 101 },
  { clientId: 11, employeeId: 102 },
  { clientId: 12, employeeId: 103 },
  { clientId: 13, employeeId: 101 },
  { clientId: 14, employeeId: 102 },
  { clientId: 15, employeeId: 103 },
  { clientId: 16, employeeId: 101 },
  { clientId: 17, employeeId: 102 },
  { clientId: 18, employeeId: 103 },
  { clientId: 19, employeeId: 101 },
  { clientId: 20, employeeId: 102 },
];

const AdminDashboard = () => {
  const [clients, setClients] = useState(initialClients);
  const [employees, setEmployees] = useState(initialEmployees);
  const [clientsemployees, setclientsemployees] = useState(relationships);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeColors, setEmployeeColors] = useState({});

  const getRandomColor = () => {
    const getByte = () => 128 + Math.floor(Math.random() * 128);
    return `rgb(${getByte()}, ${getByte()}, ${getByte()})`;
  };

  useEffect(() => {
    // Fetch clients
    fetchClients();
    // Fetch employees
    fetchEmployees();

    const colors = {};
    initialEmployees.forEach((employee) => {
      colors[employee.id] = getRandomColor();
    });
    setEmployeeColors(colors);
  }, []);

  const fetchClients = async () => {
    // try {
    //   const response = await fetch("http://localhost:3000/users/clients", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //   });
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   setClients(data);
    // } catch (error) {
    //   console.error("Error fetching clients:", error.message);
    // }
  };

  const fetchEmployees = async () => {
    // try {
    //   const response = await fetch("http://localhost:3000/users/employees", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //   });
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   setEmployees(data);
    // } catch (error) {
    //   console.error("Error fetching employees:", error.message);
    // }
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  // קוד JavaScript כדי להוסיף את הקווים באופן דינמי
  useEffect(() => {
    // עבור כל מערך בין לקוח ועובד, ליצור קו
    relationships.forEach((relation) => {
      const client = clients.find((c) => c.id === relation.clientId);
      const employee = employees.find((e) => e.id === relation.employeeId);
      if (client && employee) {
        const clientElement = document.querySelector(`#client-${client.id}`);
        const employeeElement = document.querySelector(
          `#employee-${employee.id}`
        );
        if (clientElement && employeeElement) {
          const clientRect = clientElement.getBoundingClientRect();
          const employeeRect = employeeElement.getBoundingClientRect();
          const clientTop =
            clientRect.top + window.scrollY + clientRect.height / 2;
          const employeeTop =
            employeeRect.top + window.scrollY + employeeRect.height / 2;

          const deltaX = employeeRect.left - clientRect.right;
          const deltaY = employeeTop - clientTop;
          const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

          const relationshipLine = document.createElement("div");
          relationshipLine.className = "relationship-line";
          relationshipLine.style.top = `${clientTop}px`;
          relationshipLine.style.left = `${clientRect.right}px`;
          relationshipLine.style.width = `${length}px`;
          relationshipLine.style.transform = `rotate(${angle}deg)`;
          relationshipLine.style.transformOrigin = "0 0"; // הגדר את נקודת התחלת הסיבוב לתחילת הקו
          relationshipLine.style.backgroundColor = employeeColors[employee.id]; // קבע צבע לפי העובד
          relationshipLine.style.borderColor = employeeColors[employee.id]; // קבע צבע המסגרת לפי העובד
          document.body.appendChild(relationshipLine);
        }
      }
    });
  }, [clients, employees, relationships, employeeColors]);

  const getEmployeeMargin = () => {
    if (employees.length >= clients.length) return "10px";
    const clientsLength = clients.length * 40;
    const employeeLength = clientsLength / employees.length;
    return `${employeeLength - 10}px`;
  };

  const getClientMargin = () => {
    if (employees.length <= clients.length) return "10px";
    const employesLength = employees.length * 40;
    const clientLength = employesLength / employees.length;
    return `${clientLength - 10}px`;
  };

  return (
    <div className="admin-dashboard">
      <div className="clients-list">
        <h3>Clients</h3>
        <ul>
          {clients.map((client) => (
            <li
              key={client.id}
              style={{
                marginBottom: getClientMargin(),
              }}
            >
              <div onClick={() => handleClientClick(client)}>{client.name}</div>
              <div id={`client-${client.id}`} className="circle-button">
                {client.name.charAt(0)}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="employees-list">
        <h3>Employees</h3>
        <ul>
          {employees.map((employee) => (
            <li
              key={employee.id}
              style={{
                marginBottom: getEmployeeMargin(),
              }}
            >
              <div
                style={{
                  backgroundColor: employeeColors[employee.id],
                }}
                id={`employee-${employee.id}`}
                className="circle-button"
              >
                {employee.name.charAt(0)}
              </div>
              <div onClick={() => handleEmployeeClick(employee)}>
                {employee.name}
              </div>
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
