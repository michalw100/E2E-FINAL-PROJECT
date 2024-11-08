-- MySQL dump 10.13  Distrib 8.3.0, for Win64 (x86_64)
--
-- Host: localhost    Database: CBS_DB
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `addressID` int NOT NULL AUTO_INCREMENT,
  `street` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  PRIMARY KEY (`addressID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'╫¿╫ק╫ץ╫ס 1','╫ó╫ש╫¿ 1','12345'),(2,'╫¿╫ק╫ץ╫ס 2','╫ó╫ש╫¿ 2','23456'),(3,'╫¿╫ק╫ץ╫ס 3','╫ó╫ש╫¿ 3','34567'),(4,'╫¿╫ק╫ץ╫ס 4','╫ó╫ש╫¿ 4','45678'),(5,'╫¿╫ק╫ץ╫ס 4','╫ó╫ש╫¿ 4','45678'),(6,'╫¿╫ק╫ץ╫ס 4','╫ó╫ש╫¿ 4','45678'),(7,'╫¿╫ק╫ץ╫ס 4','╫ó╫ש╫¿ 4','45678'),(8,'╫¿╫ק╫ץ╫ס 4','╫ó╫ש╫¿ 4','45678'),(9,'╫¿╫ק╫ץ╫ס 4','╫ó╫ש╫¿ 4','45678'),(10,'╫¿╫ק╫ץ╫ס 4','╫ó╫ש╫¿ 4','45678'),(11,'╫¿╫ק╫ץ╫ס 5','╫ó╫ש╫¿ 5','56789'),(12,'╫¿╫ק╫ץ╫ס 4','╫ó╫ש╫¿ 4','45678'),(13,'╫¿╫ק╫ץ╫ס 4','╫ó╫ש╫¿ 4','45678'),(14,'╫¿╫ק╫ץ╫ס 4','╫ó╫ש╫¿ 4','45678'),(15,'╫¿╫ק╫ץ╫ס 4','╫ó╫ש╫¿ 4','45678'),(16,'╫¿╫ק╫ץ╫ס 5','╫ó╫ש╫¿ 5','56789');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fileID` int DEFAULT NULL,
  `userID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fileID` (`fileID`),
  KEY `userID` (`userID`),
  CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`fileID`) REFERENCES `files` (`id`),
  CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `parentClientID` int DEFAULT NULL,
  `isApproved` tinyint(1) DEFAULT '0',
  `notes` text,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `parentClientID` (`parentClientID`),
  CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  CONSTRAINT `clients_ibfk_2` FOREIGN KEY (`parentClientID`) REFERENCES `parent_client` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,1,1,1,'Client 1 approved'),(2,2,2,1,'Client 2 approved'),(3,3,3,0,'Client 3 pending approval'),(4,4,4,1,'Client 4 approved'),(5,5,5,0,'Client 5 pending approval'),(6,6,6,1,'Client 6 approved'),(7,7,7,0,'Client 7 pending approval'),(8,8,8,1,'Client 8 approved'),(9,9,9,0,'Client 9 pending approval'),(10,10,10,1,'Client 10 approved');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_client`
--

DROP TABLE IF EXISTS `employee_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_client` (
  `clientID` int NOT NULL,
  `employeeID` int NOT NULL,
  PRIMARY KEY (`clientID`,`employeeID`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `employee_client_ibfk_1` FOREIGN KEY (`clientID`) REFERENCES `clients` (`id`),
  CONSTRAINT `employee_client_ibfk_2` FOREIGN KEY (`employeeID`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_client`
--

LOCK TABLES `employee_client` WRITE;
/*!40000 ALTER TABLE `employee_client` DISABLE KEYS */;
INSERT INTO `employee_client` VALUES (1,1),(4,1),(7,1),(8,1),(9,1),(2,2),(5,2),(3,3),(6,3),(1,4),(3,4),(4,4),(5,5),(6,6),(10,6),(2,7);
/*!40000 ALTER TABLE `employee_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,11,'Role 1'),(2,12,'Role 2'),(3,13,'Role 1'),(4,14,'Role 1'),(5,15,'Role 1'),(6,16,'Role 2'),(7,17,'Role 2'),(8,18,'Admin'),(9,19,'Admin'),(10,20,'Admin');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `driveFileId` varchar(255) NOT NULL,
  `uploaderID` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `clientID` int NOT NULL,
  `topicID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uploaderID` (`uploaderID`),
  KEY `clientID` (`clientID`),
  KEY `topicID` (`topicID`),
  CONSTRAINT `files_ibfk_1` FOREIGN KEY (`uploaderID`) REFERENCES `users` (`id`),
  CONSTRAINT `files_ibfk_2` FOREIGN KEY (`clientID`) REFERENCES `clients` (`id`),
  CONSTRAINT `files_ibfk_3` FOREIGN KEY (`topicID`) REFERENCES `topics` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,'11cFzXz3fpYoTv9ntg13SjZjrLqv7yVop',4,'2024-07-01 12:25:42','2024-07-01 12:25:42','╫ñ╫ש╫צ╫ש╫º╫פ-6--2- (2).pdf','Material for an annual report','Absorbed',NULL,4,NULL),(2,'16VLPeMa_l9iwBqO4-lBoVEjdJ-onmcsH',4,'2024-07-01 12:25:45','2024-07-01 12:25:45','╫₧╫ס╫ק╫ƒ-╫ñ╫í╫ש╫¢╫ץ╫ר╫¢╫á╫ש-╫£╫ף╫ץ╫ע╫₧╫פ (1).pdf','Material for an annual report','Absorbed',NULL,4,NULL),(3,'1mGg-B_Xo3em2AE9lmJyU7FiYwqlREe6d',4,'2024-07-01 12:25:47','2024-07-01 12:25:47','╫ñ╫ש╫צ╫ש╫º╫פ-6--2- (1).pdf','Material for an annual report','Absorbed',NULL,4,NULL),(4,'1K-3PJj1XubJKA5VaRjc8mjxNOnZS3P6T',4,'2024-07-01 12:25:50','2024-07-01 12:25:50','╫ñ╫ש╫צ╫ש╫º╫פ-6--2-.pdf','Material for an annual report','Absorbed',NULL,4,NULL),(5,'1JqKzXyw9lFBKfZIJtM7_WbUt7H27sNdL',4,'2024-07-01 12:25:53','2024-07-01 12:25:53','╫₧╫ס╫ק╫ƒ-╫ñ╫í╫ש╫¢╫ץ╫ר╫¢╫á╫ש-╫£╫ף╫ץ╫ע╫₧╫פ.pdf','Material for an annual report','Absorbed',NULL,4,NULL),(6,'1NDDpz1M5mzmwuQssZvn1zBcHYdZzss9y',4,'2024-07-01 12:25:54','2024-07-01 12:27:29','03190127_326336310_6824_070620241248 (1).pdf','Material for an annual report','Accepted',NULL,4,NULL),(7,'1ZzuFu4ngDWgr8vL4G7jyl4I9v80NxeJL',4,'2024-07-01 12:26:03','2024-07-01 12:26:03','╫ñ╫ש╫צ╫ש╫º╫פ 6 (1).pdf','Current material for accounting','Absorbed',NULL,4,NULL),(8,'1FJif3GySJTfJcJagOEU1RvZn-QKASzVO',4,'2024-07-01 12:26:07','2024-07-01 12:26:07','╫ñ╫ש╫צ╫ש╫º╫פ 6.pdf','Current material for accounting','Absorbed',NULL,4,NULL),(9,'1JSTZ_wchM0sa6H8pdxWRkSp45L3WOcfU',4,'2024-07-01 12:26:09','2024-07-01 12:26:09','Job_Interview_Questions_1662643353_240621_142240.pdf','Current material for accounting','Absorbed',NULL,4,NULL),(10,'1lW0xeHtR1bPsmy74HOcIxHKtJOkW26E6',4,'2024-07-01 12:26:14','2024-07-01 12:26:14','╫ñ╫ש╫צ╫ש╫º╫פ 5 (1) (1).pdf','Current material for accounting','Absorbed',NULL,4,NULL),(11,'1SPDOupo_cAwEMSlqKK9tNGrxt6dhkKCj',11,'2024-07-01 12:27:16','2024-07-01 12:27:34','╫₧╫ס╫ק╫ƒ-╫ñ╫í╫ש╫¢╫ץ╫ר╫¢╫á╫ש-╫£╫ף╫ץ╫ע╫₧╫פ.pdf','Material for an annual report','Postponed',NULL,4,NULL),(12,'1MYFU-IdyWoc1bRjVkDZku28nn37tKxFt',11,'2024-07-01 12:27:18','2024-07-01 12:27:18','03190127_326336310_6824_070620241248 (1).pdf','Material for an annual report','Absorbed',NULL,4,NULL);
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent_client`
--

DROP TABLE IF EXISTS `parent_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parent_client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent_client`
--

LOCK TABLES `parent_client` WRITE;
/*!40000 ALTER TABLE `parent_client` DISABLE KEYS */;
INSERT INTO `parent_client` VALUES (1,'Parent Client 1'),(2,'Parent Client 2'),(3,'Parent Client 3'),(4,'Parent Client 4'),(5,'Parent Client 5'),(6,'Parent Client 6'),(7,'Parent Client 7'),(8,'Parent Client 8'),(9,'Parent Client 9'),(10,'Parent Client 10');
/*!40000 ALTER TABLE `parent_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passwords`
--

DROP TABLE IF EXISTS `passwords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passwords` (
  `id` int NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `passwords_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passwords`
--

LOCK TABLES `passwords` WRITE;
/*!40000 ALTER TABLE `passwords` DISABLE KEYS */;
INSERT INTO `passwords` VALUES (1,'$2a$10$i/cwt/hlYfjw0tXchnmwPe9k56rtGu.B2LhPaiF6m4c22wnQtr.qK'),(2,'$2a$10$h5C7DJoMV7Xuoa7MAuCva.H/mDz5aNo4EKUSI.kKpuzd0A60mULGS'),(3,'$2a$10$GiQHNorjX6nnX5Kdwvbt3.Z5SEQI7oYeYwVBn6awKtWmDab3thvZS'),(4,'$2a$10$KwM4OcRYS//wQVToN8ug8OWGirnbEsUYj/.ZcofcVr.PXdahVvOeS'),(5,'$2a$10$uMpI0w0BE1e0hi9CrPc/nO2U2a9RDMxv4zVZducCGZb/WGUBMg9bu'),(6,'$2a$10$rtVqChLqWZrGWMfNULS6/.s2wroiTKnT2PrJP2jHBlO031uyDcEoS'),(7,'$2a$10$jSQvILuLIMaiNM75QlPthuKL9bU0ENVoKCpyRKcVJwbV5TvP2FVmK'),(8,'$2a$10$zk/L/M2umtVziwkfKVO/aO.UTb1xIkbzL/EUpi9NH3YU38NQp22jO'),(9,'$2a$10$i7WKk5ivAlMbVwj94WD4KOAgnqmpxyAgOkQ7oGK50nwlCQ74CSe2K'),(10,'$2a$10$63RVEqjaXMINtC3jRwcafutjVwXY2KAl6EjjcFr3hLJzSxpZvIJee'),(11,'$2a$10$fvhPkzi5enbsQPmsraHQQ.XWcc/fqu1AWh1uM4.vKFVLo8kFhM.0y'),(12,'$2a$10$5f3QgTR53507Iknbok986eImEOhT2VFZKHGXarQyu5xYxGpyWmuSq'),(13,'$2a$10$o68tTc5IYNRrDRgWscP7AetxlggLfOEhtwRSlB26OMhhfjBl1/I4C'),(14,'$2a$10$xtvg9TKCk54dCStEYt9JVeYGlQYdah6/tq4mAXg1HVA34RPXW20ju'),(15,'$2a$10$Q07zjsP24IGM/r5ba1GayumG7FEoHxzONCnEgPEtOIMSHTRw15HuC'),(16,'$2a$10$.LuqRmG/ymYg4gdhugqLFu36zbTKvtuN32C6HNuYDm/6ZFRVPNtkW'),(17,'$2a$10$xE97mGwmQ336IPCI73Po5elFjq4Ks0whkNKvu.agMubNyzMqvscui'),(18,'$2a$10$omEaTPICnQHxsmSlvif7I.9/CaDU1Z2pAMN1obh.ayoVVKi0Z9zXW'),(19,'$2a$10$Xd.9S5o.8tJXDNr5v/KaH.krc2WilPib3UrkiACKJqFgbFFM93omq'),(20,'$2a$10$nU846P0.Gm37vI6BjlFqfe1cICXWgW6dTco0F5q5nqol/0Mx0TV1e');
/*!40000 ALTER TABLE `passwords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `clientID` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `clientID` (`clientID`),
  CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`clientID`) REFERENCES `clients` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `addressID` int DEFAULT NULL,
  `streamToken` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userName` (`userName`),
  KEY `addressID` (`addressID`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`addressID`) REFERENCES `addresses` (`addressID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Client1','Client 1','client1@example.com','1234567890',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci00In0.fEKU1XglcDcdXHKf6OL-'),(2,'Client 2','Client 2','client2@example.com','1234567891',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci0yIn0.81erpPi88IvI_mJdv8TGrDaduKD2A9pXpV17QleJ9QQ'),(3,'Client 3','Client 3','client3@example.com','1234567892',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci0zIn0.FGNo3Zbvocxw7fRp0yTJ7hstLSnrl4DTXn-_dKksqFo'),(4,'Client 4','Client 4','client4@example.com','1234567893',4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci00In0.fEKU1XglcDcdXHKf6OL-3LkNwK9CUjioTuej84639GE'),(5,'Client 5','Client 5','client5@example.com','1234567894',5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci01In0.lddw7yhTkwnylUnk82zjx43M20pSuoHKSIpEIqFFxDI'),(6,'Client 6','Client 6','client6@example.com','1234567895',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci02In0.hB2mW7_OficCI2JaDlxB_iBQ3MoGt6RuHiQa0kmwOwI'),(7,'Client 7','Client 7','client7@example.com','1234567896',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci03In0._yCPiL-q3nvMRzPg1ttYYShjDSHmDMamPYs5TlFjXbE'),(8,'Client 8','Client 8','client8@example.com','1234567897',3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci04In0.MFmpXLPbJ_NdGVU9HNIeOTFpCpVgQiPfptS6FSlWPe4'),(9,'Client 9','Client 9','client9@example.com','1234567898',4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci05In0.TBgCGHwJ6XjA9dRZqM3ZO1Q7LC-3y2IROtHojA47Pb0'),(10,'Client 10','Client 10','client10@example.com','1234567899',5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci0xMCJ9.5hE1cob5SwcwL053UIfzDV6ukjt3C6i3dUs-lRQMIO0'),(11,'Employee 1','Employee 1','employee1@example.com','0987654321',6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci0xMSJ9.DyIfGWKeoHdz7sC4Oh0yya_N5-YRgkrGVILAgxl_164'),(12,'Employee 2','Employee 2','employee2@example.com','0987654322',7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci0xMiJ9.Whw6y_ujCmrhrkCpm1xGFcNajgzGNFOvrFJ18td7stM'),(13,'Employee 3','Employee 3','employee3@example.com','0987654323',8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci0xMyJ9.Beg4rR2pldDP_lldZIdhw0_gI8Uo8RSo4vIKQHotCW4'),(14,'Employee 4','Employee 4','employee4@example.com','0987654324',9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci0xNCJ9.34Fflof0MnBiDe7qWuhPN5f2BKDJz0Oi0RnCeERvMmM'),(15,'Employee 5','Employee 5','employee5@example.com','0987654325',10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci0xNSJ9.d4n1W5AfW3ECKPvmU5ut4ZGW3mZf-lgoij92cDxizOY'),(16,'Employee 6','Employee 6','employee6@example.com','0987654326',11,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci0xNiJ9.aj4Q03s9EtbP6OB3astXAHrZdKpQnVQyc2nhVxKwo1k'),(17,'Employee 7','Employee 7','employee7@example.com','0987654327',12,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci0xNyJ9.nK9Y3MQSoMjPHrW9Taa29_G0uv3lxh6XHUf9kJ0Wl-Q'),(18,'Employee 8','Employee 8','employee8@example.com','0987654328',13,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci0xOCJ9.MyyGBFqWBZi2c1Id70LtBHfUouhsPQbs_5gfzwW8sM4'),(19,'Employee 9','Employee 9','employee9@example.com','0987654329',14,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci0xOSJ9.7ZFDVvqivtGUgZRb7bRlU1hFrBGHhAvPoBF1QhnRhJ0'),(20,'Employee 10','Employee 10','employee10@example.com','0987654330',15,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci0yMCJ9.ZPQLpRtbJp5xwgrIpQYmlUllTrUyKpdZtwXakdut9Ys');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-01 15:29:21
