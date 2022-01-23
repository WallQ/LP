-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lp
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `idcard` int unsigned NOT NULL AUTO_INCREMENT,
  `deck_iddeck` int NOT NULL,
  `value` int NOT NULL,
  `description` mediumtext NOT NULL,
  `imagePath` varchar(45) NOT NULL,
  PRIMARY KEY (`idcard`,`deck_iddeck`),
  KEY `fk_card_deck1_idx` (`deck_iddeck`),
  CONSTRAINT `fk_card_deck1` FOREIGN KEY (`deck_iddeck`) REFERENCES `deck` (`iddeck`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (1,1,25,'Ace of Spades','ace_of_spades.svg'),(2,1,25,'Ace of Clubs','ace_of_clubs.svg'),(3,1,25,'Ace of Diamonds','ace_of_diamonds.svg'),(4,1,25,'Ace of Hearts','ace_of_hearts.svg'),(5,1,5,'2 of Spades','2_of_spades.svg'),(6,1,5,'2 of Clubs','2_of_clubs.svg'),(7,1,5,'2 of Diamonds','2_of_diamonds.svg'),(8,1,5,'2 of Hearts','2_of_hearts.svg'),(9,1,5,'3 of Spades','3_of_spades.svg'),(10,1,5,'3 of Clubs','3_of_clubs.svg'),(11,1,5,'3 of Diamonds','3_of_diamonds.svg'),(12,1,5,'3 of Hearts','3_of_hearts.svg'),(13,1,5,'4 of Spades','4_of_spades.svg'),(14,1,5,'4 of Clubs','4_of_clubs.svg'),(15,1,5,'4 of Diamonds','4_of_diamonds.svg'),(16,1,5,'4 of Hearts','4_of_hearts.svg'),(17,1,5,'4 of Spades','4_of_spades.svg'),(18,1,5,'4 of Clubs','4_of_clubs.svg'),(19,1,5,'4 of Diamonds','4_of_diamonds.svg'),(20,1,5,'4 of Hearts','4_of_hearts.svg'),(21,1,5,'5 of Spades','5_of_spades.svg'),(22,1,5,'5 of Clubs','5_of_clubs.svg'),(23,1,5,'5 of Diamonds','5_of_diamonds.svg'),(24,1,5,'5 of Hearts','5_of_hearts.svg'),(25,1,5,'6 of Spades','6_of_spades.svg'),(26,1,5,'6 of Clubs','6_of_clubs.svg'),(27,1,5,'6 of Diamonds','6_of_diamonds.svg'),(28,1,5,'6 of Hearts','6_of_hearts.svg'),(29,1,5,'7 of Spades','7_of_spades.svg'),(30,1,5,'7 of Clubs','7_of_clubs.svg'),(31,1,5,'7 of Diamonds','7_of_diamonds.svg'),(32,1,5,'7 of Hearts','7_of_hearts.svg'),(33,1,5,'8 of Spades','8_of_spades.svg'),(34,1,5,'8 of Clubs','8_of_clubs.svg'),(35,1,5,'8 of Diamonds','8_of_diamonds.svg'),(36,1,5,'8 of Hearts','8_of_hearts.svg'),(37,1,5,'9 of Spades','9_of_spades.svg'),(38,1,5,'9 of Clubs','9_of_clubs.svg'),(39,1,5,'9 of Diamonds','9_of_diamonds.svg'),(40,1,5,'9 of Hearts','9_of_hearts.svg'),(41,1,5,'10 of Spades','10_of_spades.svg'),(42,1,5,'10 of Clubs','10_of_clubs.svg'),(43,1,5,'10 of Diamonds','10_of_diamonds.svg'),(44,1,5,'10 of Hearts','10_of_hearts.svg'),(45,1,5,'11 of Spades','11_of_spades.svg'),(46,1,5,'11 of Clubs','11_of_clubs.svg'),(47,1,5,'11 of Diamonds','11_of_diamonds.svg'),(48,1,5,'11 of Hearts','11_of_hearts.svg'),(49,1,10,'Queen of Spades','queen_of_spades.svg'),(50,1,10,'Queen of Clubs','queen_of_clubs.svg'),(51,1,10,'Queen of Diamonds','queen_of_diamonds.svg'),(52,1,10,'Queen of Hearts','queen_of_hearts.svg'),(53,1,15,'Jack of Spades','jack_of_spades.svg'),(54,1,15,'Jack of Clubs','jack_of_clubs.svg'),(55,1,15,'Jack of Diamonds','jack_of_diamonds.svg'),(56,1,15,'Jack of Hearts','jack_of_hearts.svg'),(57,1,20,'King of Spades','king_of_spades.svg'),(58,1,20,'King of Clubs','king_of_clubs.svg'),(59,1,20,'King of Diamonds','king_of_diamonds.svg'),(60,1,20,'King of Hearts','king_of_hearts.svg'),(61,1,30,'Jocker Black','joker_black.svg'),(62,1,30,'Joker Red','joker_red.svg');
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_time`
--

DROP TABLE IF EXISTS `card_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_time` (
  `card_idcard` int unsigned NOT NULL,
  `history_workout_idworkout` int NOT NULL,
  `history_users_idusers` int NOT NULL,
  `timePerCard` int NOT NULL,
  PRIMARY KEY (`card_idcard`,`history_workout_idworkout`,`history_users_idusers`),
  KEY `fk_card_has_history_history1_idx` (`history_workout_idworkout`,`history_users_idusers`),
  CONSTRAINT `fk_card_has_history_card1` FOREIGN KEY (`card_idcard`) REFERENCES `card` (`idcard`),
  CONSTRAINT `fk_card_has_history_history1` FOREIGN KEY (`history_workout_idworkout`) REFERENCES `history` (`workout_idworkout`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_time`
--

LOCK TABLES `card_time` WRITE;
/*!40000 ALTER TABLE `card_time` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_workout`
--

DROP TABLE IF EXISTS `card_workout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_workout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `card_idcard` int unsigned NOT NULL,
  `workout_idworkout` int NOT NULL,
  PRIMARY KEY (`id`,`card_idcard`,`workout_idworkout`),
  KEY `fk_card_has_workout_workout1_idx` (`workout_idworkout`),
  KEY `fk_card_has_workout_card1` (`card_idcard`),
  CONSTRAINT `fk_card_has_workout_card1` FOREIGN KEY (`card_idcard`) REFERENCES `card` (`idcard`),
  CONSTRAINT `fk_card_has_workout_workout1` FOREIGN KEY (`workout_idworkout`) REFERENCES `workout` (`idworkout`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_workout`
--

LOCK TABLES `card_workout` WRITE;
/*!40000 ALTER TABLE `card_workout` DISABLE KEYS */;
INSERT INTO `card_workout` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,1),(5,5,1),(6,6,1),(7,7,1),(8,8,1),(9,9,1),(10,10,1),(11,11,1),(12,12,1),(13,13,1),(14,14,1),(15,15,1),(16,16,1),(17,17,1),(18,18,1),(19,19,1),(20,20,1),(21,21,1),(22,22,1),(23,23,1),(24,24,1),(25,25,1),(26,26,1),(27,27,1),(28,28,1),(29,29,1),(30,30,1),(31,31,1),(32,32,1),(33,33,1),(34,34,1),(35,35,1),(36,36,1),(37,37,1),(38,38,1),(39,39,1),(40,40,1),(41,41,1),(42,42,1),(43,43,1),(44,44,1),(45,45,1),(46,46,1),(47,47,1),(48,48,1),(49,49,1),(50,50,1),(51,51,1),(52,52,1),(53,53,1),(54,54,1),(55,55,1),(56,56,1),(57,57,1),(58,58,1),(59,59,1),(60,60,1),(61,61,1),(62,62,1);
/*!40000 ALTER TABLE `card_workout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deck`
--

DROP TABLE IF EXISTS `deck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deck` (
  `iddeck` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` mediumtext NOT NULL,
  PRIMARY KEY (`iddeck`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deck`
--

LOCK TABLES `deck` WRITE;
/*!40000 ALTER TABLE `deck` DISABLE KEYS */;
INSERT INTO `deck` VALUES (1,'Deck easy','Beginner'),(2,'Deck medium','Intermedium'),(3,'Deck hard','Veteran'),(4,'Deck expert','Super Man');
/*!40000 ALTER TABLE `deck` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise`
--

DROP TABLE IF EXISTS `exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise` (
  `idExercise` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`idExercise`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise`
--

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
INSERT INTO `exercise` VALUES (1,'Jump rope','N/A'),(2,'Running','N/A'),(3,'Hula-hooping','N/A'),(4,'Jumping jacks','N/A'),(5,'Push-up','N/A'),(6,'Pull-up','N/A'),(7,'Bench press','N/A'),(8,'Dip','N/A'),(9,'Plank','N/A'),(10,'Abdominals','N/A'),(11,'Butterfly groin','N/A'),(12,'Crossack squat','N/A'),(13,'Pistol Squat','N/A'),(14,'Single leg lift','N/A'),(15,'Pilates','N/A'),(16,'Tree pose','N/A');
/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_has_workout`
--

DROP TABLE IF EXISTS `exercise_has_workout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_has_workout` (
  `exercise_idExercise` int NOT NULL,
  `workout_idworkout` int NOT NULL,
  `nipe` enum('Spades','Clubs','Diamonds','Hearts','Joker') NOT NULL,
  PRIMARY KEY (`exercise_idExercise`,`workout_idworkout`),
  KEY `fk_exercice_has_workout_workout1_idx` (`workout_idworkout`),
  KEY `fk_exercice_has_workout_exercice1_idx` (`exercise_idExercise`),
  CONSTRAINT `fk_exercice_has_workout_workout1` FOREIGN KEY (`workout_idworkout`) REFERENCES `workout` (`idworkout`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_has_workout`
--

LOCK TABLES `exercise_has_workout` WRITE;
/*!40000 ALTER TABLE `exercise_has_workout` DISABLE KEYS */;
INSERT INTO `exercise_has_workout` VALUES (1,1,'Spades'),(2,1,'Clubs'),(3,1,'Diamonds'),(4,1,'Hearts'),(5,2,'Spades'),(6,2,'Clubs'),(7,2,'Diamonds'),(8,2,'Hearts'),(9,3,'Spades'),(10,3,'Clubs'),(11,3,'Diamonds'),(12,3,'Hearts'),(13,4,'Spades'),(14,4,'Clubs'),(15,4,'Diamonds'),(16,4,'Hearts');
/*!40000 ALTER TABLE `exercise_has_workout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `workout_idworkout` int NOT NULL,
  `user_iduser` int NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `breakTime` int NOT NULL,
  PRIMARY KEY (`workout_idworkout`,`user_iduser`),
  KEY `fk_workout_has_users_workout1_idx` (`workout_idworkout`),
  KEY `fk_history_user1_idx` (`user_iduser`),
  CONSTRAINT `fk_history_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`),
  CONSTRAINT `fk_workout_has_users_workout1` FOREIGN KEY (`workout_idworkout`) REFERENCES `workout` (`idworkout`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `iduser` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` longtext NOT NULL,
  `role` enum('User','Admin') NOT NULL DEFAULT 'User',
  `phoneNumber` int DEFAULT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Sérgio Félix','8200615@estg.ipp.pt','$2b$10$30VFF2g.Xq5n0nkcZ9By/e6CLLSl8cHckzmGamrXa3E3jx0C8Pn.C','Admin',916275619);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workout`
--

DROP TABLE IF EXISTS `workout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workout` (
  `idworkout` int NOT NULL AUTO_INCREMENT,
  `imagePath` varchar(45) NOT NULL,
  `name` enum('Aerobic','Strength','Stretching','Balance') NOT NULL,
  PRIMARY KEY (`idworkout`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workout`
--

LOCK TABLES `workout` WRITE;
/*!40000 ALTER TABLE `workout` DISABLE KEYS */;
INSERT INTO `workout` VALUES (1,'aerobic.png','Aerobic'),(2,'strength.png','Strength'),(3,'stretching.png','Stretching'),(4,'balance.png','Balance');
/*!40000 ALTER TABLE `workout` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-23 21:12:34
