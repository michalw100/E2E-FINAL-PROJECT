import React, { useState, useEffect } from "react";
import "../css/adminDashboard.css";
import AddConnection from "../components/addConnection";
import DeleteConnection from "../components/deleteConnection";

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [currentClients, setCurrentClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [currentEmployees, setCurrentEmployees] = useState([]);
  const [clientsemployees, setClientsemployees] = useState([]);
  const [currentClientsemployees, setCurrentClientsemployees] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeColors, setEmployeeColors] = useState({});
  const [triyngToDelete, setTriyngToDelete] = useState("");
  const [userToDelete, setUserToDelete] = useState(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.width);
  const [onChange, setOnChange] = useState(false);

  useEffect(() => {
    makeLines();
  }, [windowWidth]);

  useEffect(() => {
    setSelectedClient(null);
    setSelectedEmployee(null);
    setTriyngToDelete("");
    setUserToDelete(null);
    fetchClients();
    fetchEmployees();
    fetchConnections();
  }, [onChange]);

  useEffect(() => {
    if (selectedClient) {
      const relatedEmployees = clientsemployees
        .filter(
          (connection) => connection.client_user_id === selectedClient.userID
        )
        .map((connection) => connection.employee_user_id);

      setCurrentEmployees(
        employees.filter((employee) =>
          relatedEmployees.includes(employee.userID)
        )
      );

      setCurrentClientsemployees(
        clientsemployees.filter(
          (connection) => connection.client_user_id === selectedClient.userID
        )
      );

      setCurrentClients([selectedClient]);
    }
    setSelectedEmployee(null);
  }, [selectedClient]);

  useEffect(() => {
    if (selectedEmployee) {
      const relatedClients = clientsemployees
        .filter(
          (connection) =>
            connection.employee_user_id === selectedEmployee.userID
        )
        .map((connection) => connection.client_user_id);

      setCurrentClients(
        clients.filter((client) => relatedClients.includes(client.userID))
      );

      setCurrentClientsemployees(
        clientsemployees.filter(
          (connection) =>
            connection.employee_user_id === selectedEmployee.userID
        )
      );

      setCurrentEmployees([selectedEmployee]);
    }
    setSelectedClient(null);
  }, [selectedEmployee]);

  useEffect(() => {
    const colors = currentEmployees.map((employee) => ({
      id: employee.userID,
      color: getRandomColor(),
    }));
    console.log(colors);
    setEmployeeColors(colors);
  }, [currentEmployees]);

  useEffect(() => {
    document
      .querySelectorAll(".relationship-line")
      .forEach((line) => line.remove());
    makeLines();
  }, [currentClientsemployees, employeeColors]);

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
      setCurrentClients(data);
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
      setCurrentEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  const fetchConnections = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/connections", {
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
      setClientsemployees(data);
      setCurrentClientsemployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  const makeLines = () => {
    if (employeeColors) {
      // עבור כל מערך בין לקוח ועובד, ליצור קו
      currentClientsemployees.forEach((connectoin) => {
        const client = currentClients.find(
          (c) => c.userID === connectoin.client_user_id
        );
        const employee = currentEmployees.find(
          (e) => e.userID === connectoin.employee_user_id
        );
        if (client && employee) {
          const clientElement = document.querySelector(
            `#client-${client.userID}`
          );
          const employeeElement = document.querySelector(
            `#employee-${employee.userID}`
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
            relationshipLine.style.backgroundColor = getEmployeeColor(
              employee.userID
            ); // קבע צבע לפי העובד
            relationshipLine.style.borderColor = getEmployeeColor(
              employee.userID
            ); // קבע צבע המסגרת לפי העובד
            document.body.appendChild(relationshipLine);
          }
        }
      });
    }
  };

  const getRandomColor = () => {
    const getByte = () => 128 + Math.floor(Math.random() * 128);
    return `rgb(${getByte()}, ${getByte()}, ${getByte()})`;
  };

  const getEmployeeMargin = () => {
    if (currentEmployees.length >= currentClients.length) return "10px";
    const clientsLength = currentClients.length * 40;
    const employeeLength = clientsLength / currentEmployees.length;
    return `${employeeLength - 10}px`;
  };

  const getClientMargin = () => {
    if (currentEmployees.length <= currentClients.length) return "10px";
    const employesLength = currentEmployees.length * 40;
    const clientLength = employesLength / currentEmployees.length;
    return `${clientLength - 10}px`;
  };

  const getEmployeeColor = (employeeID) => {
    const employeeColor =
      employeeColors.find((e) => e.id === employeeID)?.color || "black";
    return employeeColor;
  };

  const handleClientClick = (client) => {
    if (triyngToDelete == "Employee") {
      console.log("      triyngToDelete == Employee;");
      setIsModalOpenDelete(true);
      setUserToDelete(client);
    } else {
      console.log("      setSelectedClient(client);");
      console.log(client);
      setTriyngToDelete("");
      setSelectedClient(client);
      setSelectedEmployee(null);
    }
  };

  const handleEmployeeClick = (employee) => {
    if (triyngToDelete == "Client") {
      setIsModalOpenDelete(true);
      setUserToDelete(employee);
    } else {
      console.log("      setSelectedEmployee(employee);");
      console.log(employee);

      setTriyngToDelete("");
      setSelectedClient(null);
      setSelectedEmployee(employee);
    }
  };

  const handleResetClick = () => {
    setSelectedClient(null);
    setSelectedEmployee(null);
    setCurrentClients(clients);
    setCurrentEmployees(employees);
    setCurrentClientsemployees(clientsemployees);
    setTriyngToDelete("");
    setUserToDelete(null);
  };

  return (
    <div className="admin-dashboard">
      {(selectedClient || selectedEmployee) && (
        <div className="reset-button-container">
          <button onClick={handleResetClick} className="reset-button">
            Show All{" "}
          </button>
        </div>
      )}
      <div className="content-container">
        <div className="clients-list">
          <h3>Clients</h3>
          <ul>
            {currentClients.map((client) => (
              <li
                onClick={() => handleClientClick(client)}
                key={client.userID}
                style={{
                  marginBottom: getClientMargin(),
                }}
              >
                <div>{client.name}</div>
                <div
                  id={`client-${client.userID}`}
                  className="circle-button"
                  style={{
                    backgroundColor:
                      triyngToDelete == "Employee" ? "red" : "#ccc",
                  }}
                >
                  {client.name.charAt(0)}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="employees-list">
          <h3>Employees</h3>
          <ul>
            {currentEmployees.map((employee) => (
              <li
                onClick={() => handleEmployeeClick(employee)}
                key={employee.userID}
                style={{
                  marginBottom: getEmployeeMargin(),
                }}
              >
                <div
                  style={{
                    backgroundColor:
                      triyngToDelete == "Client"
                        ? "red"
                        : getEmployeeColor(employee.userID),
                  }}
                  id={`employee-${employee.userID}`}
                  className="circle-button"
                >
                  {employee.name.charAt(0)}
                </div>
                <div>{employee.name}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <DeleteConnection
        selectedClient={selectedClient}
        selectedEmployee={selectedEmployee}
        triyngToDelete={triyngToDelete}
        setTriyngToDelete={setTriyngToDelete}
        userToDelete={userToDelete}
        isModalOpenDelete={isModalOpenDelete}
        setIsModalOpenDelete={setIsModalOpenDelete}
        currentClientsemployees={currentClientsemployees}
        onChange={onChange}
        setOnChange={setOnChange}
      />
      <AddConnection
        selectedClient={selectedClient}
        selectedEmployee={selectedEmployee}
        clients={clients}
        currentClients={currentClients}
        employees={employees}
        currentEmployees={currentEmployees}
        isModalOpenAdd={isModalOpenAdd}
        setIsModalOpenAdd={setIsModalOpenAdd}
        onChange={onChange}
        setOnChange={setOnChange}
      />
    </div>
  );
};

export default AdminDashboard;
