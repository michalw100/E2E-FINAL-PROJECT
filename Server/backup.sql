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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,1,1,1,'Client 1 approved'),(2,2,2,1,'Client 2 approved'),(3,3,3,0,'Client 3 pending approval'),(4,4,4,1,'Client 4 approved'),(5,5,5,0,'Client 5 pending approval'),(6,6,6,1,'Client 6 approved'),(7,7,7,0,'Client 7 pending approval'),(8,8,8,1,'Client 8 approved'),(9,9,9,0,'Client 9 pending approval'),(10,10,10,1,'Client 10 approved'),(11,21,NULL,0,NULL);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `clientID` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `clientID` (`clientID`),
  CONSTRAINT `conversations_ibfk_1` FOREIGN KEY (`clientID`) REFERENCES `clients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES (1,'Conversation 1','Content 1',1),(2,'Conversation 2','Content 2',2),(3,'Conversation 3','Content 3',3),(4,'Conversation 4','Content 4',4),(5,'Conversation 5','Content 5',5),(6,'Conversation 6','Content 6',6),(7,'Conversation 7','Content 7',7),(8,'Conversation 8','Content 8',8),(9,'Conversation 9','Content 9',9),(10,'Conversation 10','Content 10',10);
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
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
INSERT INTO `employee_client` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(1,8),(2,8),(3,8),(4,8),(5,8),(6,8),(8,8),(9,9),(10,10);
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
  `status` varchar(255) DEFAULT '╫פ╫¬╫º╫ס╫£',
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
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,'1JjVrVIKqNCWZytxIVJuy2oUSuAn3yrlT',11,'2024-06-10 11:23:33','2024-06-10 11:23:33','DD.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,1,NULL),(3,'1ARj5o0ytTEnjcMujH8H5zn--A5V2Kn8d',11,'2024-06-10 11:28:46','2024-06-10 11:28:46','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(4,'1v63YOrvWQwJGfcdyCai_NH_-nevyLHG-',11,'2024-06-10 11:32:37','2024-06-10 11:32:37','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(5,'1MST-zvh2NmMWE1GoTO4ewfIeAAJPRaiT',11,'2024-06-10 12:06:51','2024-06-10 12:06:51','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(6,'19MpvOUEZUXKp5ENjNnUtetxmMah6r0yB',11,'2024-06-10 12:07:43','2024-06-10 12:07:43','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(7,'1-Z1h3NH1THeePAHKtDZ_yoLL7vKEL6o2',11,'2024-06-10 12:52:24','2024-06-10 12:52:24','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(8,'1b41DJ3wOaBBDXiL6TeNA8MdUWq2g06gs',11,'2024-06-10 12:52:26','2024-06-10 12:52:26','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(9,'1-GJmE9lUp3yH5aA6SszL8Te8cWpvChRY',11,'2024-06-10 12:52:42','2024-06-10 12:52:42','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(10,'14qKb0a7lLJSqKm8nqbL1WnyeQZP7SzAj',11,'2024-06-10 12:53:00','2024-06-10 12:53:00','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(11,'122rRV9l73oy6pP6fTc_ZyPTLLZpsVTI-',11,'2024-06-10 12:53:02','2024-06-10 12:53:02','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(12,'1W6IsN2_x-2g-i3f1MUSieGILgP3prnhN',11,'2024-06-10 12:53:07','2024-06-10 12:53:07','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(13,'17sanRHL02sdB-SkgWy4sXh7CRH-ETVNm',11,'2024-06-10 12:53:33','2024-06-10 12:53:33','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(14,'1lFAc5sFhIkn99xiZvusPSwauvTgkmEbF',11,'2024-06-10 12:53:36','2024-06-10 12:53:36','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(15,'1qxD524IGKl8ws0fUoAjU9NqxL7BQTXYr',11,'2024-06-10 12:53:40','2024-06-10 12:53:40','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(16,'1dOm7Udl_28zRHVV71tO1mVQMLnqOqDyt',11,'2024-06-10 12:53:51','2024-06-10 12:53:51','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(17,'1HKCUQ7RE-3a-oHf5Gvm9IeNNxUZzi5EH',11,'2024-06-10 12:54:08','2024-06-10 12:54:08','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(18,'1UTKlT98OwBk-HpKkKpIFUm0pwuh8kttR',11,'2024-06-10 12:54:10','2024-06-10 12:54:10','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(19,'1EWoxWH-wxaJpNrW3RL22yPyUOwnMOjCD',1,'2024-06-10 14:24:14','2024-06-10 14:24:14','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(20,'11tNSJ5GpI--30fft0GLXSJw5lMfaP4gG',1,'2024-06-10 14:25:20','2024-06-10 14:25:20','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(21,'19aCMpk7dcc0jCVLPsiCODoxSF6Sk7ZCY',1,'2024-06-10 14:25:25','2024-06-10 14:25:25','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(22,'1Z15lg5Inc5x7c1pR3VK3FbvarWvLi3yB',1,'2024-06-10 14:35:18','2024-06-10 14:35:18','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(23,'1c1TYg3lIfLUmV4aWz1cuZCcONUPxYDkE',1,'2024-06-10 14:44:12','2024-06-10 14:44:12','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(24,'1WEGCJxWl8jo_ej3AhU6fI3KwLmD_gtgt',1,'2024-06-10 14:54:11','2024-06-10 14:54:11','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(25,'1Fp0HIDezLr6FB5Xw2W1FbqW-L4Ou4xoB',1,'2024-06-10 15:35:09','2024-06-10 15:35:09','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(26,'1qHWwAez0UgNm41-V_w-Boe8RREjwNG-Y',1,'2024-06-10 15:44:44','2024-06-10 15:44:44','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,5,NULL),(27,'1UvMJ_QNpX05tcE4mke8lUD7KtPZ52Tf0',4,'2024-06-10 16:40:28','2024-06-12 23:53:00','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£','╫⌐╫ש╫¿╫פ╫פ╫פBIOBIO╫פ╫פ╫פ╫פ╫פ╫פ╫ץ╫פ╫á',4,NULL),(28,'1Xwbyuf4LOHdQzSkLF1Iap9VGZf6mb4IV',4,'2024-06-10 16:43:52','2024-06-12 23:40:25','DD.pdf','application/pdf','╫פ╫¬╫º╫ס╫£','',4,NULL),(29,'1MWSDH06N1jvxeiphQhF08PlCL49qHDd_',7,'2024-06-10 19:24:20','2024-06-10 19:24:20','DD (1).pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,7,NULL),(30,'1_hKtVdN3xWGtNKJa-ETyfCpSyRXfz8qU',7,'2024-06-10 19:24:38','2024-06-10 19:24:38','tofes-101 (2).pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,7,NULL),(31,'1_XL0PyY1eLMR3Inxqu83B9I8dqbQqHow',3,'2024-06-10 19:25:34','2024-06-10 19:25:34','tofes-101 (2).pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,3,NULL),(32,'1zVmx3jcsjSWWKMiR0HHUYK16ePCL6mfd',3,'2024-06-10 19:25:43','2024-06-10 19:25:43','DD (1).pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,3,NULL),(33,'1UGMVm9bQtmX-sNWCXrUlS7Tx0kfLrkue',4,'2024-06-10 19:46:52','2024-06-12 23:50:28','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£','ccvuivui╫פ╫á╫ƒ',4,NULL),(34,'1mkrDm4cO4bHSFLLYaiUc1CfVM9tE37J9',4,'2024-06-10 19:46:54','2024-06-12 23:50:19','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',' ╫ץ╫פ ╫ץ╫á╫ƒ╫¥╫á╫ƒ╫¥',4,NULL),(35,'14NwQdR8UEV4iMOsXBMyHW0SaA8uzr_yF',4,'2024-06-10 19:48:26','2024-06-12 23:50:25','DD (1).pdf','application/pdf','╫פ╫¬╫º╫ס╫£','╫פ╫ץ╫ץ╫ƒ╫ש╫ƒ╫¥╫ק╫¥╫ñ',4,NULL),(36,'1brBL3OCk6XYsiYgRWvnVwF1gFyZ7lX-U',4,'2024-06-10 20:27:11','2024-06-10 20:27:11','DD (1).pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,4,NULL),(37,'1Y03FyIOc384MuUvVW2A95ygZpjpJlhzh',4,'2024-06-10 20:27:13','2024-06-10 20:27:13','tofes-101 (3).pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,4,NULL),(38,'1PVFyh61qUruoplc4Qn5mwAC3JYvGER36',4,'2024-06-10 20:29:10','2024-06-10 20:29:10','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,4,NULL),(39,'1kHmturRFaTQJeiHA4LkqO1hLzdDL8IYH',4,'2024-06-10 20:30:22','2024-06-10 20:30:22','├ק┬ñ├ק┬ש├ק┬צ├ק┬ש├ק┬º├ק┬פ 4.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,4,NULL),(40,'1hk1gJUoWUft9datIqmju7s6Eua4z2a_J',4,'2024-06-10 20:31:28','2024-06-10 20:31:28','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,4,NULL),(41,'1PBSjRmms2MWW-I7xdSCOxXTyB5pHNbAS',4,'2024-06-10 20:32:01','2024-06-10 20:32:01','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,4,NULL),(42,'1LNYbvZt1AmSevWmEjOZPUTUBHtpmIkeU',4,'2024-06-10 20:34:35','2024-06-10 20:34:35','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,4,NULL),(43,'1DIB7fVG7n9u1yDDA1osAf1GXwqB6vzwh',4,'2024-06-10 20:35:35','2024-06-10 20:35:35','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,4,NULL),(44,'1d_qbEhI7PP0uBdR_ep9UgjM96xOddvIi',4,'2024-06-10 20:36:13','2024-06-10 20:36:13','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,4,NULL),(45,'1_ouJxmQwo-5-idRWCN5C4uj5VmbdkNX7',4,'2024-06-10 20:36:52','2024-06-10 20:36:52','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,4,NULL),(46,'11mWQgicTAhnLbooG9YyTHYid4aL2eG0v',4,'2024-06-10 20:37:09','2024-06-10 20:37:09','tofes-101.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,4,NULL),(47,'1STMYhc-63V29pynqvvVuwmklh3rF_lrp',4,'2024-06-10 20:37:44','2024-06-10 20:37:44','notebook (8).pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,4,NULL),(48,'12YjMqfpoPQScVsegcqOiKxYwtq8buQb6',4,'2024-06-10 20:52:16','2024-06-10 20:52:16','Scan_0009.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,4,NULL),(49,'1-NjtwLJ0Si1FfaZjvZyLJBCusSVQzIxE',4,'2024-06-10 20:52:20','2024-06-10 20:52:20','├ק┬₧├ק┬ס├ק┬ק├ק┬ƒ ├ק┬¢├ק┬£├ק┬⌐├ק┬פ├ק┬ץ.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,4,NULL),(50,'1ops6kZk9mJvFSeJcEduGg39yBr0l4cpm',2,'2024-06-10 21:03:19','2024-06-10 21:03:19','notebook (6).pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,2,NULL),(51,'1SWmjyrEFgjtAlYMpK4lKdX4Wn7C5J2wn',2,'2024-06-10 21:05:43','2024-06-10 21:05:43','file_27.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,2,NULL),(52,'1wpUdgpajq9AvWXJxggr_LFtW3M28P-Oh',2,'2024-06-10 21:08:55','2024-06-10 21:08:55','DB2020A_3.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,2,NULL),(53,'1JHtqo79n_Tn56r7LpK9vS6V2qhA1w3dc',2,'2024-06-10 21:10:35','2024-06-10 21:10:35','tofes-101 (3).pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,2,NULL),(54,'17RF0dAwqkil-1WMtAx81vEIb9pcPj7XO',2,'2024-06-10 21:12:18','2024-06-10 21:12:18','file_27.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,2,NULL),(55,'1ZdF-e6ELEQPBQxIQHuDRrRg2w8gPgFvm',18,'2024-06-10 21:34:22','2024-06-10 21:34:22','tofes-101 (1).pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,2,NULL),(56,'1KdqdR1THDC4MOnZNoK_kbrtHHlG0FTu8',18,'2024-06-12 18:23:58','2024-06-12 18:23:58','file_27.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,2,NULL),(57,'17HiqcpkUAQffPEKGHc7Nc7TCiByaqGfc',18,'2024-06-12 18:24:23','2024-06-12 18:24:23','examplefile.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,2,NULL),(58,'1VGmEKQOieyFoUwOT3IJFNmgqgn4Jtgzr',4,'2024-06-12 18:26:11','2024-06-12 18:26:11','tofes-101 (1).pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,4,NULL),(59,'1BO9hYSlXaPDJe1_nzSXT5NItD2MV-mLQ',18,'2024-06-12 18:27:06','2024-06-12 18:27:06','├ק┬ª├ק┬ש├ק┬ñ├ק┬ש ├ק┬ס├ק┬¿├ק┬º├ק┬₧├ק┬ƒ 212796759.pdf','application/pdf','╫פ╫¬╫º╫ס╫£',NULL,6,NULL),(60,'1VxB47XEHxOIlObENXDMkNLpCxPbuQe-e',4,'2024-06-12 19:40:35','2024-06-12 19:40:35','file_27.pdf','application/pdf','Accepted',NULL,4,NULL),(61,'10-RiD4kpGHX_E27lc1J0DJQzcRhNYjuh',4,'2024-06-12 19:40:36','2024-06-12 19:40:36','file_27.pdf','application/pdf','Accepted',NULL,4,NULL),(62,'11-P0WcMfM4RxZrfi5Xv94BPp3GS2xGpW',4,'2024-06-12 19:40:38','2024-06-12 19:40:38','examplefile.pdf','application/pdf','Accepted',NULL,4,NULL),(63,'10oeivcwV_quFq1tgPReK3GV7VdcgoY1h',18,'2024-06-12 20:48:57','2024-06-12 20:48:57','├ק┬ñ├ק┬ש├ק┬צ├ק┬ש├ק┬º├ק┬פ 5.pdf','application/pdf','Accepted',NULL,3,NULL),(64,'1hmBcm6u1m-P_00ukvHQWpxY-wQ-_Bk_e',4,'2024-06-12 20:49:37','2024-06-12 20:49:37','├ק┬ñ├ק┬ש├ק┬צ├ק┬ש├ק┬º├ק┬פ 5.pdf','application/pdf','Accepted',NULL,4,NULL),(65,'1DutMkVIKMaqnn3jTnAUlu4nARAxhQq8o',4,'2024-06-12 20:51:04','2024-06-12 20:51:04','notebook (6) (1).pdf','application/pdf','Accepted',NULL,4,NULL),(66,'1OMlz6SUgW5-iIohk6ELZjkgSvALs5v0x',4,'2024-06-12 20:52:11','2024-06-12 20:52:11','DD (2).pdf','application/pdf','Accepted',NULL,4,NULL),(67,'1kOpB2wSqiGcZhlnf0VbAC33uAg_cbrlZ',18,'2024-06-12 20:52:56','2024-06-12 20:52:56','├ק┬ñ├ק┬ש├ק┬צ├ק┬ש├ק┬º├ק┬פ 5.pdf','application/pdf','Accepted',NULL,6,NULL),(68,'1rTwoha6K0BZVKUjEH2LWLS-LmaVKeYt8',18,'2024-06-12 20:54:21','2024-06-12 20:54:21','DD (2).pdf','application/pdf','Accepted',NULL,6,NULL),(69,'18jx8K9bdvtuJ7Kit00KnxAwqNQ2-ovru',4,'2024-06-12 20:58:30','2024-06-12 20:58:30','├ד┬ק├ג┬ª├ד┬ק_├ד┬ק├ג┬ñ├ד┬ק_ ├ד┬ק_├ד┬ק├ג┬¿├ד┬ק├ג┬º├ד┬ק_├ד┬ק_ 212796759.pdf','application/pdf','Accepted',NULL,4,NULL),(70,'1p3rl6MHOdCsyJX5Fek4JgxQpmOZrDx7g',4,'2024-06-12 20:59:31','2024-06-12 20:59:31','DD (1).pdf','application/pdf','Accepted',NULL,4,NULL),(71,'1H-r_5Bhmu9Lxsixo6PN_DHveoJQDNpC7',4,'2024-06-12 21:05:02','2024-06-12 21:05:02','notebook (6) (1).pdf','application/pdf','Accepted',NULL,4,NULL),(72,'14iMI1ff4755g1CkDMEOZ2xigSJyHwX8S',4,'2024-06-12 21:07:13','2024-06-12 21:07:13','├ק┬¬├ק┬⌐├ק┬ñ├ק┬ס ├ק┬ס ├ק┬נ 0 ├ק┬₧├ק┬ó├ק┬ץ├ק┬¿├ק┬ס├ק┬£.pdf','application/pdf','Accepted',NULL,4,NULL);
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fileID` int DEFAULT NULL,
  `conversationID` int DEFAULT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fileID` (`fileID`),
  KEY `conversationID` (`conversationID`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`fileID`) REFERENCES `files` (`id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`conversationID`) REFERENCES `conversations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,NULL,1,'Message related to conversation 1'),(2,NULL,2,'Message related to conversation 2'),(3,NULL,3,'Message related to conversation 3'),(4,NULL,4,'Message related to conversation 4'),(5,NULL,5,'Message related to conversation 5'),(6,NULL,6,'Message related to conversation 6'),(7,NULL,7,'Message related to conversation 7'),(8,NULL,8,'Message related to conversation 8'),(9,NULL,9,'Message related to conversation 9'),(10,NULL,10,'Message related to conversation 10');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
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
INSERT INTO `passwords` VALUES (1,'$2a$10$i/cwt/hlYfjw0tXchnmwPe9k56rtGu.B2LhPaiF6m4c22wnQtr.qK'),(2,'$2a$10$h5C7DJoMV7Xuoa7MAuCva.H/mDz5aNo4EKUSI.kKpuzd0A60mULGS'),(3,'$2a$10$GiQHNorjX6nnX5Kdwvbt3.Z5SEQI7oYeYwVBn6awKtWmDab3thvZS'),(4,'$2a$10$KwM4OcRYS//wQVToN8ug8OWGirnbEsUYj/.ZcofcVr.PXdahVvOeS'),(5,'$2a$10$uMpI0w0BE1e0hi9CrPc/nO2U2a9RDMxv4zVZducCGZb/WGUBMg9bu'),(6,'$2a$10$rtVqChLqWZrGWMfNULS6/.s2wroiTKnT2PrJP2jHBlO031uyDcEoS'),(7,'$2a$10$jSQvILuLIMaiNM75QlPthuKL9bU0ENVoKCpyRKcVJwbV5TvP2FVmK'),(8,'$2a$10$zk/L/M2umtVziwkfKVO/aO.UTb1xIkbzL/EUpi9NH3YU38NQp22jO'),(9,'$2a$10$i7WKk5ivAlMbVwj94WD4KOAgnqmpxyAgOkQ7oGK50nwlCQ74CSe2K'),(10,'$2a$10$63RVEqjaXMINtC3jRwcafutjVwXY2KAl6EjjcFr3hLJzSxpZvIJee'),(11,'$2a$10$fvhPkzi5enbsQPmsraHQQ.XWcc/fqu1AWh1uM4.vKFVLo8kFhM.0y'),(12,'$2a$10$5f3QgTR53507Iknbok986eImEOhT2VFZKHGXarQyu5xYxGpyWmuSq'),(13,'$2a$10$o68tTc5IYNRrDRgWscP7AetxlggLfOEhtwRSlB26OMhhfjBl1/I4C'),(14,'$2a$10$xtvg9TKCk54dCStEYt9JVeYGlQYdah6/tq4mAXg1HVA34RPXW20ju'),(15,'$2a$10$Q07zjsP24IGM/r5ba1GayumG7FEoHxzONCnEgPEtOIMSHTRw15HuC'),(16,'$2a$10$.LuqRmG/ymYg4gdhugqLFu36zbTKvtuN32C6HNuYDm/6ZFRVPNtkW'),(17,'$2a$10$xE97mGwmQ336IPCI73Po5elFjq4Ks0whkNKvu.agMubNyzMqvscui'),(18,'$2a$10$omEaTPICnQHxsmSlvif7I.9/CaDU1Z2pAMN1obh.ayoVVKi0Z9zXW'),(19,'$2a$10$Xd.9S5o.8tJXDNr5v/KaH.krc2WilPib3UrkiACKJqFgbFFM93omq'),(20,'$2a$10$nU846P0.Gm37vI6BjlFqfe1cICXWgW6dTco0F5q5nqol/0Mx0TV1e'),(21,'$2b$10$W6r8zKt6jUiPyr45SdXdcOpCbmpjzPdOodOIW6xmhsoou7QROwUie');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` VALUES (1,'Topic 1',1),(2,'Topic 2',2),(3,'Topic 3',3),(4,'Topic 4',4),(5,'Topic 5',5),(6,'Topic 6',6),(7,'Topic 7',7),(8,'Topic 8',8),(9,'Topic 9',9),(10,'Topic 10',10);
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
  `isClient` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userName` (`userName`),
  KEY `addressID` (`addressID`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`addressID`) REFERENCES `addresses` (`addressID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Client1','Client 1','client1@example.com','1234567890',1,1),(2,'Client 2','Client 2','client2@example.com','1234567891',2,1),(3,'Client 3','Client 3','client3@example.com','1234567892',3,1),(4,'Client 4','Client 4','client4@example.com','1234567893',4,1),(5,'Client 5','Client 5','client5@example.com','1234567894',5,1),(6,'Client 6','Client 6','client6@example.com','1234567895',1,1),(7,'Client 7','Client 7','client7@example.com','1234567896',2,1),(8,'Client 8','Client 8','client8@example.com','1234567897',3,1),(9,'Client 9','Client 9','client9@example.com','1234567898',4,1),(10,'Client 10','Client 10','client10@example.com','1234567899',5,1),(11,'Employee 1','Employee 1','employee1@example.com','0987654321',6,0),(12,'Employee 2','Employee 2','employee2@example.com','0987654322',7,0),(13,'Employee 3','Employee 3','employee3@example.com','0987654323',8,0),(14,'Employee 4','Employee 4','employee4@example.com','0987654324',9,0),(15,'Employee 5','Employee 5','employee5@example.com','0987654325',10,0),(16,'Employee 6','Employee 6','employee6@example.com','0987654326',11,0),(17,'Employee 7','Employee 7','employee7@example.com','0987654327',12,0),(18,'Employee 8','Employee 8','employee8@example.com','0987654328',13,0),(19,'Employee 9','Employee 9','employee9@example.com','0987654329',14,0),(20,'Employee 10','Employee 10','employee10@example.com','0987654330',15,0),(21,'q',NULL,NULL,NULL,NULL,0);
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

-- Dump completed on 2024-06-13 12:05:23
