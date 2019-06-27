-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: sbs
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `sbs`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `sbs` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `sbs`;

--
-- Table structure for table `abonelik_turleri`
--

DROP TABLE IF EXISTS `abonelik_turleri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `abonelik_turleri` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `abonlikTipAdi` varchar(45) NOT NULL,
  `abonelikUcret` decimal(12,0) NOT NULL DEFAULT '0',
  `abonelikGecerlilik` int(11) NOT NULL DEFAULT '0',
  `abonelikGecerlilikPromosyon` int(11) DEFAULT '0',
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abonelik_turleri`
--

LOCK TABLES `abonelik_turleri` WRITE;
/*!40000 ALTER TABLE `abonelik_turleri` DISABLE KEYS */;
INSERT INTO `abonelik_turleri` VALUES (1,'DENEME SÜRÜMÜ',0,0,1,0),(2,'3 AYLIK KEŞFET PAKETİ',150,3,1,0),(3,'12 AYLIK AVANTAJ PAKET',125,12,1,0);
/*!40000 ALTER TABLE `abonelik_turleri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `abonelikler`
--

DROP TABLE IF EXISTS `abonelikler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `abonelikler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `abonelikleraboneTipId` int(11) NOT NULL,
  `firmaId` int(11) NOT NULL,
  `abonelikBasTar` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `abonelikBitTar` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `abonelikKayitTar` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `abonelikOdemeDurum` int(11) NOT NULL DEFAULT '0',
  `abonelikOdemeTipi` int(11) DEFAULT '0',
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abonelikler`
--

LOCK TABLES `abonelikler` WRITE;
/*!40000 ALTER TABLE `abonelikler` DISABLE KEYS */;
INSERT INTO `abonelikler` VALUES (1,3,1,'2019-05-16 00:00:00','2020-05-16 00:00:00','2019-05-16 12:24:02',1,2,0),(16,1,26,'2019-05-20 13:54:15','2019-05-20 13:54:15','2019-05-20 13:54:15',0,1,0),(21,1,31,'2019-05-30 15:52:00','2019-05-30 15:52:00','2019-05-30 15:52:00',0,1,0),(22,1,32,'2019-05-30 16:09:34','2019-05-30 16:09:34','2019-05-30 16:09:34',0,1,0),(23,1,33,'2019-05-30 16:13:17','2019-05-30 16:13:17','2019-05-30 16:13:17',0,1,0);
/*!40000 ALTER TABLE `abonelikler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anket_soru_tipleri`
--

DROP TABLE IF EXISTS `anket_soru_tipleri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `anket_soru_tipleri` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `soruTipiAdi` varchar(45) NOT NULL,
  `cevapTipi` varchar(45) NOT NULL,
  `icerik` text,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anket_soru_tipleri`
--

LOCK TABLES `anket_soru_tipleri` WRITE;
/*!40000 ALTER TABLE `anket_soru_tipleri` DISABLE KEYS */;
INSERT INTO `anket_soru_tipleri` VALUES (1,'yazi','text','<div class=\"anket row ui-sortable-handle\"><div class=\"col-md-3\"><div class=\"row\"><div class=\"col-md-8\"><label>Soru</label></div><div class=\"col-md-4\"><label>:</label></div></div></div><div class=\"col-md-9\"><input class=\"form-control\" type=\"text\"></div><br><div class=\"col-md-3\"><div class=\"row\"><div class=\"col-md-8\"><label>Cevap</label></div><div class=\"col-md-4\"><label>: </label></div></div></div><div class=\"col-md-9\"><input class=\"form-control\" disabled=\"\" type=\"text\"></div></div>',0),(2,'sayi','number','<div class=\"anket row ui-sortable-handle\"><div class=\"col-md-3\"><div class=\"row\"><div class=\"col-md-8\"><label>Soru</label></div><div class=\"col-md-4\"><label>:</label></div></div></div><div class=\"col-md-9\"><input class=\"form-control\" type=\"text\"></div><br><div class=\"col-md-3\"><div class=\"row\"><div class=\"col-md-8\"><label>Cevap</label></div><div class=\"col-md-4\"><label>: </label></div></div></div><div class=\"col-md-9\"><input class=\"form-control\" disabled=\"\" type=\"number\" value=\"0\"></div></div>',0),(3,'tarih','date','<div class=\"anket row ui-sortable-handle\"><div class=\"col-md-3\"><div class=\"row\"><div class=\"col-md-8\"><label>Soru</label></div><div class=\"col-md-4\"><label>:</label></div></div></div><div class=\"col-md-9\"><input class=\"form-control\" type=\"text\"></div><br><div class=\"col-md-3\"><div class=\"row\"><div class=\"col-md-8\"><label>Cevap</label></div><div class=\"col-md-4\"><label>: </label></div></div></div><div class=\"col-md-9\"><input class=\"form-control\" disabled=\"\" type=\"date\"></div></div>',0),(4,'tekSecimButton','radio','<div class=\"anket row ui-sortable-handle\">    <div class=\"col-sm-3\">        <div class=\"row\">            <div class=\"col-sm-8\"><label>Soru</label></div>            <div class=\"col-sm-4\"><label>:</label></div>        </div>    </div>    <div class=\"col-sm-9\"><input class=\"form-control\" type=\"text\"></div><br>    <div class=\"col-sm-3\">        <div class=\"row\">            <div class=\"col-sm-8\"><label>Cevap</label></div>            <div class=\"col-sm-3\"><label>: </label></div>            <div class=\"col-sm-1 miniButton\"><button method=\"addItem\" class=\"btn btn-sm btn-outline-success\"                    type=\"button\"><i class=\"nc-icon nc-simple-add\"></i></button></div>        </div>    </div>    <div class=\"col-sm-9 items\">        <div class=\"row\">            <div class=\"col-sm-1\">                <div class=\"form-check-radio\"><label class=\"form-check-label\"><input class=\"form-check-input\"                            id=\"exampleRadios12\" type=\"radio\" value=\"option2\" checked=\"\"> <span                            class=\"form-check-sign\"></span></label></div>            </div>            <div class=\"col-sm-10\"><input class=\"form-control\" type=\"text\"></div>            <div class=\"col-sm-1 miniButton\"><button method=\"removeItem\" class=\"btn btn-sm btn-outline-danger\"                    type=\"button\"><i class=\"nc-icon nc-simple-remove\"></i></button></div>        </div>        <div class=\"row copy\">            <div class=\"col-sm-1\">                <div class=\"form-check-radio\"><label class=\"form-check-label\"><input class=\"form-check-input\"                            id=\"exampleRadios12\" type=\"radio\" value=\"option2\" checked=\"\"> <span                            class=\"form-check-sign\"></span></label></div>            </div>            <div class=\"col-sm-10\"><input class=\"form-control\" type=\"text\"></div>            <div class=\"col-sm-1 miniButton\"><button method=\"removeItem\" class=\"btn btn-sm btn-outline-danger\"                    type=\"button\"><i class=\"nc-icon nc-simple-remove\"></i></button></div>        </div>    </div></div>',0),(5,'tekSecimKutuSecim','select','<div class=\"anket row ui-sortable-handle\">    <div class=\"col-sm-3\">        <div class=\"row\">            <div class=\"col-sm-8\"><label>Soru</label></div>            <div class=\"col-sm-4\"><label>:</label></div>        </div>    </div>    <div class=\"col-sm-9\"><input class=\"form-control\" type=\"text\"></div><br>    <div class=\"col-sm-3\">        <div class=\"row\">            <div class=\"col-sm-8\"><label>Cevap</label></div>            <div class=\"col-sm-3\"><label>: </label></div>            <div class=\"col-sm-1 miniButton\"><button method=\"addItem\" class=\"btn btn-sm btn-outline-success\"                    type=\"button\"><i class=\"nc-icon nc-simple-add\"></i></button></div>        </div>    </div>    <div class=\"col-sm-9 items\">        <div class=\"row\">            <div class=\"col-sm-3\"><select class=\"custom-select\" disabled=\"\">                    <option value=\"\" selected=\"\">seciniz</option>                </select></div>            <div class=\"col-sm-8\"><input class=\"form-control\" type=\"text\"></div>            <div class=\"col-sm-1 miniButton\"><button method=\"removeItem\" class=\"btn btn-sm btn-outline-danger\"                    type=\"button\"><i class=\"nc-icon nc-simple-remove\"></i></button></div>        </div>        <div class=\"row copy\">            <div class=\"col-sm-3\"><select class=\"custom-select\" disabled=\"\">                    <option value=\"\" selected=\"\">seciniz</option>                </select></div>            <div class=\"col-sm-8\"><input class=\"form-control\" type=\"text\"></div>            <div class=\"col-sm-1 miniButton\"><button method=\"removeItem\" class=\"btn btn-sm btn-outline-danger\"                    type=\"button\"><i class=\"nc-icon nc-simple-remove\"></i></button></div>        </div>    </div></div>',0),(6,'cokluSecim','checkbox','<div class=\"anket row ui-sortable-handle\" style=\"\">    <div class=\"col-sm-3\">        <div class=\"row\">            <div class=\"col-sm-8\"><label>Soru</label></div>            <div class=\"col-sm-4\"><label>:</label></div>        </div>    </div>    <div class=\"col-sm-9\"><input class=\"form-control\" type=\"text\"></div><br>    <div class=\"col-sm-3\">        <div class=\"row\">            <div class=\"col-sm-8\"><label>Cevap</label></div>            <div class=\"col-sm-3\"><label>: </label></div>            <div class=\"col-sm-1 miniButton\"><button method=\"addItem\" class=\"btn btn-sm btn-outline-success\"                    type=\"button\"><i class=\"nc-icon nc-simple-add\"></i></button></div>        </div>    </div>    <div class=\"col-sm-9 items\">        <div class=\"row\">            <div class=\"col-sm-1\" style=\"margin-top: -9px;\">                <div class=\"form-check form-check-inline\"><label class=\"form-check-label\"><input                            class=\"form-check-input\" type=\"checkbox\" disabled=\"\" checked=\"\"><span                            class=\"form-check-sign\"></span> </label></div>            </div>            <div class=\"col-sm-10\"><input class=\"form-control\" type=\"text\"></div>            <div class=\"col-sm-1 miniButton\"><button method=\"removeItem\" class=\"btn btn-sm btn-outline-danger\"                    type=\"button\"><i class=\"nc-icon nc-simple-remove\"></i></button></div>        </div>        <div class=\"row copy\">            <div class=\"col-sm-1\" style=\"margin-top: -9px;\">                <div class=\"form-check form-check-inline\"><label class=\"form-check-label\"><input                            class=\"form-check-input\" type=\"checkbox\" disabled=\"\" checked=\"\"><span                            class=\"form-check-sign\"></span> </label></div>            </div>            <div class=\"col-sm-10\"><input class=\"form-control\" type=\"text\"></div>            <div class=\"col-sm-1 miniButton\"><button method=\"removeItem\" class=\"btn btn-sm btn-outline-danger\"                    type=\"button\"><i class=\"nc-icon nc-simple-remove\"></i></button></div>        </div>    </div></div>',0);
/*!40000 ALTER TABLE `anket_soru_tipleri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dbler`
--

DROP TABLE IF EXISTS `dbler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `dbler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firmaId` int(11) NOT NULL,
  `dbAdi` varchar(45) NOT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dbler`
--

LOCK TABLES `dbler` WRITE;
/*!40000 ALTER TABLE `dbler` DISABLE KEYS */;
INSERT INTO `dbler` VALUES (1,31,'sbs_comp_31',0),(2,32,'sbs_comp_32',0),(3,2,'sbs_comp_2',0);
/*!40000 ALTER TABLE `dbler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diller`
--

DROP TABLE IF EXISTS `diller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `diller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dilKodu` varchar(45) NOT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diller`
--

LOCK TABLES `diller` WRITE;
/*!40000 ALTER TABLE `diller` DISABLE KEYS */;
INSERT INTO `diller` VALUES (1,'tr',0),(2,'eng',0);
/*!40000 ALTER TABLE `diller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `firmalar`
--

DROP TABLE IF EXISTS `firmalar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `firmalar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firmaAdi` varchar(100) NOT NULL,
  `firmaAdres` text,
  `firmaIli` int(11) NOT NULL DEFAULT '0',
  `firmaTel` varchar(45) DEFAULT NULL,
  `firmaFaks` varchar(45) DEFAULT NULL,
  `firmaEPosta` varchar(100) DEFAULT NULL,
  `firmaVergiDairesi` varchar(100) DEFAULT NULL,
  `firmaVergiNo` varchar(45) DEFAULT NULL,
  `firmaMernis` varchar(45) DEFAULT NULL,
  `firmaYetkiliKisiAdi` varchar(100) DEFAULT NULL,
  `firmaYetkiliKisiSoyadi` varchar(100) DEFAULT NULL,
  `firmaYetkiliKisiTel` varchar(45) DEFAULT NULL,
  `firmaLogo` varchar(200) NOT NULL DEFAULT 'nologo.jpg',
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `firmalar`
--

LOCK TABLES `firmalar` WRITE;
/*!40000 ALTER TABLE `firmalar` DISABLE KEYS */;
INSERT INTO `firmalar` VALUES (1,'UGMSOFT','ÇANKAYA',6,'03121234567','03121234566','info@ugmsoft.com','KURUMLAR','1234561234','1326548798754654','EMRE','KARA','05423432223','nologo.jpg',0),(26,'İNTERSAN','tandoğan',6,'533454972','446545353','yunusemrahdursun@gmail.com','VERGI DAIRESI','vergi no',NULL,'YUNUS EMRAH','DURSUN','(537) 785-7448','nologo.jpg',0),(31,'TURAY','aadadas',6,'(111) 111-1111','131313','yunusemrahdursun@gmail.com','13123131','1311231',NULL,'AAAAA','AAAAAAAAAA','(111) 111-1111','nologo.jpg',0),(32,'AAAAAA','aaaaaaa',3,'(111) 111-1111','aaaaaaaaaaaaaaa','yunusemrahdursun@gmail.com','AAAAAA','aaaaaaaaa',NULL,'AAAAA','AAAAAAAAAAAAA','(111) 111-1111','nologo.jpg',0),(33,'AAAAAA','aaaaaaa',3,'(111) 111-1111','aaaaaaaaaaaaaaa','yunusemrahdursun@gmail.com','AAAAAA','aaaaaaaaa',NULL,'YUNUS','AAAAAAAAAAAAA','(111) 111-1111','nologo.jpg',0);
/*!40000 ALTER TABLE `firmalar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iller`
--

DROP TABLE IF EXISTS `iller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `iller` (
  `il_id` int(11) NOT NULL AUTO_INCREMENT,
  `il_adi` varchar(100) NOT NULL,
  `plaka_no` int(11) NOT NULL,
  `tel_kod` varchar(7) NOT NULL,
  `silindiMi` int(11) DEFAULT '0',
  PRIMARY KEY (`il_id`),
  UNIQUE KEY `il_id_UNIQUE` (`il_id`),
  KEY `CityID` (`il_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iller`
--

LOCK TABLES `iller` WRITE;
/*!40000 ALTER TABLE `iller` DISABLE KEYS */;
INSERT INTO `iller` VALUES (1,'ADANA',1,'322',0),(2,'ADIYAMAN',2,'416',0),(3,'AFYONKARAHİSAR',3,'272',0),(4,'AĞRI',4,'472',0),(5,'AKSARAY',68,'382',0),(6,'AMASYA',5,'358',0),(7,'ANKARA',6,'312',0),(8,'ANTALYA',7,'242',0),(9,'ARDAHAN',75,'478',0),(10,'ARTVİN',8,'466',0),(11,'AYDIN',9,'256',0),(12,'BALIKESİR',10,'266',0),(13,'BARTIN',74,'378',0),(14,'BATMAN',72,'488',0),(15,'BAYBURT',69,'458',0),(16,'BİLECİK',11,'228',0),(17,'BİNGÖL',12,'426',0),(18,'BİTLİS',13,'434',0),(19,'BOLU',14,'374',0),(20,'BURDUR',15,'248',0),(21,'BURSA',16,'224',0),(22,'ÇANAKKALE',17,'286',0),(23,'ÇANKIRI',18,'376',0),(24,'ÇORUM',19,'364',0),(25,'DENİZLİ',20,'258',0),(26,'DİYARBAKIR',21,'412',0),(27,'DÜZCE',81,'380',0),(28,'EDİRNE',22,'284',0),(29,'ELAZIĞ',23,'424',0),(30,'ERZİNCAN',24,'446',0),(31,'ERZURUM',25,'442',0),(32,'ESKİŞEHİR',26,'222',0),(33,'GAZİANTEP',27,'342',0),(34,'GİRESUN',28,'454',0),(35,'GÜMÜŞHANE',29,'456',0),(36,'HAKKARİ',30,'438',0),(37,'HATAY',31,'326',0),(38,'IĞDIR',76,'476',0),(39,'ISPARTA',32,'246',0),(40,'İSTANBUL',34,'212-216',0),(41,'İZMİR',35,'232',0),(42,'KAHRAMANMARAŞ',46,'344',0),(43,'KARABÜK',78,'370',0),(44,'KARAMAN',70,'338',0),(45,'KARS',36,'474',0),(46,'KASTAMONU',37,'366',0),(47,'KAYSERİ',38,'352',0),(48,'KIRIKKALE',71,'318',0),(49,'KIRKLARELİ',39,'288',0),(50,'KIRŞEHİR',40,'386',0),(51,'KİLİS',79,'348',0),(52,'KOCAELİ',41,'262',0),(53,'KONYA',42,'332',0),(54,'KÜTAHYA',43,'274',0),(55,'MALATYA',44,'422',0),(56,'MANİSA',45,'236',0),(57,'MARDİN',47,'482',0),(58,'MERSİN',33,'324',0),(59,'MUĞLA',48,'252',0),(60,'MUŞ',49,'436',0),(61,'NEVŞEHİR',50,'384',0),(62,'NİĞDE',51,'388',0),(63,'ORDU',52,'452',0),(64,'OSMANİYE',80,'328',0),(65,'RİZE',53,'464',0),(66,'SAKARYA',54,'264',0),(67,'SAMSUN',55,'362',0),(68,'SİİRT',56,'484',0),(69,'SİNOP',57,'368',0),(70,'SİVAS',58,'346',0),(71,'ŞANLIURFA',63,'414',0),(72,'ŞIRNAK',73,'486',0),(73,'TEKİRDAĞ',59,'282',0),(74,'TOKAT',60,'356',0),(75,'TRABZON',61,'462',0),(76,'TUNCELİ',62,'428',0),(77,'UŞAK',64,'276',0),(78,'VAN',65,'432',0),(79,'YALOVA',77,'226',0),(80,'YOZGAT',66,'354',0),(81,'ZONGULDAK',67,'372',0);
/*!40000 ALTER TABLE `iller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kullanici_unvanlar`
--

DROP TABLE IF EXISTS `kullanici_unvanlar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `kullanici_unvanlar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unvanAdi` varchar(100) NOT NULL,
  `sayfalar` varchar(300) DEFAULT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kullanici_unvanlar`
--

LOCK TABLES `kullanici_unvanlar` WRITE;
/*!40000 ALTER TABLE `kullanici_unvanlar` DISABLE KEYS */;
INSERT INTO `kullanici_unvanlar` VALUES (1,'YETKİLİ/YÖNETİCİ','[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]',0),(2,'SATIŞ MÜDÜRÜ','[1,3]',0),(3,'BÖLGE MÜDÜRÜ','[1]',0),(4,'SATIŞ PERSONELİ','[1]',0);
/*!40000 ALTER TABLE `kullanici_unvanlar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kullanicilar`
--

DROP TABLE IF EXISTS `kullanicilar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `kullanicilar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firmaId` int(11) NOT NULL,
  `kullaniciUnvan` int(11) NOT NULL DEFAULT '0',
  `kullaniciAdi` varchar(100) NOT NULL,
  `kullaniciParola` varchar(45) NOT NULL,
  `kullaniciIsim` varchar(100) DEFAULT NULL,
  `kullaniciSoyisim` varchar(100) DEFAULT NULL,
  `kullaniciTel` varchar(45) DEFAULT NULL,
  `kullaniciEPosta` varchar(100) DEFAULT NULL,
  `kullaniciFoto` varchar(200) NOT NULL DEFAULT 'image_placeholder.jpg',
  `kullaniciBolgeId` int(11) DEFAULT NULL,
  `kullaniciKayitTar` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `kullaniciOlusturanId` int(11) DEFAULT '0',
  `kullaniciDuzenlemeTar` datetime DEFAULT CURRENT_TIMESTAMP,
  `kullaniciDilTercihi` varchar(45) DEFAULT 'tr',
  `hakkinda` varchar(200) DEFAULT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kullanicilar`
--

LOCK TABLES `kullanicilar` WRITE;
/*!40000 ALTER TABLE `kullanicilar` DISABLE KEYS */;
INSERT INTO `kullanicilar` VALUES (1,2,1,'iekara','81dc9bdb52d04dc20036dbd8313ed055','EMRE','KARA','(054) 234-3222','iekara@gmail.com','image_placeholder.jpg',3,'2019-05-16 12:21:36',0,'2019-05-16 12:21:36','1',NULL,0),(24,2,1,'yunusemrahdursun2@gmail.com','a62b4891bdee31062366b69795ac396a','YUNUS EMRAH','DURSUN','(537) 785-7448','yunusemrahdursun2@gmail.com','26-bfe2e93087dfc2ebf597254ca05fdc2f.jpg',2,'2019-05-20 13:54:15',0,'2019-05-20 13:54:15','1','\"geçme namık kemal köprüsünden ürkütürsün vak vakları\"',0),(35,2,1,'iekara@gmail.com','','ie','kara','(542) 343-2221','iekara@gmail.com','image_placeholder.jpg',1,'2019-05-30 10:30:08',24,'2019-05-30 10:30:08','1',NULL,0),(39,2,1,'yunusemrahdursun33@gmail.com','81dc9bdb52d04dc20036dbd8313ed055','YUNUS','AAAAAAAAAAAAA','(111) 111-1111','yunusemrahdursun@gmail.com','2-12fb97152dbafbb17ae7fffa8f1193c1.jpg',1,'2019-05-30 16:13:17',0,'2019-05-30 16:13:17','1','',0),(40,2,1,'yunusemrahdursun2@gmail.com','3cdf5666859f6906c283a1058cd5b9a7','test','testtt','(111) 111-1111','yunusemrahdursun2@gmail.com','image_placeholder.jpg',2,'2019-06-04 23:31:14',39,'2019-06-04 23:31:14','1',NULL,0);
/*!40000 ALTER TABLE `kullanicilar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `odeme_durum`
--

DROP TABLE IF EXISTS `odeme_durum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `odeme_durum` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `odemeDurumAdi` varchar(45) NOT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `odeme_durum`
--

LOCK TABLES `odeme_durum` WRITE;
/*!40000 ALTER TABLE `odeme_durum` DISABLE KEYS */;
INSERT INTO `odeme_durum` VALUES (1,'ÖDENDİ',0),(2,'ÖDENMEDİ',0);
/*!40000 ALTER TABLE `odeme_durum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `odeme_tipleri`
--

DROP TABLE IF EXISTS `odeme_tipleri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `odeme_tipleri` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `odemeTipAdi` varchar(45) NOT NULL,
  `silindiMİ` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `odeme_tipleri`
--

LOCK TABLES `odeme_tipleri` WRITE;
/*!40000 ALTER TABLE `odeme_tipleri` DISABLE KEYS */;
INSERT INTO `odeme_tipleri` VALUES (1,'NAKİT',0),(2,'KREDİ KARTI',0),(3,'BKM PAY',0),(4,'EFT/HAVALE',0);
/*!40000 ALTER TABLE `odeme_tipleri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sayfalar`
--

DROP TABLE IF EXISTS `sayfalar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sayfalar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `yetkiId` int(11) DEFAULT NULL,
  `icon` varchar(45) DEFAULT NULL,
  `parent` varchar(45) NOT NULL DEFAULT '0',
  `url` varchar(300) DEFAULT NULL,
  `sayfaAdi` varchar(45) NOT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sayfalar`
--

LOCK TABLES `sayfalar` WRITE;
/*!40000 ALTER TABLE `sayfalar` DISABLE KEYS */;
INSERT INTO `sayfalar` VALUES (1,1,'nc-icon nc-bank','0','/dashboard','dashboard',0),(2,1,'nc-icon nc-bank','0','/test','test',1),(3,1,'nc-icon nc-bank','4','/test1','test1',1),(4,1,'nc-icon nc-bank','0',NULL,'testp',1),(5,2,'nc-icon nc-bank','0','/kullanicilar/table','kullanıcılar',0),(6,16,'nc-icon nc-bank','0','/profil','profil',0),(7,9,'nc-icon nc-bank','0',NULL,'cariler',0),(8,3,'nc-icon nc-bank','7','/cariler/table','carilistele',0),(9,10,'nc-icon nc-bank','11','/bolgeler/table','bolgeler',0),(10,11,'nc-icon nc-bank','11','/iller/table','iller',0),(11,12,'nc-icon nc-bank','0',NULL,'parametreler',0),(12,3,'nc-icon nc-bank','7','/cariler/form','cariekle',0),(13,8,'nc-icon nc-bank','7','/toplucariekle','toplucariekle',0),(14,5,'nc-icon nc-bank','7','/carihareketleri/table','carihareketleri',0),(15,6,'nc-icon nc-bank','7','/toplucarihareketiekle','toplucarihareketiekle',0),(16,13,'nc-icon nc-bank','7','/belgetipleri/table','belgetipleri',0),(17,14,'nc-icon nc-bank','0','','anketler',0),(18,14,'nc-icon nc-bank','17','/anketler/form','anketolustur',0),(19,14,'nc-icon nc-bank','17','/anketler/table','anketler',0),(20,15,'nc-icon nc-bank','0','/duyuru','duyuru',0),(21,2,'nc-icon nc-bank','0','/kullanicilar/form','kullaniciekle',0),(22,17,'nc-icon nc-bank','0','','kategoriler',0),(23,17,'nc-icon nc-bank','22','/anakategoriler/table','anakategoriler',0),(24,17,'nc-icon nc-bank','22','/altkategoriler/table','altkategoriler',0),(25,17,'nc-icon nc-bank','22','/urunler/table','urunler',0),(26,20,'nc-icon nc-bank','22','/topluurunekle','topluurunekle',0);
/*!40000 ALTER TABLE `sayfalar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('Rz0d1V4iOh1b2OUuqV03WF59Qx_lSk0m',1561558603,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":39,\"firmaId\":2,\"kullaniciUnvan\":1,\"kullaniciAdi\":\"yunusemrahdursun33@gmail.com\",\"kullaniciParola\":\"81dc9bdb52d04dc20036dbd8313ed055\",\"kullaniciIsim\":\"YUNUS\",\"kullaniciSoyisim\":\"AAAAAAAAAAAAA\",\"kullaniciTel\":\"(111) 111-1111\",\"kullaniciEPosta\":\"yunusemrahdursun@gmail.com\",\"kullaniciFoto\":\"2-12fb97152dbafbb17ae7fffa8f1193c1.jpg\",\"kullaniciBolgeId\":1,\"kullaniciKayitTar\":\"2019-05-30 16:13:17\",\"kullaniciOlusturanId\":0,\"kullaniciDuzenlemeTar\":\"2019-05-30 16:13:17\",\"kullaniciDilTercihi\":\"1\",\"hakkinda\":\"\",\"silindiMi\":0}}'),('gjyl41SybVqTtFOruNKj3gctVgnRcxhv',1561494773,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":39,\"firmaId\":2,\"kullaniciUnvan\":1,\"kullaniciAdi\":\"yunusemrahdursun33@gmail.com\",\"kullaniciParola\":\"81dc9bdb52d04dc20036dbd8313ed055\",\"kullaniciIsim\":\"YUNUS\",\"kullaniciSoyisim\":\"AAAAAAAAAAAAA\",\"kullaniciTel\":\"(111) 111-1111\",\"kullaniciEPosta\":\"yunusemrahdursun@gmail.com\",\"kullaniciFoto\":\"2-5c206fa92f323d736d532a90d93423a4.jpg\",\"kullaniciBolgeId\":1,\"kullaniciKayitTar\":\"2019-05-30 16:13:17\",\"kullaniciOlusturanId\":0,\"kullaniciDuzenlemeTar\":\"2019-05-30 16:13:17\",\"kullaniciDilTercihi\":\"1\",\"hakkinda\":\"\",\"silindiMi\":0,\"tableNames\":[]}}'),('zvGU7vAaPc8q5InMyN47cdawkrTgGOnW',1561549458,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":39,\"firmaId\":2,\"kullaniciUnvan\":1,\"kullaniciAdi\":\"yunusemrahdursun33@gmail.com\",\"kullaniciParola\":\"81dc9bdb52d04dc20036dbd8313ed055\",\"kullaniciIsim\":\"YUNUS\",\"kullaniciSoyisim\":\"AAAAAAAAAAAAA\",\"kullaniciTel\":\"(111) 111-1111\",\"kullaniciEPosta\":\"yunusemrahdursun@gmail.com\",\"kullaniciFoto\":\"2-e43d0d870fc015e5abe3596e13a302ba.jpg\",\"kullaniciBolgeId\":1,\"kullaniciKayitTar\":\"2019-05-30 16:13:17\",\"kullaniciOlusturanId\":0,\"kullaniciDuzenlemeTar\":\"2019-05-30 16:13:17\",\"kullaniciDilTercihi\":\"1\",\"hakkinda\":\"\",\"silindiMi\":0,\"tableNames\":[{\"hash\":\"41f9c7f2cb90b54456644c809d05f3e7\",\"tableName\":\"anket_sorulari\",\"dbName\":\"sbs_comp_2\",\"colName\":[\"id\",\"soruText\",\"soruTipId\",\"cevapText\"]}]}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `a` varchar(22) NOT NULL,
  `b` varchar(45) DEFAULT NULL,
  `silindiMi` varchar(45) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (24,'azxzcxzxczsol','1231','0'),(25,'azxzcxzxczsol','1223','0'),(26,'azxzcxzxczsol','1231','1'),(27,'azxzcxzxczsol','1231','1'),(33,'azxzcxzxczsol','1231','1'),(34,'a','b','0'),(35,'azxzcxzxczsol','1231','0'),(36,'azxzcxzxczsol','1231','0');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yetkiler`
--

DROP TABLE IF EXISTS `yetkiler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `yetkiler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `yetkiAdi` varchar(45) NOT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yetkiler`
--

LOCK TABLES `yetkiler` WRITE;
/*!40000 ALTER TABLE `yetkiler` DISABLE KEYS */;
INSERT INTO `yetkiler` VALUES (1,'/dashboard',0),(2,'/kullanicilar',0),(3,'/cariler',0),(4,'/toplucariekle',0),(5,'/carihareketleri',0),(6,'/toplucarihareketiekle',0),(7,'/carihareketleri',0),(8,'/toplucariekle',0),(9,'/cariislemleri',0),(10,'/bolgeler',0),(11,'/iller',0),(12,'/parametreler',0),(13,'/belgetipleri',0),(14,'/anketler',0),(15,'/duyuru',0),(16,'/profile',0),(17,'/anakategoriler',0),(18,'/altkategoriler',0),(19,'/urunler',0),(20,'/topluurunekle',0);
/*!40000 ALTER TABLE `yetkiler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `sbs_comp_test`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `sbs_comp_test` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_turkish_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `sbs_comp_test`;

--
-- Table structure for table `alt_kategoriler`
--

DROP TABLE IF EXISTS `alt_kategoriler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `alt_kategoriler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anaKategoriId` int(11) NOT NULL,
  `altKategoriAdi` varchar(45) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alt_kategoriler`
--

LOCK TABLES `alt_kategoriler` WRITE;
/*!40000 ALTER TABLE `alt_kategoriler` DISABLE KEYS */;
/*!40000 ALTER TABLE `alt_kategoriler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ana_kategoriler`
--

DROP TABLE IF EXISTS `ana_kategoriler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ana_kategoriler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anaKategoriAdi` varchar(200) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ana_kategoriler`
--

LOCK TABLES `ana_kategoriler` WRITE;
/*!40000 ALTER TABLE `ana_kategoriler` DISABLE KEYS */;
/*!40000 ALTER TABLE `ana_kategoriler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anket_sorulari`
--

DROP TABLE IF EXISTS `anket_sorulari`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `anket_sorulari` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anketId` int(11) NOT NULL,
  `soruText` text COLLATE utf8_turkish_ci NOT NULL,
  `soruTipId` int(11) NOT NULL,
  `cevapText` text COLLATE utf8_turkish_ci,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anket_sorulari`
--

LOCK TABLES `anket_sorulari` WRITE;
/*!40000 ALTER TABLE `anket_sorulari` DISABLE KEYS */;
/*!40000 ALTER TABLE `anket_sorulari` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anketler`
--

DROP TABLE IF EXISTS `anketler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `anketler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anketAdi` varchar(250) COLLATE utf8_turkish_ci NOT NULL,
  `anketCinsi` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anketler`
--

LOCK TABLES `anketler` WRITE;
/*!40000 ALTER TABLE `anketler` DISABLE KEYS */;
/*!40000 ALTER TABLE `anketler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `belge_tipleri`
--

DROP TABLE IF EXISTS `belge_tipleri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `belge_tipleri` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `belgeTipAdi` varchar(45) COLLATE utf8_turkish_ci NOT NULL,
  `belgeTipi` varchar(1) COLLATE utf8_turkish_ci NOT NULL DEFAULT 'A',
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `belge_tipleri`
--

LOCK TABLES `belge_tipleri` WRITE;
/*!40000 ALTER TABLE `belge_tipleri` DISABLE KEYS */;
INSERT INTO `belge_tipleri` VALUES (1,'FATURA','A',0),(2,'TAHSİLAT','B',0);
/*!40000 ALTER TABLE `belge_tipleri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bolge_personeli`
--

DROP TABLE IF EXISTS `bolge_personeli`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bolge_personeli` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bolgeId` int(11) NOT NULL,
  `kullaniciId` int(11) NOT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bolge_personeli`
--

LOCK TABLES `bolge_personeli` WRITE;
/*!40000 ALTER TABLE `bolge_personeli` DISABLE KEYS */;
/*!40000 ALTER TABLE `bolge_personeli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bolgeler`
--

DROP TABLE IF EXISTS `bolgeler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bolgeler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sorumluId` int(11) NOT NULL,
  `bolgeAdi` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  `bolgelerAciklama` text COLLATE utf8_turkish_ci,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bolgeler`
--

LOCK TABLES `bolgeler` WRITE;
/*!40000 ALTER TABLE `bolgeler` DISABLE KEYS */;
INSERT INTO `bolgeler` VALUES (1,0,'MARMARA BÖLGESİ',NULL,0),(2,0,'İÇ ANADOLU BÖLGESİ',NULL,0),(3,0,'AKDENİZ BÖLGESİ',NULL,0),(4,0,'EGE BÖLGESİ',NULL,0),(5,0,'KARADENİZ BÖLGESİ',NULL,0),(6,0,'DOĞU ANADOLU BÖLGESİ',NULL,0),(7,0,'GÜNEYDOĞU ANADOLU BÖLGESİ',NULL,0);
/*!40000 ALTER TABLE `bolgeler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cari_hareketler`
--

DROP TABLE IF EXISTS `cari_hareketler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cari_hareketler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cariId` int(11) NOT NULL,
  `belgeTipId` int(11) NOT NULL,
  `belgeNo` int(11) DEFAULT NULL,
  `belgeTarihi` datetime NOT NULL,
  `a` float NOT NULL DEFAULT '0',
  `b` float NOT NULL DEFAULT '0',
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cari_hareketler`
--

LOCK TABLES `cari_hareketler` WRITE;
/*!40000 ALTER TABLE `cari_hareketler` DISABLE KEYS */;
/*!40000 ALTER TABLE `cari_hareketler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cariler`
--

DROP TABLE IF EXISTS `cariler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cariler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bolgeId` int(11) NOT NULL,
  `cariAdi` varchar(100) NOT NULL,
  `cariIli` int(11) NOT NULL DEFAULT '0',
  `cariIlce` varchar(100) DEFAULT NULL,
  `cariMahalle` varchar(100) DEFAULT NULL,
  `cariSok_Cad` varchar(100) DEFAULT NULL,
  `cariBinaNo` varchar(45) DEFAULT NULL,
  `cariDaireNo` varchar(45) DEFAULT NULL,
  `carilerKoordinat` varchar(45) DEFAULT NULL,
  `cariKoorCap` varchar(45) DEFAULT NULL,
  `cariTel` varchar(45) DEFAULT NULL,
  `cariFaks` varchar(45) DEFAULT NULL,
  `cariEPosta` varchar(100) DEFAULT NULL,
  `cariVergiDairesi` varchar(100) DEFAULT NULL,
  `cariVergiNo` varchar(45) DEFAULT NULL,
  `cariMernis` varchar(45) DEFAULT NULL,
  `cariAciklama` text,
  `cariYetkiliKisiAdi` varchar(100) DEFAULT NULL,
  `cariYetkiliKisiSoyadi` varchar(100) DEFAULT NULL,
  `cariYetkiliKisiTel` varchar(45) DEFAULT NULL,
  `cariLogo` varchar(200) NOT NULL DEFAULT 'image_placeholder.jpg',
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cariler`
--

LOCK TABLES `cariler` WRITE;
/*!40000 ALTER TABLE `cariler` DISABLE KEYS */;
/*!40000 ALTER TABLE `cariler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `duyurular`
--

DROP TABLE IF EXISTS `duyurular`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `duyurular` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `duyuruBaslik` varchar(150) COLLATE utf8_turkish_ci NOT NULL,
  `duyuruAciklama` text COLLATE utf8_turkish_ci NOT NULL,
  `duyuruGidecekIdler` text COLLATE utf8_turkish_ci NOT NULL,
  `duyuruOlusturma` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `duyurular`
--

LOCK TABLES `duyurular` WRITE;
/*!40000 ALTER TABLE `duyurular` DISABLE KEYS */;
/*!40000 ALTER TABLE `duyurular` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iller`
--

DROP TABLE IF EXISTS `iller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `iller` (
  `il_id` int(11) NOT NULL AUTO_INCREMENT,
  `il_adi` varchar(100) NOT NULL,
  `plaka_no` int(11) NOT NULL,
  `bolgeId` int(11) NOT NULL,
  `tel_kod` varchar(7) NOT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`il_id`),
  UNIQUE KEY `il_id_UNIQUE` (`il_id`),
  KEY `CityID` (`il_id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iller`
--

LOCK TABLES `iller` WRITE;
/*!40000 ALTER TABLE `iller` DISABLE KEYS */;
INSERT INTO `iller` VALUES (1,'ADANA',1,3,'322',0),(2,'ADIYAMAN',2,7,'416',0),(3,'AFYONKARAHİSAR',3,4,'272',0),(4,'AĞRI',4,6,'472',0),(5,'AKSARAY',68,2,'382',0),(6,'AMASYA',5,5,'358',0),(7,'ANKARA',6,2,'312',0),(8,'ANTALYA',7,3,'242',0),(9,'ARDAHAN',75,6,'478',0),(10,'ARTVİN',8,5,'466',0),(11,'AYDIN',9,4,'256',0),(12,'BALIKESİR',10,4,'266',0),(13,'BARTIN',74,5,'378',0),(14,'BATMAN',72,7,'488',0),(15,'BAYBURT',69,5,'458',0),(16,'BİLECİK',11,1,'228',0),(17,'BİNGÖL',12,6,'426',0),(18,'BİTLİS',13,6,'434',0),(19,'BOLU',14,5,'374',0),(20,'BURDUR',15,3,'248',0),(21,'BURSA',16,1,'224',0),(22,'ÇANAKKALE',17,1,'286',0),(23,'ÇANKIRI',18,2,'376',0),(24,'ÇORUM',19,5,'364',0),(25,'DENİZLİ',20,4,'258',0),(26,'DİYARBAKIR',21,7,'412',0),(27,'DÜZCE',81,5,'380',0),(28,'EDİRNE',22,1,'284',0),(29,'ELAZIĞ',23,6,'424',0),(30,'ERZİNCAN',24,6,'446',0),(31,'ERZURUM',25,6,'442',0),(32,'ESKİŞEHİR',26,2,'222',0),(33,'GAZİANTEP',27,7,'342',0),(34,'GİRESUN',28,5,'454',0),(35,'GÜMÜŞHANE',29,5,'456',0),(36,'HAKKARİ',30,6,'438',0),(37,'HATAY',31,3,'326',0),(38,'IĞDIR',76,6,'476',0),(39,'ISPARTA',32,3,'246',0),(40,'İSTANBUL',34,1,'212-216',0),(41,'İZMİR',35,4,'232',0),(42,'KAHRAMANMARAŞ',46,3,'344',0),(43,'KARABÜK',78,5,'370',0),(44,'KARAMAN',70,2,'338',0),(45,'KARS',36,6,'474',0),(46,'KASTAMONU',37,5,'366',0),(47,'KAYSERİ',38,2,'352',0),(48,'KIRIKKALE',71,2,'318',0),(49,'KIRKLARELİ',39,1,'288',0),(50,'KIRŞEHİR',40,2,'386',0),(51,'KİLİS',79,7,'348',0),(52,'KOCAELİ',41,1,'262',0),(53,'KONYA',42,2,'332',0),(54,'KÜTAHYA',43,4,'274',0),(55,'MALATYA',44,6,'422',0),(56,'MANİSA',45,4,'236',0),(57,'MARDİN',47,7,'482',0),(58,'MERSİN',33,3,'324',0),(59,'MUĞLA',48,4,'252',0),(60,'MUŞ',49,6,'436',0),(61,'NEVŞEHİR',50,2,'384',0),(62,'NİĞDE',51,2,'388',0),(63,'ORDU',52,5,'452',0),(64,'OSMANİYE',80,3,'328',0),(65,'RİZE',53,5,'464',0),(66,'SAKARYA',54,1,'264',0),(67,'SAMSUN',55,5,'362',0),(68,'SİİRT',56,7,'484',0),(69,'SİNOP',57,5,'368',0),(70,'SİVAS',58,2,'346',0),(71,'ŞANLIURFA',63,7,'414',0),(72,'ŞIRNAK',73,7,'486',0),(73,'TEKİRDAĞ',59,1,'282',0),(74,'TOKAT',60,5,'356',0),(75,'TRABZON',61,5,'462',0),(76,'TUNCELİ',62,6,'428',0),(77,'UŞAK',64,4,'276',0),(78,'VAN',65,6,'432',0),(79,'YALOVA',77,1,'226',0),(80,'YOZGAT',66,2,'354',0),(81,'ZONGULDAK',67,5,'372',0);
/*!40000 ALTER TABLE `iller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `urunler`
--

DROP TABLE IF EXISTS `urunler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `urunler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `altKatgoriId` int(11) NOT NULL,
  `urunAdi` varchar(200) COLLATE utf8_turkish_ci NOT NULL,
  `urunKodu` varchar(45) COLLATE utf8_turkish_ci DEFAULT NULL,
  `urunAciklama` text COLLATE utf8_turkish_ci,
  `urunFoto` text COLLATE utf8_turkish_ci NOT NULL,
  `urunDosyalar` text COLLATE utf8_turkish_ci,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `urunler`
--

LOCK TABLES `urunler` WRITE;
/*!40000 ALTER TABLE `urunler` DISABLE KEYS */;
/*!40000 ALTER TABLE `urunler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `sbs_comp_2`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `sbs_comp_2` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_turkish_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `sbs_comp_2`;

--
-- Table structure for table `alt_kategoriler`
--

DROP TABLE IF EXISTS `alt_kategoriler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `alt_kategoriler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anaKategoriId` int(11) NOT NULL,
  `altKategoriAdi` varchar(45) COLLATE utf8_turkish_ci NOT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alt_kategoriler`
--

LOCK TABLES `alt_kategoriler` WRITE;
/*!40000 ALTER TABLE `alt_kategoriler` DISABLE KEYS */;
INSERT INTO `alt_kategoriler` VALUES (1,1,'testt',0);
/*!40000 ALTER TABLE `alt_kategoriler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ana_kategoriler`
--

DROP TABLE IF EXISTS `ana_kategoriler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ana_kategoriler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anaKategoriAdi` varchar(200) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ana_kategoriler`
--

LOCK TABLES `ana_kategoriler` WRITE;
/*!40000 ALTER TABLE `ana_kategoriler` DISABLE KEYS */;
INSERT INTO `ana_kategoriler` VALUES (1,'test',0);
/*!40000 ALTER TABLE `ana_kategoriler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anket_sorulari`
--

DROP TABLE IF EXISTS `anket_sorulari`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `anket_sorulari` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anketId` int(11) NOT NULL,
  `soruText` text COLLATE utf8_turkish_ci NOT NULL,
  `soruTipId` int(11) NOT NULL,
  `cevapText` text COLLATE utf8_turkish_ci,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anket_sorulari`
--

LOCK TABLES `anket_sorulari` WRITE;
/*!40000 ALTER TABLE `anket_sorulari` DISABLE KEYS */;
INSERT INTO `anket_sorulari` VALUES (1,3,'tesfsd',1,'[]',0),(2,3,'asdzxczzxradio',4,'[\"cbcbc\"]',0),(3,3,'checkbox',6,'[\"checkboxxxx\",\"grallllll\",\"sa\"]',0),(4,3,'123',1,'[]',0),(5,3,'zczcz',6,'[\"dfgdfdg\"]',0),(6,3,'123',3,'[]',0),(7,3,'zczcz',6,'[\"dfgdfdg\"]',0),(8,3,'zxcz',4,'[\"evet\",\"hayır\"]',0),(9,4,'checkbox',6,'[\"checkboxxxx\"]',1),(10,4,'zczcz',6,'[\"dfgdfdg\"]',1),(11,4,'123',1,'[]',1),(12,4,'tesfsd',1,'[]',1),(13,4,'asdzxczzxradio',4,'[\"cbcbc\"]',1),(14,4,'123',3,'[]',1),(15,4,'zczcz',6,'[\"dfgdfdg\"]',1),(16,4,'zxcz',4,'[\"evet\"]',1),(17,4,'',1,'[]',1),(18,5,'tesfsd',1,'[]',1),(19,5,'asdzxczzxradio',4,'[\"cbcbc\"]',1),(20,5,'checkbox',6,'[\"checkboxxxx\"]',1),(21,5,'123',1,'[]',1),(22,5,'zczcz',6,'[\"dfgdfdg\"]',1),(23,5,'123',3,'[]',1),(24,5,'zczcz',6,'[\"dfgdfdg\"]',1),(25,5,'zxcz',4,'[\"evet\",\"hayır\"]',1);
/*!40000 ALTER TABLE `anket_sorulari` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anketler`
--

DROP TABLE IF EXISTS `anketler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `anketler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anketAdi` varchar(250) COLLATE utf8_turkish_ci NOT NULL,
  `anketCinsi` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anketler`
--

LOCK TABLES `anketler` WRITE;
/*!40000 ALTER TABLE `anketler` DISABLE KEYS */;
INSERT INTO `anketler` VALUES (3,'testtta','standart',0),(4,'xczxczc','ozel',1),(5,'qqqqqqq','ozel',1);
/*!40000 ALTER TABLE `anketler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `belge_tipleri`
--

DROP TABLE IF EXISTS `belge_tipleri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `belge_tipleri` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `belgeTipAdi` varchar(45) COLLATE utf8_turkish_ci NOT NULL,
  `belgeTipi` varchar(1) COLLATE utf8_turkish_ci NOT NULL DEFAULT 'A',
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `belge_tipleri`
--

LOCK TABLES `belge_tipleri` WRITE;
/*!40000 ALTER TABLE `belge_tipleri` DISABLE KEYS */;
INSERT INTO `belge_tipleri` VALUES (1,'FATURA','a',0),(2,'TAHSİLAT','b',0),(3,'test','b',1);
/*!40000 ALTER TABLE `belge_tipleri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bolge_personeli`
--

DROP TABLE IF EXISTS `bolge_personeli`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bolge_personeli` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bolgeId` int(11) NOT NULL,
  `kullaniciId` int(11) NOT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bolge_personeli`
--

LOCK TABLES `bolge_personeli` WRITE;
/*!40000 ALTER TABLE `bolge_personeli` DISABLE KEYS */;
/*!40000 ALTER TABLE `bolge_personeli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bolgeler`
--

DROP TABLE IF EXISTS `bolgeler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bolgeler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sorumluId` text COLLATE utf8_turkish_ci NOT NULL,
  `bolgeAdi` varchar(100) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL,
  `bolgelerAciklama` text CHARACTER SET utf8 COLLATE utf8_turkish_ci,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bolgeler`
--

LOCK TABLES `bolgeler` WRITE;
/*!40000 ALTER TABLE `bolgeler` DISABLE KEYS */;
INSERT INTO `bolgeler` VALUES (1,'39','MARMARA BÖLGESİ','',0),(2,'39','İÇ ANADOLU BÖLGESİ',NULL,0),(3,'39','AKDENİZ BÖLGESİ',NULL,0),(4,'39','EGE BÖLGESİ',NULL,0),(5,'39','KARADENİZ BÖLGESİ',NULL,0),(6,'39','DOĞU ANADOLU BÖLGESİ','asas',0),(7,'39','GÜNEYDOĞU ANADOLU BÖLGESİ',NULL,0);
/*!40000 ALTER TABLE `bolgeler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cari_hareketler`
--

DROP TABLE IF EXISTS `cari_hareketler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cari_hareketler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cariId` int(11) NOT NULL,
  `belgeTipId` int(11) NOT NULL,
  `belgeNo` int(11) DEFAULT NULL,
  `belgeTarihi` datetime NOT NULL,
  `a` float NOT NULL DEFAULT '0',
  `b` float NOT NULL DEFAULT '0',
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cari_hareketler`
--

LOCK TABLES `cari_hareketler` WRITE;
/*!40000 ALTER TABLE `cari_hareketler` DISABLE KEYS */;
INSERT INTO `cari_hareketler` VALUES (1,1,1,1,'2019-06-14 00:00:00',12,0,1),(2,1,2,2,'2019-06-20 00:00:00',12,0,1),(3,1,2,3,'2019-06-14 00:00:00',12,0,1),(4,1,1,5,'2019-06-29 00:00:00',85,0,1),(5,1,2,6,'2019-06-20 00:00:00',54.65,0,0),(6,57,1,121,'1990-10-12 00:00:00',1,0,0),(7,1,1,111,'2019-06-05 00:00:00',1,0,0),(8,1,1,1,'2019-04-20 00:00:00',10,0,0),(9,57,2,2,'2019-05-20 00:00:00',0,20,0);
/*!40000 ALTER TABLE `cari_hareketler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cariler`
--

DROP TABLE IF EXISTS `cariler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cariler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bolgeId` int(11) NOT NULL,
  `cariAdi` varchar(100) NOT NULL,
  `cariIli` int(11) NOT NULL DEFAULT '0',
  `cariIlce` varchar(100) DEFAULT NULL,
  `cariMahalle` varchar(100) DEFAULT NULL,
  `cariSok_Cad` varchar(100) DEFAULT NULL,
  `cariBinaNo` varchar(45) DEFAULT NULL,
  `cariDaireNo` varchar(45) DEFAULT NULL,
  `carilerKoordinat` varchar(45) DEFAULT NULL,
  `cariKoorCap` varchar(45) DEFAULT NULL,
  `cariTel` varchar(45) DEFAULT NULL,
  `cariFaks` varchar(45) DEFAULT NULL,
  `cariEPosta` varchar(100) DEFAULT NULL,
  `cariVergiDairesi` varchar(100) DEFAULT NULL,
  `cariVergiNo` varchar(45) DEFAULT NULL,
  `cariMernis` varchar(45) DEFAULT NULL,
  `cariAciklama` text,
  `cariYetkiliKisiAdi` varchar(100) DEFAULT NULL,
  `cariYetkiliKisiSoyadi` varchar(100) DEFAULT NULL,
  `cariYetkiliKisiTel` varchar(45) DEFAULT NULL,
  `cariLogo` varchar(200) NOT NULL DEFAULT 'image_placeholder.jpg',
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `cariVergiNo_UNIQUE` (`cariVergiNo`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cariler`
--

LOCK TABLES `cariler` WRITE;
/*!40000 ALTER TABLE `cariler` DISABLE KEYS */;
INSERT INTO `cariler` VALUES (1,2,'test1',7,'çankaya','yaşamkent','test9','test10','test11','39.86323957516573,32.65548706054688','374','(111) 111-1111','test5','test4@hotmail.com','test6','test7','test8','testt','test2','test3','(111) 111-1111','2-ad9488468df737327ed5b31fbab8a3fa.jpg',0),(57,2,'test1244',7,'çankaya','yaşamkent','test9','test10','test11','39.0100769,30.6887968','250','(111) 111-1111','test5','test4@hotmail.com','test7','test7asdasd','test8','testtt','test2','test3','(111) 111-1111','image_placeholder.jpg',0),(88,2,'test1232',7,'çankaya','yaşamkent','test9','test10','test11',NULL,NULL,'(111) 111-1111','test5','test4@hotmail.com','test6','test7999','test8','testtt','test2','test3','(111) 111-1111','image_placeholder.jpg',0);
/*!40000 ALTER TABLE `cariler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `duyurular`
--

DROP TABLE IF EXISTS `duyurular`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `duyurular` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `duyuruBaslik` varchar(150) COLLATE utf8_turkish_ci NOT NULL,
  `duyuruAciklama` text COLLATE utf8_turkish_ci NOT NULL,
  `duyuruGidecekIdler` text COLLATE utf8_turkish_ci NOT NULL,
  `duyuruOlusturma` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `duyurular`
--

LOCK TABLES `duyurular` WRITE;
/*!40000 ALTER TABLE `duyurular` DISABLE KEYS */;
INSERT INTO `duyurular` VALUES (4,'test','<p>asdads</p>','[\"35\",\"39\",\"24\",\"1\"]','2019-06-24 12:02:40',0);
/*!40000 ALTER TABLE `duyurular` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iller`
--

DROP TABLE IF EXISTS `iller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `iller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `il_adi` varchar(100) NOT NULL,
  `plaka_no` int(11) NOT NULL,
  `bolgeId` int(11) NOT NULL,
  `tel_kod` varchar(7) NOT NULL,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `CityID` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iller`
--

LOCK TABLES `iller` WRITE;
/*!40000 ALTER TABLE `iller` DISABLE KEYS */;
INSERT INTO `iller` VALUES (1,'ADANA',1,3,'322',0),(2,'ADIYAMAN',2,7,'416',0),(3,'AFYONKARAHİSAR',3,4,'272',0),(4,'AĞRI',4,6,'472',0),(5,'AKSARAY',68,2,'382',0),(6,'AMASYA',5,5,'358',0),(7,'ANKARA',6,2,'312',0),(8,'ANTALYA',7,3,'242',0),(9,'ARDAHAN',75,6,'478',0),(10,'ARTVİN',8,5,'466',0),(11,'AYDIN',9,4,'256',0),(12,'BALIKESİR',10,4,'266',0),(13,'BARTIN',74,5,'378',0),(14,'BATMAN',72,7,'488',0),(15,'BAYBURT',69,5,'458',0),(16,'BİLECİK',11,1,'228',0),(17,'BİNGÖL',12,6,'426',0),(18,'BİTLİS',13,6,'434',0),(19,'BOLU',14,5,'374',0),(20,'BURDUR',15,3,'248',0),(21,'BURSA',16,1,'224',0),(22,'ÇANAKKALE',17,1,'286',0),(23,'ÇANKIRI',18,2,'376',0),(24,'ÇORUM',19,5,'364',0),(25,'DENİZLİ',20,4,'258',0),(26,'DİYARBAKIR',21,7,'412',0),(27,'DÜZCE',81,5,'380',0),(28,'EDİRNE',22,1,'284',0),(29,'ELAZIĞ',23,6,'424',0),(30,'ERZİNCAN',24,6,'446',0),(31,'ERZURUM',25,6,'442',0),(32,'ESKİŞEHİR',26,2,'222',0),(33,'GAZİANTEP',27,7,'342',0),(34,'GİRESUN',28,5,'454',0),(35,'GÜMÜŞHANE',29,5,'456',0),(36,'HAKKARİ',30,6,'438',0),(37,'HATAY',31,3,'326',0),(38,'IĞDIR',76,6,'476',0),(39,'ISPARTA',32,3,'246',0),(40,'İSTANBUL',34,1,'212-216',0),(41,'İZMİR',35,4,'232',0),(42,'KAHRAMANMARAŞ',46,3,'344',0),(43,'KARABÜK',78,5,'370',0),(44,'KARAMAN',70,2,'338',0),(45,'KARS',36,6,'474',0),(46,'KASTAMONU',37,5,'366',0),(47,'KAYSERİ',38,2,'352',0),(48,'KIRIKKALE',71,2,'318',0),(49,'KIRKLARELİ',39,1,'288',0),(50,'KIRŞEHİR',40,2,'386',0),(51,'KİLİS',79,7,'348',0),(52,'KOCAELİ',41,1,'262',0),(53,'KONYA',42,2,'332',0),(54,'KÜTAHYA',43,4,'274',0),(55,'MALATYA',44,6,'422',0),(56,'MANİSA',45,4,'236',0),(57,'MARDİN',47,7,'482',0),(58,'MERSİN',33,3,'324',0),(59,'MUĞLA',48,4,'252',0),(60,'MUŞ',49,6,'436',0),(61,'NEVŞEHİR',50,2,'384',0),(62,'NİĞDE',51,2,'388',0),(63,'ORDU',52,5,'452',0),(64,'OSMANİYE',80,3,'328',0),(65,'RİZE',53,5,'464',0),(66,'SAKARYA',54,1,'264',0),(67,'SAMSUN',55,5,'362',0),(68,'SİİRT',56,7,'484',0),(69,'SİNOP',57,5,'368',0),(70,'SİVAS',58,2,'346',0),(71,'ŞANLIURFA',63,7,'414',0),(72,'ŞIRNAK',73,7,'486',0),(73,'TEKİRDAĞ',59,1,'282',0),(74,'TOKAT',60,5,'356',0),(75,'TRABZON',61,5,'462',0),(76,'TUNCELİ',62,6,'428',0),(77,'UŞAK',64,4,'276',0),(78,'VAN',65,6,'432',0),(79,'YALOVA',77,1,'226',0),(80,'YOZGAT',66,2,'354',0),(81,'ZONGULDAK',67,5,'372',0);
/*!40000 ALTER TABLE `iller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `urunler`
--

DROP TABLE IF EXISTS `urunler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `urunler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `altKategoriId` int(11) NOT NULL,
  `urunAdi` varchar(200) COLLATE utf8_turkish_ci NOT NULL,
  `urunKodu` varchar(45) COLLATE utf8_turkish_ci DEFAULT NULL,
  `urunAciklama` text COLLATE utf8_turkish_ci,
  `urunFoto` varchar(200) COLLATE utf8_turkish_ci NOT NULL DEFAULT 'image_placeholder.jpg',
  `urunDosyalar` text COLLATE utf8_turkish_ci,
  `silindiMi` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `urunler`
--

LOCK TABLES `urunler` WRITE;
/*!40000 ALTER TABLE `urunler` DISABLE KEYS */;
INSERT INTO `urunler` VALUES (7,1,'test','test','asdasd','','',0),(8,1,'aaaa','aaaaaaaaaa','zxxxxxxxx','','[\"2-e5b20dce82655fe4563f66a07124e062.pdf\",\"2-a33a9f423db8fdf9d264e0851e3c5ecb.pdf\"]',0);
/*!40000 ALTER TABLE `urunler` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-25 17:21:34
