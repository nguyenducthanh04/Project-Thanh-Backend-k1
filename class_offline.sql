-- MariaDB dump 10.19-11.3.1-MariaDB, for linux-systemd (x86_64)
--
-- Host: localhost    Database: f8_class_manager
-- ------------------------------------------------------
-- Server version	10.6.16-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `optKey` varchar(200) DEFAULT NULL,
  `optValue` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_columns`
--

DROP TABLE IF EXISTS `users_columns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_columns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `featureName` varchar(200) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `users_columns_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_columns`
--

LOCK TABLES `users_columns` WRITE;
/*!40000 ALTER TABLE `users_columns` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_columns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(150) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES
(1,'users.read','2024-02-06 11:27:28','2024-02-06 11:27:28'),
(2,'users.add','2024-02-06 11:27:28','2024-02-06 11:27:28'),
(3,'users.update','2024-02-07 02:13:04','2024-02-07 02:13:04'),
(4,'users.delete','2024-02-07 02:13:04','2024-02-07 02:13:04'),
(5,'courses.update','2024-02-08 04:02:57','2024-02-08 04:02:57'),
(6,'courses.delete','2024-02-08 04:02:57','2024-02-08 04:02:57'),
(7,'courses.add','2024-02-08 04:03:38','2024-02-08 04:03:38'),
(8,'courses.read','2024-02-08 04:03:43','2024-02-08 04:03:43'),
(9,'classes.add','2024-02-08 04:21:08','2024-02-08 04:21:08'),
(10,'classes.read','2024-02-08 04:21:08','2024-02-08 04:21:08'),
(11,'classes.delete','2024-02-08 04:21:08','2024-02-08 04:21:08'),
(12,'classes.update','2024-02-08 04:21:08','2024-02-08 04:21:08'),
(13,'classesTeacher.read','2024-02-08 04:44:04','2024-02-08 04:44:04'),
(14,'classesTeacher.add','2024-02-08 13:52:35','2024-02-08 13:52:35'),
(15,'admin.read','2024-02-08 13:57:18','2024-02-08 13:57:18'),
(16,'comment.add','2024-02-10 10:44:11','2024-02-10 10:44:11'),
(17,'comment.read','2024-02-10 10:45:15','2024-02-10 10:45:15'),
(18,'comment.update','2024-02-10 10:45:15','2024-02-10 10:45:15'),
(19,'comment.delete','2024-02-10 10:45:15','2024-02-10 10:45:15'),
(20,'classesTeacher.update','2024-02-20 12:35:25','2024-02-20 12:35:25'),
(21,'classesTeacher.delete','2024-02-20 12:35:25','2024-02-20 12:35:25'),
(22,'document.add','2024-02-20 13:01:03','2024-02-20 13:01:03'),
(23,'document.read','2024-02-20 13:01:03','2024-02-20 13:01:03'),
(24,'document.update','2024-02-20 13:01:03','2024-02-20 13:01:03'),
(25,'student.read','2024-02-22 04:32:17','2024-02-22 04:32:17');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scheduleclasses`
--

DROP TABLE IF EXISTS `scheduleclasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scheduleclasses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schedule` tinyint(1) DEFAULT NULL,
  `timeLearn` varchar(50) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  CONSTRAINT `scheduleclasses_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduleclasses`
--

LOCK TABLES `scheduleclasses` WRITE;
/*!40000 ALTER TABLE `scheduleclasses` DISABLE KEYS */;
INSERT INTO `scheduleclasses` VALUES
(33,2,'01:27-17:27',NULL,'2024-01-11 07:57:01','2024-01-11 07:57:01'),
(34,3,'17:46-18:46',NULL,'2024-01-11 07:58:17','2024-01-11 07:58:17'),
(36,5,'16:03-21:03',NULL,'2024-01-11 08:04:02','2024-01-11 08:04:02'),
(38,5,'04:05-08:05',NULL,'2024-01-11 08:05:46','2024-01-11 08:05:46'),
(161,2,'09:30-12:30',330,'2024-02-08 14:06:49','2024-02-08 14:06:49'),
(162,5,'09:30-12:30',330,'2024-02-08 14:06:49','2024-02-08 14:06:49'),
(166,2,'10:13-12:13',342,'2024-02-20 15:14:21','2024-02-20 15:14:21'),
(167,4,'10:13-12:13',342,'2024-02-20 15:14:21','2024-02-20 15:14:21'),
(168,2,'10:45-12:45',343,'2024-02-22 03:45:21','2024-02-22 03:45:21'),
(169,4,'10:45-12:45',343,'2024-02-22 03:45:21','2024-02-22 03:45:21');
/*!40000 ALTER TABLE `scheduleclasses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES
(1,'Admin','2023-12-01 05:08:35','2023-12-01 05:08:35'),
(2,'Teacher','2023-12-01 05:08:35','2023-12-01 05:08:35'),
(3,'Student','2023-12-01 05:08:35','2023-12-01 05:08:35');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT 0,
  `teacherId` int(11) DEFAULT NULL,
  `tryLearn` tinyint(4) DEFAULT 0,
  `quantity` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES
(3,'Back-End',20000000,14,7,45,48,'2023-12-14 03:39:09','2024-02-24 11:17:39'),
(6,'Front-End',15000000,17,0,20,40,'2023-12-14 03:39:09','2023-12-14 03:39:09'),
(7,'Fullstack',20000000,15,0,30,40,'2023-12-14 03:39:09','2023-12-21 15:00:14'),
(38,'Course 21',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(39,'Course 22',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(40,'Course 23',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(42,'Course 25',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(44,'Course 27',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(45,'Course 28',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(46,'Course 29',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(47,'Course 30',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(48,'Course 31',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(49,'Course 32',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(50,'Course 33',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(51,'Course 34',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(52,'Course 35',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(53,'Course 36',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(54,'Course 37',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(55,'Course 38',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(56,'Course 39',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(57,'Course 40',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(58,'Course 41',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(59,'Course 42',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(60,'Course 43',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(61,'Course 44',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(62,'Course 45',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(63,'Course 46',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(64,'Course 47',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(65,'Course 48',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(66,'Course 49',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(67,'Course 50',15000000,14,0,30,45,'2023-12-26 06:13:11','2023-12-26 06:13:11'),
(68,'Course 3',15000,18,0,20,30,'2023-12-30 09:38:54','2023-12-30 09:38:54'),
(70,'Course 80',20000000,15,30,40,NULL,'2023-12-30 09:58:43','2023-12-30 09:58:43'),
(71,'Back-End',15000000,14,38,48,NULL,'2023-12-30 10:05:42','2023-12-30 10:05:42'),
(72,'Front-End',15000000,17,20,40,NULL,'2023-12-30 10:05:42','2023-12-30 10:05:42'),
(73,'Fullstack',20000000,15,30,40,NULL,'2023-12-30 10:05:42','2023-12-30 10:05:42'),
(74,'Back-End',15000000,14,38,48,NULL,'2023-12-30 10:07:20','2023-12-30 10:07:20'),
(75,'Front-End',15000000,17,20,40,NULL,'2023-12-30 10:07:20','2023-12-30 10:07:20'),
(76,'Back-End',15000000,14,0,38,48,'2023-12-30 10:08:52','2023-12-30 10:08:52'),
(77,'Front-End',15000000,17,0,20,40,'2023-12-30 10:08:52','2023-12-30 10:08:52'),
(78,'C100',15000000,14,0,38,48,'2023-12-30 10:10:57','2023-12-30 10:10:57'),
(80,'C100',15000000,14,0,38,48,'2023-12-30 10:22:13','2023-12-30 10:22:13'),
(81,'C200',15000000,17,0,20,40,'2023-12-30 10:22:13','2023-12-30 10:22:13'),
(83,'C100',15000000,14,0,38,48,'2023-12-30 10:23:27','2023-12-30 10:23:27'),
(84,'C200',15000000,17,0,20,40,'2023-12-30 10:23:27','2023-12-30 10:23:27'),
(85,'C300',20000000,15,0,30,40,'2023-12-30 10:23:27','2023-12-30 10:23:27'),
(87,'Back-End',15000000,14,0,38,48,'2023-12-30 10:32:02','2023-12-30 10:32:02'),
(89,'Back-End',15000000,14,0,38,48,'2023-12-30 10:36:29','2023-12-30 10:36:29'),
(90,'Front-End',15000000,17,0,20,40,'2023-12-30 10:36:29','2023-12-30 10:36:29'),
(91,'Course 4',15000000,14,0,30,45,'2023-12-30 10:36:29','2023-12-30 10:36:29'),
(93,'C100',15000000,14,0,38,48,'2023-12-30 10:38:08','2023-12-30 10:38:08'),
(94,'C200',15000000,17,0,20,40,'2023-12-30 10:38:08','2023-12-30 10:38:08'),
(96,'C100',15000000,14,0,38,48,'2023-12-30 10:40:54','2023-12-30 10:40:54'),
(97,'C200',15000000,17,0,20,40,'2023-12-30 10:40:54','2023-12-30 10:40:54'),
(98,'C300',20000000,15,0,30,40,'2023-12-30 10:40:54','2023-12-30 10:40:54'),
(100,'C100',15000000,14,0,38,48,'2023-12-30 10:41:39','2023-12-30 10:41:39'),
(101,'C200',15000000,17,0,20,40,'2023-12-30 10:41:39','2023-12-30 10:41:39'),
(102,'C300',20000000,15,0,30,40,'2023-12-30 10:41:39','2023-12-30 10:41:39'),
(104,'C100',15000000,14,0,38,48,'2023-12-30 10:45:07','2023-12-30 10:45:07'),
(105,'C200',15000000,17,0,20,40,'2023-12-30 10:45:07','2023-12-30 10:45:07'),
(107,'C100',15000000,14,0,38,48,'2023-12-30 10:51:25','2023-12-30 10:51:25'),
(108,'C200',15000000,17,0,20,40,'2023-12-30 10:51:25','2023-12-30 10:51:25'),
(109,'C100',15000000,14,0,38,48,'2023-12-30 10:56:22','2023-12-30 10:56:22'),
(110,'C200',15000000,17,0,20,40,'2023-12-30 10:56:22','2023-12-30 10:56:22'),
(111,'C300',20000000,15,0,30,40,'2023-12-30 10:56:22','2023-12-30 10:56:22'),
(112,'C400',20000000,15,0,40,0,'2023-12-30 10:56:22','2023-12-30 10:56:22'),
(113,'C100',15000000,14,0,38,48,'2023-12-30 11:00:45','2023-12-30 11:00:45'),
(114,'C200',15000000,17,0,20,40,'2023-12-30 11:00:45','2023-12-30 11:00:45'),
(115,'C300',20000000,15,0,30,40,'2023-12-30 11:00:45','2023-12-30 11:00:45'),
(116,'C400',20000000,15,0,40,0,'2023-12-30 11:00:45','2023-12-30 11:00:45'),
(117,'C100',15000000,14,0,38,48,'2023-12-31 03:28:23','2023-12-31 03:28:23'),
(118,'C200',15000000,17,0,20,40,'2023-12-31 03:28:23','2023-12-31 03:28:23'),
(119,'C300',20000000,15,0,30,40,'2023-12-31 03:28:23','2023-12-31 03:28:23'),
(120,'C400',20000000,15,0,40,0,'2023-12-31 03:28:23','2023-12-31 03:28:23'),
(121,'C100',15000000,17,0,38,48,'2023-12-31 03:57:19','2023-12-31 03:57:19'),
(122,'C200',15000000,17,0,20,40,'2023-12-31 03:57:19','2023-12-31 03:57:19'),
(123,'C300',20000000,17,0,30,40,'2023-12-31 03:57:19','2023-12-31 03:57:19'),
(124,'C400',20000000,17,0,40,0,'2023-12-31 03:57:19','2023-12-31 03:57:19'),
(129,'C100',15000000,17,0,38,48,'2023-12-31 04:03:27','2023-12-31 04:03:27'),
(130,'C300',20000000,17,0,30,40,'2023-12-31 04:03:27','2023-12-31 04:03:27'),
(131,'C200',15000000,17,0,20,40,'2023-12-31 04:03:27','2023-12-31 04:03:27'),
(132,'C400',20000000,17,0,40,0,'2023-12-31 04:03:27','2023-12-31 04:03:27'),
(133,'C200',15000000,17,0,20,40,'2023-12-31 04:04:41','2023-12-31 04:04:41'),
(134,'C100',15000000,17,0,38,48,'2023-12-31 04:04:41','2023-12-31 04:04:41'),
(135,'C400',20000000,17,0,40,0,'2023-12-31 04:04:41','2023-12-31 04:04:41'),
(136,'C300',20000000,17,0,30,40,'2023-12-31 04:04:41','2023-12-31 04:04:41'),
(137,'C100',15000000,17,0,38,48,'2023-12-31 04:11:04','2023-12-31 04:11:04'),
(138,'C200',15000000,17,0,20,40,'2023-12-31 04:11:04','2023-12-31 04:11:04'),
(139,'C400',20000000,17,0,40,0,'2023-12-31 04:11:04','2023-12-31 04:11:04'),
(140,'C300',20000000,17,0,30,40,'2023-12-31 04:11:04','2023-12-31 04:11:04'),
(141,'C100',15000000,21,0,38,48,'2023-12-31 04:16:15','2023-12-31 04:16:15'),
(142,'C200',15000000,21,0,20,40,'2023-12-31 04:16:15','2023-12-31 04:16:15'),
(143,'C400',20000000,17,0,40,0,'2023-12-31 04:16:15','2023-12-31 04:16:15'),
(144,'C300',20000000,21,0,30,40,'2023-12-31 04:16:15','2023-12-31 04:16:15'),
(145,'C100',15000000,21,0,38,48,'2023-12-31 04:16:58','2023-12-31 04:16:58'),
(146,'C300',20000000,21,0,30,40,'2023-12-31 04:16:58','2023-12-31 04:16:58'),
(147,'C200',15000000,21,0,20,40,'2023-12-31 04:16:58','2023-12-31 04:16:58'),
(149,'React-Dom',1000000,14,7,20,30,'2023-12-31 05:14:43','2023-12-31 05:17:34'),
(150,'Thanh Nguyen',12000,16,9,22,22,'2023-12-31 05:19:38','2023-12-31 05:29:01'),
(151,'Thanh Nguyễn Đức ',1000,16,8,99,99,'2023-12-31 09:30:42','2023-12-31 09:30:42'),
(152,'Back-End',15000000,14,0,38,48,'2024-01-01 04:13:29','2024-01-01 04:13:29'),
(153,'Frin',1000,14,0,33,33,'2024-01-01 04:13:29','2024-01-01 04:13:29'),
(154,'Fe',1000,14,0,33,33,'2024-01-01 04:13:29','2024-01-01 04:13:29'),
(155,'Back-End',15000000,14,0,38,48,'2024-01-01 04:17:41','2024-01-01 04:17:41'),
(156,'Fe',1000,14,0,33,33,'2024-01-01 04:17:41','2024-01-01 04:17:41'),
(157,'Frin',1000,14,0,33,33,'2024-01-01 04:17:41','2024-01-01 04:17:41'),
(158,'Back-End',15000000,14,0,38,48,'2024-01-01 04:18:58','2024-01-01 04:18:58'),
(159,'Frin',1000,14,0,33,33,'2024-01-01 04:18:58','2024-01-01 04:18:58'),
(160,'Fe',1000,14,0,33,33,'2024-01-01 04:18:58','2024-01-01 04:18:58'),
(161,'AI',2000000,18,7,7,45,'2024-01-03 16:02:38','2024-01-03 16:02:38'),
(162,'IOT',3000000,19,0,33,45,'2024-01-03 16:10:24','2024-01-03 16:10:24'),
(164,'IOT 88',3000,14,7,66,45,'2024-01-19 01:35:41','2024-01-19 01:35:41'),
(165,'Back-End',15000000,14,0,45,48,'2024-01-20 01:16:22','2024-01-20 01:16:22'),
(166,'Front-End',15000000,17,0,20,40,'2024-01-20 01:16:22','2024-01-20 01:16:22'),
(167,'Fullstack',20000000,15,0,30,40,'2024-01-20 01:16:22','2024-01-20 01:16:22'),
(168,'Lập trình Web Backend ',15000000,92,0,100,45,'2024-02-08 14:05:08','2024-02-08 14:05:08'),
(169,'Testt',15000000,92,0,30,45,'2024-02-22 03:44:15','2024-02-22 03:44:15'),
(170,'Back-end C#',3000000,14,0,0,45,'2024-02-24 10:58:03','2024-02-24 10:58:03'),
(171,'Front-End Reactjs',15000000,14,0,0,45,'2024-02-24 11:02:07','2024-02-24 11:02:07'),
(172,'Sơn Đặng',15000000,14,0,0,45,'2024-02-24 11:03:21','2024-02-24 11:03:21');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classId` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES
(26,330,'6','ok',NULL,92,'2024-02-09 03:21:36','2024-02-09 03:21:36'),
(27,330,'6','ok',26,92,'2024-02-09 03:21:50','2024-02-09 03:21:50'),
(30,330,'6','Chúc mừng năm mới\r\n',26,92,'2024-02-10 10:20:34','2024-02-10 10:20:34'),
(33,330,'7','Xin chào các em\r\n',NULL,92,'2024-02-20 12:43:43','2024-02-20 12:43:43'),
(34,330,'7','em chào thầy ạ',33,92,'2024-02-20 12:43:57','2024-02-20 12:43:57'),
(35,330,'7','em nộp bài ạ: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat',NULL,92,'2024-02-20 15:39:43','2024-02-20 15:39:43'),
(36,330,'7','oke em',35,92,'2024-02-20 15:40:01','2024-02-20 15:40:01'),
(37,330,'7','kkkkk',35,92,'2024-02-20 15:40:26','2024-02-20 15:40:26'),
(41,342,'9','Em nộp bài ạ: https://github.com/nguyenducthanh04/Project-Thanh-Backend-k1',NULL,95,'2024-02-22 15:57:29','2024-02-22 15:57:29'),
(42,342,'9','ok em',41,95,'2024-02-22 15:57:43','2024-02-22 15:57:43'),
(43,342,'9','Em nhận xét: quá oke',41,95,'2024-02-22 15:58:04','2024-02-22 15:58:04'),
(44,330,'7','Dungx khac',35,92,'2024-02-24 03:47:02','2024-02-24 03:47:02'),
(45,342,'9','Dũng khấc nộp bài',NULL,95,'2024-02-24 03:57:47','2024-02-24 03:57:47'),
(46,330,'7','em nộp bài',NULL,95,'2024-02-24 04:02:28','2024-02-24 04:02:28'),
(47,330,'7','ok em',46,92,'2024-02-24 04:03:05','2024-02-24 04:03:05');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES
(3,1,1,'2024-02-08 02:52:30','2024-02-08 02:52:30'),
(4,92,2,'2024-02-08 13:36:14','2024-02-08 13:36:14'),
(6,14,3,'2024-02-20 16:12:29','2024-02-20 16:12:29'),
(7,95,5,'2024-02-22 04:25:29','2024-02-22 04:25:29'),
(10,96,5,'2024-02-24 04:18:05','2024-02-24 04:18:05'),
(11,15,2,'2024-02-25 02:46:51','2024-02-25 02:46:51'),
(12,24,5,'2024-02-25 02:49:19','2024-02-25 02:49:19');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes_teachers`
--

DROP TABLE IF EXISTS `classes_teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classes_teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacherId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`),
  KEY `classId` (`classId`),
  CONSTRAINT `classes_teachers_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `Users` (`id`),
  CONSTRAINT `classes_teachers_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes_teachers`
--

LOCK TABLES `classes_teachers` WRITE;
/*!40000 ALTER TABLE `classes_teachers` DISABLE KEYS */;
INSERT INTO `classes_teachers` VALUES
(13,92,330,'2024-02-08 14:06:49','2024-02-08 14:06:49'),
(19,14,342,'2024-02-20 15:14:21','2024-02-20 15:14:21'),
(20,92,343,'2024-02-22 03:45:21','2024-02-22 03:45:21');
/*!40000 ALTER TABLE `classes_teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_calendars`
--

DROP TABLE IF EXISTS `teacher_calendars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_calendars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacherId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `scheduleDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`),
  KEY `classId` (`classId`),
  CONSTRAINT `teacher_calendars_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `Users` (`id`),
  CONSTRAINT `teacher_calendars_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_calendars`
--

LOCK TABLES `teacher_calendars` WRITE;
/*!40000 ALTER TABLE `teacher_calendars` DISABLE KEYS */;
INSERT INTO `teacher_calendars` VALUES
(26,14,342,'2024-02-01 05:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(27,14,342,'2024-02-01 05:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(28,14,342,'2024-02-06 03:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(29,14,342,'2024-02-06 03:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(30,14,342,'2024-02-08 05:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(31,14,342,'2024-02-08 05:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(32,14,342,'2024-02-13 03:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(33,14,342,'2024-02-13 03:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(34,14,342,'2024-02-15 05:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(35,14,342,'2024-02-15 05:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(36,14,342,'2024-02-20 03:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(37,14,342,'2024-02-20 03:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(38,14,342,'2024-02-22 05:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(39,14,342,'2024-02-22 05:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(40,14,342,'2024-02-27 03:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(41,14,342,'2024-02-27 03:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(42,14,342,'2024-02-29 05:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(43,14,342,'2024-02-29 05:13:00','2024-02-20 15:14:21','2024-02-20 15:14:21'),
(44,92,343,'2024-02-01 05:45:00','2024-02-22 03:45:21','2024-02-22 03:45:21'),
(45,92,343,'2024-02-06 03:45:00','2024-02-22 03:45:21','2024-02-22 03:45:21'),
(46,92,343,'2024-02-08 05:45:00','2024-02-22 03:45:21','2024-02-22 03:45:21'),
(47,92,343,'2024-02-13 03:45:00','2024-02-22 03:45:21','2024-02-22 03:45:21'),
(48,92,343,'2024-02-15 05:45:00','2024-02-22 03:45:21','2024-02-22 03:45:21'),
(49,92,343,'2024-02-20 03:45:00','2024-02-22 03:45:21','2024-02-22 03:45:21'),
(50,92,343,'2024-02-22 05:45:00','2024-02-22 03:45:21','2024-02-22 03:45:21'),
(51,92,343,'2024-02-27 03:45:00','2024-02-22 03:45:21','2024-02-22 03:45:21'),
(52,92,343,'2024-02-29 05:45:00','2024-02-22 03:45:21','2024-02-22 03:45:21');
/*!40000 ALTER TABLE `teacher_calendars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students_classes`
--

DROP TABLE IF EXISTS `students_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students_classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL,
  `completedDate` datetime DEFAULT NULL,
  `dropDate` datetime DEFAULT NULL,
  `recover` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `classId` (`classId`),
  KEY `statusId` (`statusId`),
  CONSTRAINT `students_classes_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `students_classes_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `students_classes_ibfk_3` FOREIGN KEY (`statusId`) REFERENCES `learning_statuses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students_classes`
--

LOCK TABLES `students_classes` WRITE;
/*!40000 ALTER TABLE `students_classes` DISABLE KEYS */;
INSERT INTO `students_classes` VALUES
(210,24,343,3,NULL,NULL,NULL,'2024-02-22 03:45:34','2024-02-22 03:45:34'),
(233,95,342,3,NULL,NULL,NULL,'2024-02-24 12:24:02','2024-02-24 12:24:02'),
(234,96,342,3,NULL,NULL,NULL,'2024-02-24 12:24:02','2024-02-24 12:24:02'),
(243,95,330,3,NULL,NULL,NULL,'2024-02-24 16:49:15','2024-02-24 16:49:15'),
(244,96,330,3,NULL,NULL,NULL,'2024-02-24 16:49:15','2024-02-25 03:31:22');
/*!40000 ALTER TABLE `students_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercises_submits`
--

DROP TABLE IF EXISTS `exercises_submits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercises_submits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) DEFAULT NULL,
  `exerciseId` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `exerciseId` (`exerciseId`),
  CONSTRAINT `exercises_submits_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `exercises_submits_ibfk_2` FOREIGN KEY (`exerciseId`) REFERENCES `exercises` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises_submits`
--

LOCK TABLES `exercises_submits` WRITE;
/*!40000 ALTER TABLE `exercises_submits` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercises_submits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES
('20231122031135-create-types.js'),
('20231122031137-create-user.js'),
('20231122031922-create-login-tokens.js'),
('20231122033947-create-settings.js'),
('20231122034102-create-permissions.js'),
('20231122035202-create-roles.js'),
('20231122040515-user_role.js'),
('20231122041007-role_permission.js'),
('20231122041317-user_permission.js'),
('20231122042134-create-user-otp.js'),
('20231122043013-create-courses.js'),
('20231122044432-create-course-modules.js'),
('20231122050140-create-module-document.js'),
('20231122051458-create-classes.js'),
('20231122124359-classes_teachers.js'),
('20231122134255-create-learning-status.js'),
('20231122140249-create-teacher-calendar.js'),
('20231122145422-create-students-attendance.js'),
('20231122145944-create-exercises.js'),
('20231122150448-create-exercises-submit.js'),
('20231122152931-create-comments.js'),
('20231122153618-create-users-columns.js'),
('20231123075351-create-students-classes.js'),
('20231127140307-create-user-socials.js'),
('20240107091732-scheduleclasses.js'),
('20240222022624-create-student-status.js'),
('20240222025450-create-student-status.js'),
('20240222030835-create-student-status.js'),
('20240222031436-create-student-status.js'),
('20240222085136-create-user-socials.js'),
('20240222144007-create-student-courses.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classId` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  CONSTRAINT `exercises_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

LOCK TABLES `exercises` WRITE;
/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
INSERT INTO `exercises` VALUES
(6,330,'oke','hi','a','2024-02-09 03:10:29','2024-02-09 03:10:29'),
(7,330,'Bai tap buoi 7','Code web FaceBook','Tự tìm','2024-02-09 03:24:27','2024-02-09 03:24:27'),
(9,342,'Code trang web F8','Làm như video','Tự tìm','2024-02-22 15:51:33','2024-02-22 15:51:33');
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) DEFAULT NULL,
  `permissionId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
INSERT INTO `role_permission` VALUES
(3,3,1,'2024-02-07 02:13:04','2024-02-07 02:13:04'),
(4,3,2,'2024-02-07 02:13:04','2024-02-07 02:13:04'),
(5,3,3,'2024-02-07 02:13:04','2024-02-07 02:13:04'),
(6,3,4,'2024-02-07 02:13:04','2024-02-07 02:13:04'),
(20,1,NULL,'2024-02-08 04:02:57','2024-02-08 04:02:57'),
(21,1,NULL,'2024-02-08 04:02:57','2024-02-08 04:02:57'),
(31,2,NULL,'2024-02-08 04:44:04','2024-02-08 04:44:04'),
(32,2,13,'2024-02-08 04:44:04','2024-02-08 04:44:04'),
(33,2,14,'2024-02-08 13:52:35','2024-02-08 13:52:35'),
(34,1,15,'2024-02-08 13:57:18','2024-02-08 13:57:18'),
(39,2,20,'2024-02-20 12:35:25','2024-02-20 12:35:25'),
(40,2,21,'2024-02-20 12:35:25','2024-02-20 12:35:25'),
(41,2,22,'2024-02-20 13:01:03','2024-02-20 13:01:03'),
(42,2,23,'2024-02-20 13:01:03','2024-02-20 13:01:03'),
(43,2,24,'2024-02-20 13:01:03','2024-02-20 13:01:03'),
(50,5,NULL,'2024-02-22 04:32:17','2024-02-22 04:32:17'),
(51,5,25,'2024-02-22 04:32:17','2024-02-22 04:32:17');
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `address` varchar(115) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `firstLogin` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES
(1,'Nguyễn Đức Thanh','ndt.ducthanh04@gmail.com','$2b$10$biXD5pogAKMh9WGOEjJnIu2tz7GE9PRusag4jjcBda4Er4gNNd9K6','0585762666','Thôn Ngò, Phụng Công, Văn Giang, Hưng Yên',1,2,'2023-12-14 02:36:24','2024-02-22 09:06:33'),
(14,'Thanh Nguyen','gv1@gmail.com','$2b$10$XVP2YeibgYOMLWzwLY7oQ.trfmbokf1aVFlZeP9j2cSM5pBp3FXci','0585762666','Hà Nội',2,1,'2023-12-14 02:42:14','2024-01-19 00:56:20'),
(15,'Giảng viên 2','user4@gmail.com','$2b$10$xBpmYcU/KLY.tmUEhqjXLeYXvcAFpgfJKXB3jBhbP/6y0ihJMAsKS','0585762666','Hà Nội',2,1,'2023-12-14 02:42:15','2023-12-14 02:42:15'),
(16,'Giảng viên 3','user5@gmail.com','$2b$10$u.lK.I0xBACmYVHroLDokO1ot91tkxijbPtGkOm5QnOD1JEYQdngy','0585762666','Hà Nội',2,1,'2023-12-14 02:42:15','2023-12-14 02:42:15'),
(17,'Giảng viên 4','user6@gmail.com','$2b$10$o43A.yBQxfl9pkGs50gbk.Cjr4Q9LAYg1eMxc06PvCfdm3SPU01Jm','0585762666','Hà Nội',2,1,'2023-12-14 02:42:15','2023-12-14 02:42:15'),
(18,'Giảng viên 5','user7@gmail.com','$2b$10$EsLjjp/XMD.j5XdJiH93XuTUZa3qdZA4EaE1QUlDJ0d/gMFRgDDmS','0585762666','Hà Nội',2,2,'2023-12-14 02:42:15','2024-01-02 09:15:09'),
(19,'Giảng viên 6','user8@gmail.com','$2b$10$VbcnaTIfUmu2qYIuySCr7.eq5RUuXVtuAf0UCwlMVH17nkl.FfiwK','0585762666','Hà Nội',2,1,'2023-12-14 02:42:15','2023-12-14 02:42:15'),
(20,'Giảng viên 7','user9@gmail.com','$2b$10$yAjgavrOcyjI3VZ9DwzgNOOFtpPygwF0dXO0fSlQ80Sznbuzof1LW','0585762666','Hà Nội',2,1,'2023-12-14 02:42:15','2023-12-14 02:42:15'),
(21,'Giảng viên 8','user10@gmail.com','$2b$10$7.fwR8GNcEko/4RYyfBlTOgSDNkyw5fT/T9WVTX3GCQq.vpyu5qme','0585762666','Hà Nội',2,1,'2023-12-14 02:42:15','2023-12-14 02:42:15'),
(24,'Trần Quốc Anh','tqa22@gmail.com','$2b$10$V82JrXnc.Mf.wIq7nTQ3Ye4yIskh/adYGfo17nk4H.E/zLb0RSTTW','0333666888','Hưng Yên',3,1,'2023-12-14 02:42:56','2023-12-31 09:00:48'),
(35,'User14','user14@gmail.com','$2b$10$gb8jba4DXlFBAaIaak1bFu7srMBsBvXc2TcxaWYYz.UWMOgcxDbiK','0585762666','Hà Nội',3,1,'2023-12-14 02:42:56','2023-12-14 02:42:56'),
(37,'User16','user16@gmail.com','$2b$10$911KF1pnNySvtPnBgiconecFi/21faiD9rzccW5.0HbasjF1yqCrC','0585762666','Hà Nội',3,1,'2023-12-14 02:42:56','2023-12-14 02:42:56'),
(38,'User17','user17@gmail.com','$2b$10$NELPSxEHczrnVsIxOZtoVuu6aE3HphkxcnElkJub/vuuORoWsjSGW','0585762666','Hà Nội',3,1,'2023-12-14 02:42:56','2023-12-14 02:42:56'),
(39,'User18','user18@gmail.com','$2b$10$1eP2/z26G1wC2Ml9oXRunuH21.gR6lwLhlRuw4k2k0ZY/iuBjxRX6','0585762666','Hà Nội',3,1,'2023-12-14 02:42:56','2023-12-14 02:42:56'),
(40,'User19','user19@gmail.com','$2b$10$KgJNOZt0fJGAN1oK98xEH.yOSASiF6CVk41DL7dZNRMyB1k9MOTUu','0585762666','Hà Nội',3,1,'2023-12-14 02:42:56','2023-12-14 02:42:56'),
(41,'User20','user20@gmail.com','$2b$10$idAfS.N0Pxb8e9OOh.UR5eT.O.mcy0.pmrz4/xOqF/XtNOiAN6Qmy','0585762666','Hà Nội',3,1,'2023-12-14 02:42:56','2023-12-14 02:42:56'),
(43,'User22','user22@gmail.com','$2b$10$zZy/kvsWN/Hx7R/HLHzj1OKpooxTPbhwojAZcGt4MaCu3ApW2nZ4q','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(45,'User24','user24@gmail.com','$2b$10$LtYVD3WkGmZOwsHvJ4CG1uj0Gr3DydElIjT6FBXLu2C3z2w1rAIgG','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(46,'User25','user25@gmail.com','$2b$10$q2jFSux258HshxfFaLW0w.t9l0s/u2miZuP3sEROv6NVZP73h6.OW','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(47,'User26','user26@gmail.com','$2b$10$E9TGluZcs1fQFdYB0/rpxeNuvQt7qlY0jJyWuaDzS/M7de2KuBDKe','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(48,'User27','user27@gmail.com','$2b$10$aQKe0yOlHfbRWW3sbLZ2VeDR2fmpJznTv74PSlwSUOWG9qcaHocYW','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(49,'User28','user28@gmail.com','$2b$10$pADd0GMkKOMP9IKE92FyxezD50tnA.MpC6oDHbDlvOj0vItWb4YBq','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(50,'User29','user29@gmail.com','$2b$10$6ESPL.89GJajl9R124yPmeuBMEe7iQXWdowD.9nHMWKbxHUgX328u','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(51,'User30','user30@gmail.com','$2b$10$711utTrKd15/izEhhrbaKu/B7ouHhEem71i0q3T5PN.5jcgGj4tpC','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(52,'User31','user31@gmail.com','$2b$10$DYp3zDlsfB5u1DKm3fQHQ.3DlEhnvjQpPp19nZjXOTRjjb/Zvby32','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(53,'User32','user32@gmail.com','$2b$10$XkjGQZeglbYACqYd05Wzy.yScdOadf8gCtVdt4acx.KsKOIEJ2Tyq','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(54,'User33','user33@gmail.com','$2b$10$HKO3c/hSQCLtaHpzwMJ6oOXZDgE1uh17aCqFS6.4iVwpxb0VOSwf6','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(55,'User34','user34@gmail.com','$2b$10$vj9bNMLpT8OK9i5wIYQWSO6KWc3hMw2O503q0KdsNcaa9UKC5IUiu','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(56,'User35','user35@gmail.com','$2b$10$Cd/a82VVZtH0roamznMLHOZ8ZzdnvMPpjtIk4d6TPuHEJY2ZQwvFy','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(57,'User36','user36@gmail.com','$2b$10$fi6hEUjt56u0D4P4SKA4N.OTN3jTM/6XowykEcyv9DjukwnPfOfNS','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(58,'User37','user37@gmail.com','$2b$10$LKvI4.j0ecH8uDHXlr.cz.YQyNBa08UfKgIbIX3bFHKjazFhfx6ri','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(59,'User38','user38@gmail.com','$2b$10$IMgh9FLSRQWorxQK.kV9XeVQ6MxB04/jk18dJmOHBpMXwJDPa5OS2','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(60,'User39','user39@gmail.com','$2b$10$yq1EvxwlrOouyyo7PfBHq.N.4R5QZN/Ibxz.tmMjwISZli4h4J.Cu','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(61,'User40','user40@gmail.com','$2b$10$oWKQPYSszQuV8kbeUkJzJu4xFK875GHWgymtiMR3Za4yRe6sH.GH6','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(62,'User41','user41@gmail.com','$2b$10$9PUpsl298mH.SRfbBEgq1eFvqk.DGJbreSSx1ACgJIHD9qwSasYrK','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(63,'User42','user42@gmail.com','$2b$10$K/4xOGopwRvyEA0VFfQOteQHulEJS6zuPlQY9iftBA1WxI9oqw.q2','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(64,'User43','user43@gmail.com','$2b$10$ROfKdnVg3dcYi6tMgfmRnO5GRBd2YDFjn0BubYplQwrhYDt2XHHrG','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(65,'User44','user44@gmail.com','$2b$10$sp4p9l.IBR2RIcSGIkGDNe5ZwZWMb8jBX9dYnWBG.G5g2/H5yA0J2','0585762666','Hà Nội',3,1,'2023-12-14 02:42:57','2023-12-14 02:42:57'),
(66,'User45','user45@gmail.com','$2b$10$WmuurOKq9vt5YqonvODZje5LzxjR0nf3a8BynWEau1QYNxtM1njqK','0585762666','Hà Nội',3,1,'2023-12-14 02:42:58','2023-12-14 02:42:58'),
(67,'User46','user46@gmail.com','$2b$10$Qaxm3Allphgkf9JRVpNMHu/4Pvfd2UutklHZB4F7Jjl0LIwdYqzbu','0585762666','Hà Nội',3,1,'2023-12-14 02:42:58','2023-12-14 02:42:58'),
(68,'User47','user47@gmail.com','$2b$10$bzjYsootLsQXA60gA3fmR.rWxQcvST/R9QZWbuLbcshIxbG/joRUu','0585762666','Hà Nội',3,1,'2023-12-14 02:42:58','2023-12-14 02:42:58'),
(69,'User48','user48@gmail.com','$2b$10$XAzn79Q9Govd/bHOuxIyTe0QuVk0W0UH.hBHdmtqfVtZphFFlfEUq','0585762666','Hà Nội',3,1,'2023-12-14 02:42:58','2023-12-14 02:42:58'),
(70,'User49','user49@gmail.com','$2b$10$R2Xwn1JMCCOrgRC4wDAlCuGJ/.O5TQeCOfop8U4LW2P/JzYG6ys/.','0585762666','Hà Nội',3,1,'2023-12-14 02:42:58','2023-12-14 02:42:58'),
(71,'User50','user50@gmail.com','$2b$10$Cu/UQq.6HJ5p3t9ys/RbZuPooXYeunZc5sDSJvpS63UV51GZ6x30a','0585762666','Hà Nội',3,1,'2023-12-14 02:42:58','2023-12-14 02:42:58'),
(72,'User 51','user51@gmail.com','$2b$10$vuTFr5WEYGHBU3tBApBmDO3t95LZbmPvMv4kz/suhLoYGoWQ2vfW.','0585762666','Hà Nội',3,1,'2023-12-14 03:28:34','2023-12-14 03:28:34'),
(73,'User 51','user51@gmail.com','$2b$10$Sa6JOiSC8FywytafIKs1Fe7bH5I5W/U33STedzcom6j43paqZfV.m','0585762666','Hà Nội',3,1,'2023-12-14 03:29:34','2023-12-14 03:29:34'),
(74,'User 51','user51@gmail.com','$2b$10$xkELIHt48tI2KEJxtqasJuyEGrliLebzok.D5PNTDXxDbT9SCvvQK','0585762666','Hà Nội',3,1,'2023-12-14 03:31:00','2023-12-14 03:31:00'),
(75,'User 51','user51@gmail.com','$2b$10$oViigIRyHAT605G/sCP1b.F6Fs/FFD51Wc8hobz818Nk2TSsv5zSm','0585762666','Hà Nội',3,1,'2023-12-14 03:38:33','2023-12-14 03:38:33'),
(76,'User 51','user51@gmail.com','$2b$10$9qd8SC6YpfqSyPn7zFKWmuUm1WfUbGjITynUUnbRr8/vv1bSJuqMu','0585762666','Hà Nội',3,1,'2023-12-14 03:39:09','2023-12-14 03:39:09'),
(78,'User 52','user52@gmail.com','$2b$10$BFeIyhXsaoVoa7PKUWAJIuqYzDmJz/jFRMUNAzG4nNPBlsC7OLp/W','0585762666','Hà Nội',3,1,'2023-12-14 04:27:03','2023-12-14 04:27:03'),
(81,'Thanh Nguyễn Đức ','tnd@gmail.com','$2b$10$qHy0sRFoZpSIvbKy1.b9fuo0vT5LURaP4Pxp6qD8wf0dTJCtRLvUu','0777566061','Hà Nội',3,2,'2024-01-03 15:01:59','2024-01-08 02:36:41'),
(86,'Trần Quốc Anh','tqa22@gmail.com',NULL,'333666888','Hưng Yên',NULL,1,'2024-01-20 01:39:40','2024-01-20 01:39:40'),
(87,'User14','user14@gmail.com',NULL,'585762666','Hà Nội',NULL,1,'2024-01-20 01:39:40','2024-01-20 01:39:40'),
(88,'User15','user15@gmail.com',NULL,'585762666','Hà Nội',NULL,1,'2024-01-20 01:39:40','2024-01-20 01:39:40'),
(89,'Thanh Nguyen','tn@gmail.com','$2b$10$Z8zXDwJ0XIxgwHWoRDUUq.3TJrLxnfPyfOiu/Fg9Zi..JhEVhoeQ6','0777566061','Hà Nội',3,2,'2024-02-05 03:25:28','2024-02-05 03:26:25'),
(90,'Thanh','thanh@gmail.com','$2b$10$fvL33FZW/oZOtSuLYrQEMOQwJ7o7izuwMsuNZtArR.2s5gkcVPlAS','0777566061','Hà Nội',3,2,'2024-02-05 03:29:25','2024-02-05 03:29:58'),
(91,'Thanh Duc','thanhduc@gmail.com','$2b$10$8BXQoDZWPteiqbf/oFPGX.Mqxtn8bWxeX.k0GPLbacLNMf4yfnGgO','0585762666','Hà Nội',2,2,'2024-02-08 04:25:24','2024-02-08 04:56:45'),
(92,'thanhnguyenduc','thanhnguyenduc03@gmail.com','$2b$10$DEwoIUJoD0AapxdxGxrF8OHySGlJGAXb1TJy12dNA71kGUVHVvJQu','0777566061','Hà Nội',2,2,'2024-02-08 05:02:19','2024-02-08 05:02:55'),
(93,'Nguyen van a','nva@gmail.com','$2b$10$dfeoY0zO3DrWUFX2UCJ5X.x3YnfF/qhJGwm0pW1cHsgQ.KxYcFNkO','0777566061','Hà Nội',3,2,'2024-02-08 05:04:11','2024-02-08 05:04:43'),
(94,'Thanh Nguyen 2','tn2@gmail.com','$2b$10$hY3BbIv..KGU2BTIHbO4eeojcOweTqVB8S/iGFmsaPPp5.VWXO3cS','0777566061','Hà Nội',2,2,'2024-02-08 05:12:36','2024-02-08 05:13:01'),
(95,'Thanh Duc 08','thanhduc08@gmail.com','$2b$10$0rGiAxsM7YwUYxQj9pcUmOM4.TrpZN/UBEmdOkCpOke1sq06oPw4S','0777566061','Phụng Công, Văn Giang, Hưng Yên',3,2,'2024-02-22 04:02:46','2024-02-22 04:03:23'),
(96,'Nguyen Anh Dung','dn427680@gmail.com','$2b$10$E6V5AAqdDt8x6RKvwDwEeOQMcmNRH9kfqOYMJ7KzRnD2mv7VtLefy','0913643164','Nghĩa Hưng, Nam Định',3,2,'2024-02-24 04:05:11','2024-02-24 11:13:49');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=346 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES
(330,'Lập trình',2,'2024-02-01 00:00:00','2024-02-29 00:00:00',168,'2024-02-08 14:06:49','2024-02-24 16:49:15'),
(342,'Fullstack K4000',3,'2024-02-01 00:00:00','2024-02-29 00:00:00',3,'2024-02-20 15:14:21','2024-02-24 12:24:02'),
(343,'Test',1,'2024-02-01 00:00:00','2024-02-29 00:00:00',169,'2024-02-22 03:45:21','2024-02-22 03:45:34');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_otps`
--

DROP TABLE IF EXISTS `user_otps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_otps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `otp` varchar(10) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_otps_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=255 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_otps`
--

LOCK TABLES `user_otps` WRITE;
/*!40000 ALTER TABLE `user_otps` DISABLE KEYS */;
INSERT INTO `user_otps` VALUES
(24,'135',81,'2024-01-10 16:03:44','2024-01-10 15:58:44','2024-01-10 15:58:44'),
(32,'740',90,'2024-02-08 05:06:29','2024-02-08 05:01:29','2024-02-08 05:01:29'),
(42,'1385',94,'2024-02-08 13:37:20','2024-02-08 13:32:20','2024-02-08 13:32:20'),
(193,'9834',92,'2024-02-22 09:08:48','2024-02-22 09:03:48','2024-02-22 09:03:48'),
(249,'6172',1,'2024-02-24 04:18:17','2024-02-24 04:13:17','2024-02-24 04:13:17'),
(252,'2317',96,'2024-02-24 11:01:30','2024-02-24 10:56:30','2024-02-24 10:56:30'),
(254,'4118',95,'2024-02-25 03:24:45','2024-02-25 03:19:45','2024-02-25 03:19:45');
/*!40000 ALTER TABLE `user_otps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students_attendances`
--

DROP TABLE IF EXISTS `students_attendances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students_attendances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateLearning` datetime DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `classId` (`classId`),
  CONSTRAINT `students_attendances_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `students_attendances_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=329 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students_attendances`
--

LOCK TABLES `students_attendances` WRITE;
/*!40000 ALTER TABLE `students_attendances` DISABLE KEYS */;
INSERT INTO `students_attendances` VALUES
(312,'2024-02-01 00:00:00',95,342,0,'2024-02-24 17:02:46','2024-02-24 17:02:46'),
(313,'2024-02-01 00:00:00',95,342,0,'2024-02-24 17:02:46','2024-02-24 17:02:46'),
(314,'2024-02-01 00:00:00',96,342,2,'2024-02-24 17:02:46','2024-02-24 17:02:46'),
(315,'2024-02-01 00:00:00',96,342,2,'2024-02-24 17:02:46','2024-02-24 17:02:46'),
(316,'2024-02-06 00:00:00',96,342,0,'2024-02-24 17:02:46','2024-02-24 17:02:46'),
(317,'2024-02-06 00:00:00',96,342,0,'2024-02-24 17:02:46','2024-02-24 17:02:46'),
(326,'2024-02-01 00:00:00',24,343,1,'2024-02-25 03:34:11','2024-02-25 03:34:11'),
(327,'2024-02-06 00:00:00',24,343,1,'2024-02-25 03:34:11','2024-02-25 03:34:11'),
(328,'2024-02-08 00:00:00',24,343,0,'2024-02-25 03:34:11','2024-02-25 03:34:11');
/*!40000 ALTER TABLE `students_attendances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_tokens`
--

DROP TABLE IF EXISTS `login_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `login_tokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=475 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_tokens`
--

LOCK TABLES `login_tokens` WRITE;
/*!40000 ALTER TABLE `login_tokens` DISABLE KEYS */;
INSERT INTO `login_tokens` VALUES
(63,18,'6dee05be728bb0673d6bb92e786d33fe','2024-01-02 09:15:09','2024-01-02 09:15:09'),
(111,81,'780cbebbcdaf68ad12ea1e8c82c3bb8a','2024-01-10 15:58:51','2024-01-10 15:58:51'),
(154,89,'f5fdae78cb8c4f16831f2b98bf7ea85a','2024-02-05 03:26:24','2024-02-05 03:26:24'),
(173,91,'b1cae42877abf8c62b29a405ae894698','2024-02-08 04:56:45','2024-02-08 04:56:45'),
(177,90,'efce30463cab339f30a5e8a3917073bc','2024-02-08 05:01:37','2024-02-08 05:01:37'),
(180,93,'84b99684683b4ed84592637043fb71ad','2024-02-08 05:04:43','2024-02-08 05:04:43'),
(186,94,'a929156e2287adad5bb5d68db89f966c','2024-02-08 09:42:49','2024-02-08 09:42:49'),
(429,96,'32bfd5a80496c3738387210678142d65','2024-02-24 04:20:32','2024-02-24 04:20:32'),
(468,95,'529f5fe50518459335fb2ac854b3de59','2024-02-25 03:20:08','2024-02-25 03:20:08'),
(473,92,'c34391c87a5d69c536fb679aa19fa082','2024-02-25 03:35:49','2024-02-25 03:35:49'),
(474,1,'4235fe910256c38a56962c123aaca31f','2024-02-25 08:04:26','2024-02-25 08:04:26');
/*!40000 ALTER TABLE `login_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_socials`
--

DROP TABLE IF EXISTS `user_socials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_socials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `provider` varchar(100) DEFAULT NULL,
  `providerId` varchar(100) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_socials_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_socials`
--

LOCK TABLES `user_socials` WRITE;
/*!40000 ALTER TABLE `user_socials` DISABLE KEYS */;
INSERT INTO `user_socials` VALUES
(23,92,'google','109647601622525463405','ndt.ducthanh04@gmail.com','2024-02-22 10:15:14','2024-02-22 10:15:14'),
(28,92,'github','131628052',NULL,'2024-02-22 16:26:07','2024-02-22 16:26:07'),
(29,96,'google','101458742409651286250','dn427680@gmail.com','2024-02-24 04:20:17','2024-02-24 04:20:17'),
(30,1,'google','104369195471620951768','dducthanh04@gmail.com','2024-02-24 17:14:50','2024-02-24 17:14:50');
/*!40000 ALTER TABLE `user_socials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module_documents`
--

DROP TABLE IF EXISTS `module_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `module_documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pathName` varchar(200) DEFAULT NULL,
  `moduleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `moduleId` (`moduleId`),
  CONSTRAINT `module_documents_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `course_modules` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module_documents`
--

LOCK TABLES `module_documents` WRITE;
/*!40000 ALTER TABLE `module_documents` DISABLE KEYS */;
INSERT INTO `module_documents` VALUES
(2,'https://fullstack.edu.vn/learning/javascript-nang-cao?id=11909e23-09bf-48af-9718-7b474d8c343bsend',2,'2024-01-30 02:53:08','2024-01-30 02:53:08'),
(3,'http://127.0.0.1:3000/admin/addDocument/3',3,'2024-01-30 03:19:44','2024-01-30 03:19:44'),
(4,'http://127.0.0.1:3000/admin/addDocument/3',3,'2024-01-30 02:52:02','2024-01-30 02:52:02'),
(5,'https://fullstack.edu.vn/learning/nodejs?id=4b5a2766-dbd7-470b-83e8-c84f4a37d550',NULL,'2024-01-30 03:50:21','2024-01-30 03:50:21'),
(6,'https://fullstack.edu.vn/learning/nodejs?id=4b5a2766-dbd7-470b-83e8-c84f4a37d550',NULL,'2024-01-30 03:52:16','2024-01-30 03:52:16'),
(7,'https://fullstack.edu.vn/learning/nodejs?id=4b5a2766-dbd7-470b-83e8-c84f4a37d550',NULL,'2024-01-30 03:54:44','2024-01-30 03:54:44'),
(8,'https://fullstack.edu.vn/learning/nodejs?id=4b5a2766-dbd7-470b-83e8-c84f4a37d550',NULL,'2024-01-30 03:55:14','2024-01-30 03:55:14'),
(9,'aaaaaaaaaaaaaaaaa',NULL,'2024-01-30 03:55:47','2024-01-30 03:55:47'),
(11,'https://fullstack.edu.vn/learning/windows-terminal-wsl?id=a36f3da9-4555-4b74-b779-665d07102e23',2,'2024-01-30 03:59:53','2024-01-30 03:59:53'),
(50,'https://fullstack.edu.vn/learning/html-css?id=4fa93b5a-f764-443f-8991-aeeac35ec986',2,'2024-02-06 04:21:29','2024-02-06 04:21:29'),
(57,'https://fullstack.edu.vn/learning/nodejs?id=4b5a2766-dbd7-470b-83e8-c84f4a37d550',9,'2024-02-20 13:22:02','2024-02-20 13:22:02'),
(58,'link tai lieu update teacher',9,'2024-02-20 13:22:02','2024-02-20 13:22:02'),
(59,'kaka',9,'2024-02-20 13:22:17','2024-02-20 13:22:17'),
(60,'https://fullstack.edu.vn/learning/javascript-nang-cao?id=11909e23-09bf-48af-9718-7b474d8c343bsend',10,'2024-02-20 15:48:38','2024-02-20 15:48:38'),
(61,'http://127.0.0.1:3000/admin/addDocument/3',10,'2024-02-20 15:49:22','2024-02-20 15:49:22'),
(62,'https://fullstack.edu.vn/learning/javascript-nang-cao?id=11909e23-09bf-48af-9718-7b474d8c343bsend',11,'2024-02-24 03:52:34','2024-02-24 03:52:34'),
(63,'https://fullstack.edu.vn/learning/javascript-nang-cao?id=11909e23-09bf-48af-9718-7b474d8c343bsend',2,'2024-02-25 02:17:14','2024-02-25 02:17:14'),
(65,'link tai lieu update',13,'2024-02-25 02:33:12','2024-02-25 02:33:12'),
(66,'https://fullstack.edu.vn/learning/javascript-nang-cao?id=11909e23-09bf-48af-9718-7b474d8c343bsend',14,'2024-02-25 02:34:05','2024-02-25 02:34:05'),
(67,'http://127.0.0.1:3000/admin/addDocument/3',14,'2024-02-25 02:37:50','2024-02-25 02:37:50');
/*!40000 ALTER TABLE `module_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES
(1,'Super Admin','2024-02-06 09:19:58','2024-02-20 14:11:39'),
(2,'Manager','2024-02-06 11:27:28','2024-02-20 16:09:01'),
(3,'Admin','2024-02-07 02:13:04','2024-02-20 16:13:19'),
(5,'Student','2024-02-22 04:24:22','2024-02-22 04:32:17');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permission`
--

DROP TABLE IF EXISTS `user_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `permissionId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `user_permission_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_permission_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permission`
--

LOCK TABLES `user_permission` WRITE;
/*!40000 ALTER TABLE `user_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_courses`
--

DROP TABLE IF EXISTS `student_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL,
  `completedDate` datetime DEFAULT NULL,
  `dropDate` datetime DEFAULT NULL,
  `recover` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `courseId` (`courseId`),
  KEY `statusId` (`statusId`),
  CONSTRAINT `student_courses_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `student_courses_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `student_courses_ibfk_3` FOREIGN KEY (`statusId`) REFERENCES `learning_statuses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_courses`
--

LOCK TABLES `student_courses` WRITE;
/*!40000 ALTER TABLE `student_courses` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learning_statuses`
--

DROP TABLE IF EXISTS `learning_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `learning_statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learning_statuses`
--

LOCK TABLES `learning_statuses` WRITE;
/*!40000 ALTER TABLE `learning_statuses` DISABLE KEYS */;
INSERT INTO `learning_statuses` VALUES
(3,'Đang học','2024-02-01 00:00:00','2024-02-01 00:00:00'),
(4,'Bảo lưu','2024-02-01 00:00:00','2024-02-01 00:00:00'),
(5,'Thôi học','2024-02-01 00:00:00','2024-02-01 00:00:00'),
(6,'Hoàn thành','2024-02-01 00:00:00','2024-02-01 00:00:00');
/*!40000 ALTER TABLE `learning_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_modules`
--

DROP TABLE IF EXISTS `course_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `course_modules_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_modules`
--

LOCK TABLES `course_modules` WRITE;
/*!40000 ALTER TABLE `course_modules` DISABLE KEYS */;
INSERT INTO `course_modules` VALUES
(2,'Javascript',3,'2024-01-30 02:53:08','2024-01-30 02:53:08'),
(3,'HTML',3,'2024-01-30 03:19:44','2024-01-30 03:19:44'),
(9,'IOT',168,'2024-02-09 04:22:40','2024-02-20 13:22:02'),
(10,'CNTT 16-09',168,'2024-02-20 15:48:38','2024-02-20 15:48:38'),
(11,'CNTT 16-09',169,'2024-02-24 03:52:34','2024-02-24 03:52:34'),
(13,'Nguyễn Thanh',3,'2024-02-25 02:33:12','2024-02-25 02:33:12'),
(14,'Sơn Đặng',3,'2024-02-25 02:34:05','2024-02-25 02:34:05');
/*!40000 ALTER TABLE `course_modules` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-25 21:11:24
