/* Create the database */
DROP DATABASE IF EXISTS CBS_DB;

CREATE DATABASE IF NOT EXISTS CBS_DB;

USE CBS_DB;

CREATE TABLE addresses (
  addressID int AUTO_INCREMENT,
  street varchar(50) NOT NULL,
  city varchar(50) NOT NULL,
  zipcode varchar(10) NOT NULL,
  PRIMARY KEY (addressID)
);
-- Create table users
CREATE TABLE
    users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userName VARCHAR(255) UNIQUE,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(20),
		addressID int,
        -- isClient BOOLEAN DEFAULT false,
		FOREIGN KEY (addressID) REFERENCES addresses (addressID)
    );

-- Create table parent_client
CREATE TABLE
    parent_client (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

-- Create table clients 
CREATE TABLE
    clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userID INT NOT NULL,
        parentClientID INT,
        isApproved BOOLEAN DEFAULT FALSE,
        notes TEXT,
        FOREIGN KEY (userID) REFERENCES users (id),
        FOREIGN KEY (parentClientID) REFERENCES parent_client (id)
    );

-- Create table employees
CREATE TABLE
    employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userID INT NOT NULL,
        role VARCHAR(255) NOT NULL,
        FOREIGN KEY (userID) REFERENCES users (id)
    );

-- Create table passwords
CREATE TABLE
    passwords (
        id INT PRIMARY KEY,
        password VARCHAR(255) NOT NULL,
        FOREIGN KEY (id) REFERENCES users (id)
    );

-- Create table employee_client
CREATE TABLE
    employee_client (
        clientID INT NOT NULL,
        employeeID INT NOT NULL,
        FOREIGN KEY (clientID) REFERENCES clients (id),
        FOREIGN KEY (employeeID) REFERENCES employees (id),
        PRIMARY KEY (clientID, employeeID)
    );

-- Create table topics
CREATE TABLE
    topics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        clientID INT NOT NULL,
        FOREIGN KEY (clientID) REFERENCES clients (id)
    );

-- Create table files
CREATE TABLE files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    driveFileId VARCHAR(255) NOT NULL,  
    uploaderID INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    status VARCHAR(255),
    remark VARCHAR(255),
    clientID INT NOT NULL,
    topicID INT,
    FOREIGN KEY (uploaderID) REFERENCES users (id),
    FOREIGN KEY (clientID) REFERENCES clients (id),
    FOREIGN KEY (topicID) REFERENCES topics (id)
);

-- Create table conversations
CREATE TABLE
    conversations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        clientID INT NOT NULL,
        FOREIGN KEY (clientID) REFERENCES clients (id)
    );

-- Create table messages
CREATE TABLE
    messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fileID INT,
        conversationID INT,
        content TEXT NOT NULL,
        FOREIGN KEY (fileID) REFERENCES files (id),
        FOREIGN KEY (conversationID) REFERENCES conversations (id)
    );
    -- Insert data into addresses
INSERT INTO
    addresses (street, city, zipcode)
VALUES
    ('רחוב 1', 'עיר 1', '12345'),
    ('רחוב 2', 'עיר 2', '23456'),
    ('רחוב 3', 'עיר 3', '34567'),
    ('רחוב 4', 'עיר 4', '45678'),
	('רחוב 4', 'עיר 4', '45678'),
    ('רחוב 4', 'עיר 4', '45678'),
    ('רחוב 4', 'עיר 4', '45678'),
    ('רחוב 4', 'עיר 4', '45678'),
    ('רחוב 4', 'עיר 4', '45678'),
    ('רחוב 4', 'עיר 4', '45678'),
    ('רחוב 5', 'עיר 5', '56789'),
	('רחוב 4', 'עיר 4', '45678'),
    ('רחוב 4', 'עיר 4', '45678'),
    ('רחוב 4', 'עיר 4', '45678'),
    ('רחוב 4', 'עיר 4', '45678'),
    ('רחוב 5', 'עיר 5', '56789');

INSERT INTO
    users (userName, name, email, phone, addressID)
VALUES
    ('Client1', 'Client 1', 'client1@example.com', '1234567890', 1),
    ('Client 2', 'Client 2', 'client2@example.com', '1234567891', 2),
    ('Client 3', 'Client 3', 'client3@example.com', '1234567892', 3),
    ('Client 4', 'Client 4', 'client4@example.com', '1234567893', 4),
    ('Client 5', 'Client 5', 'client5@example.com', '1234567894', 5),
    ('Client 6', 'Client 6', 'client6@example.com', '1234567895', 1),
    ('Client 7', 'Client 7', 'client7@example.com', '1234567896', 2),
    ('Client 8', 'Client 8', 'client8@example.com', '1234567897', 3),
    ('Client 9', 'Client 9', 'client9@example.com', '1234567898', 4),
    ('Client 10', 'Client 10', 'client10@example.com', '1234567899', 5),
    ('Employee 1', 'Employee 1', 'employee1@example.com', '0987654321', 6),
    ('Employee 2', 'Employee 2', 'employee2@example.com', '0987654322', 7),
    ('Employee 3', 'Employee 3', 'employee3@example.com', '0987654323', 8),
    ('Employee 4', 'Employee 4', 'employee4@example.com', '0987654324', 9),
    ('Employee 5', 'Employee 5', 'employee5@example.com', '0987654325', 10),
    ('Employee 6', 'Employee 6', 'employee6@example.com', '0987654326', 11),
    ('Employee 7', 'Employee 7', 'employee7@example.com', '0987654327', 12),
    ('Employee 8', 'Employee 8', 'employee8@example.com', '0987654328', 13),
    ('Employee 9', 'Employee 9', 'employee9@example.com', '0987654329', 14),
    ('Employee 10', 'Employee 10', 'employee10@example.com', '0987654330', 15);


-- Insert 10 rows into parent_client
INSERT INTO
    parent_client (name)
VALUES
    ('Parent Client 1'),
    ('Parent Client 2'),
    ('Parent Client 3'),
    ('Parent Client 4'),
    ('Parent Client 5'),
    ('Parent Client 6'),
    ('Parent Client 7'),
    ('Parent Client 8'),
    ('Parent Client 9'),
    ('Parent Client 10');

-- Insert data into clients
INSERT INTO
    clients (userID, parentClientID, isApproved, notes)
VALUES
    (1, 1, TRUE, 'Client 1 approved'),
    (2, 2, TRUE, 'Client 2 approved'),
    (3, 3, FALSE, 'Client 3 pending approval'),
    (4, 4, TRUE, 'Client 4 approved'),
    (5, 5, FALSE, 'Client 5 pending approval'),
    (6, 6, TRUE, 'Client 6 approved'),
    (7, 7, FALSE, 'Client 7 pending approval'),
    (8, 8, TRUE, 'Client 8 approved'),
    (9, 9, FALSE, 'Client 9 pending approval'),
    (10, 10, TRUE, 'Client 10 approved');

-- Insert data into employees
INSERT INTO
    employees (userID, role)
VALUES
    (11, 'Role 1'),
    (12, 'Role 2'),
    (13, 'Role 1'),
    (14, 'Role 1'),
    (15, 'Role 1'),
    (16, 'Role 2'),
    (17, 'Role 2'),
    (18, 'Admin'),
    (19, 'Admin'),
    (20, 'Admin');

-- Insert 20 rows into passwords
INSERT INTO
    passwords (id, password)
VALUES
    (
        1,
        '$2a$10$i/cwt/hlYfjw0tXchnmwPe9k56rtGu.B2LhPaiF6m4c22wnQtr.qK'
    ),
    (
        2,
        '$2a$10$h5C7DJoMV7Xuoa7MAuCva.H/mDz5aNo4EKUSI.kKpuzd0A60mULGS'
    ),
    (
        3,
        '$2a$10$GiQHNorjX6nnX5Kdwvbt3.Z5SEQI7oYeYwVBn6awKtWmDab3thvZS'
    ),
    (
        4,
        '$2a$10$KwM4OcRYS//wQVToN8ug8OWGirnbEsUYj/.ZcofcVr.PXdahVvOeS'
    ),
    (
        5,
        '$2a$10$uMpI0w0BE1e0hi9CrPc/nO2U2a9RDMxv4zVZducCGZb/WGUBMg9bu'
    ),
    (
        6,
        '$2a$10$rtVqChLqWZrGWMfNULS6/.s2wroiTKnT2PrJP2jHBlO031uyDcEoS'
    ),
    (
        7,
        '$2a$10$jSQvILuLIMaiNM75QlPthuKL9bU0ENVoKCpyRKcVJwbV5TvP2FVmK'
    ),
    (
        8,
        '$2a$10$zk/L/M2umtVziwkfKVO/aO.UTb1xIkbzL/EUpi9NH3YU38NQp22jO'
    ),
    (
        9,
        '$2a$10$i7WKk5ivAlMbVwj94WD4KOAgnqmpxyAgOkQ7oGK50nwlCQ74CSe2K'
    ),
    (
        10,
        '$2a$10$63RVEqjaXMINtC3jRwcafutjVwXY2KAl6EjjcFr3hLJzSxpZvIJee'
    ),
    (
        11,
        '$2a$10$fvhPkzi5enbsQPmsraHQQ.XWcc/fqu1AWh1uM4.vKFVLo8kFhM.0y'
    ),
    (
        12,
        '$2a$10$5f3QgTR53507Iknbok986eImEOhT2VFZKHGXarQyu5xYxGpyWmuSq'
    ),
    (
        13,
        '$2a$10$o68tTc5IYNRrDRgWscP7AetxlggLfOEhtwRSlB26OMhhfjBl1/I4C'
    ),
    (
        14,
        '$2a$10$xtvg9TKCk54dCStEYt9JVeYGlQYdah6/tq4mAXg1HVA34RPXW20ju'
    ),
    (
        15,
        '$2a$10$Q07zjsP24IGM/r5ba1GayumG7FEoHxzONCnEgPEtOIMSHTRw15HuC'
    ),
    (
        16,
        '$2a$10$.LuqRmG/ymYg4gdhugqLFu36zbTKvtuN32C6HNuYDm/6ZFRVPNtkW'
    ),
    (
        17,
        '$2a$10$xE97mGwmQ336IPCI73Po5elFjq4Ks0whkNKvu.agMubNyzMqvscui'
    ),
    (
        18,
        '$2a$10$omEaTPICnQHxsmSlvif7I.9/CaDU1Z2pAMN1obh.ayoVVKi0Z9zXW'
    ),
    (
        19,
        '$2a$10$Xd.9S5o.8tJXDNr5v/KaH.krc2WilPib3UrkiACKJqFgbFFM93omq'
    ),
    (
        20,
        '$2a$10$nU846P0.Gm37vI6BjlFqfe1cICXWgW6dTco0F5q5nqol/0Mx0TV1e'
    );

-- Insert 10 rows into employee_client
INSERT INTO
    employee_client (clientID, employeeID)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (1, 4),
    (2, 7),
    (3, 4),
    (4, 1),
    (5, 2),
    (6, 3),
    (7, 1),
    (8, 1),
    (9, 1),
    (10, 6);

-- Insert 10 rows into topics
INSERT INTO
    topics (name, clientID)
VALUES
    ('Topic 1', 1),
    ('Topic 2', 2),
    ('Topic 3', 3),
    ('Topic 4', 4),
    ('Topic 5', 5),
    ('Topic 6', 6),
    ('Topic 7', 7),
    ('Topic 8', 8),
    ('Topic 9', 9),
    ('Topic 10', 10);

-- Insert 10 rows into files
-- INSERT INTO
--     files (
--         uploaderID,
--         name,
--         type,
--         status,
--         remark,
--         clientID,
--         topicID
--     )
-- VALUES
--     (1, 'file1.pdf', 'pdf', 'התקבל', 'remark1', 1, 1),
--     (2, 'file2.pdf', 'pdf', 'התקבל', 'remark2', 2, 2),
--     (3, 'file3.pdf', 'pdf', 'התקבל', 'remark3', 3, 3),
--     (4, 'file4.pdf', 'pdf', 'התקבל', 'remark4', 4, 4),
--     (5, 'file5.pdf', 'pdf', 'התקבל', 'remark5', 5, 5),
--     (6, 'file6.pdf', 'pdf', 'התקבל', 'remark6', 6, 6),
--     (7, 'file7.pdf', 'pdf', 'התקבל', 'remark7', 7, 7),
--     (8, 'file8.pdf', 'pdf', 'התקבל', 'remark8', 8, 8),
--     (9, 'file9.pdf', 'pdf', 'התקבל', 'remark9', 9, 9),
--     (
--         10,
--         'file10.pdf',
--         'pdf',
--         'התקבל',
--         'remark10',
--         10,
--         10
--     );

-- Insert 10 rows into conversations
INSERT INTO
    conversations (title, content, clientID)
VALUES
    ('Conversation 1', 'Content 1', 1),
    ('Conversation 2', 'Content 2', 2),
    ('Conversation 3', 'Content 3', 3),
    ('Conversation 4', 'Content 4', 4),
    ('Conversation 5', 'Content 5', 5),
    ('Conversation 6', 'Content 6', 6),
    ('Conversation 7', 'Content 7', 7),
    ('Conversation 8', 'Content 8', 8),
    ('Conversation 9', 'Content 9', 9),
    ('Conversation 10', 'Content 10', 10);

-- Insert 10 rows into messages
INSERT INTO
    messages (fileID, conversationID, content)
VALUES
    -- (1, NULL, 'Message related to file 1'),
    -- (2, NULL, 'Message related to file 2'),
    -- (3, NULL, 'Message related to file 3'),
    -- (4, NULL, 'Message related to file 4'),
    -- (5, NULL, 'Message related to file 5'),
    (NULL, 1, 'Message related to conversation 1'),
    (NULL, 2, 'Message related to conversation 2'),
    (NULL, 3, 'Message related to conversation 3'),
    (NULL, 4, 'Message related to conversation 4'),
    (NULL, 5, 'Message related to conversation 5'),
    (NULL, 6, 'Message related to conversation 6'),
    (NULL, 7, 'Message related to conversation 7'),
    (NULL, 8, 'Message related to conversation 8'),
    (NULL, 9, 'Message related to conversation 9'),
    (NULL, 10, 'Message related to conversation 10');