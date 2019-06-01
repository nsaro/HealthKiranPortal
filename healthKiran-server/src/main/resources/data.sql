DROP TABLE IF EXISTS `bookings`;

CREATE TABLE `bookings` (
  `id` bigint(20) NOT NULL,
  `booking_status` varchar(255) DEFAULT NULL,
  `collection_type` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `timing` varchar(255) DEFAULT NULL,
  `lab_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKq3vghws3hhmrh4rof7s992cug` (`lab_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `cities`;

CREATE TABLE `cities` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `cities` WRITE;

INSERT INTO `cities` (`id`, `name`)
VALUES
	(1,'New Delhi'),
	(2,'Mumbai'),
	(3,'Bangalore'),
	(4,'Hyderabad');

UNLOCK TABLES;


DROP TABLE IF EXISTS `hibernate_sequence`;

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `hibernate_sequence` WRITE;

INSERT INTO `hibernate_sequence` (`next_val`)
VALUES
	(1),
	(1),
	(1),
	(1),
	(1),
	(1),
	(1);

UNLOCK TABLES;

DROP TABLE IF EXISTS `lab_tests`;

CREATE TABLE `lab_tests` (
  `id` bigint(20) NOT NULL,
  `price_id` bigint(20) DEFAULT NULL,
  `test_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbrbxnlwikqlx2u0sliol8a8i4` (`price_id`),
  KEY `FKik2c39oxwc94svm2pedflln91` (`test_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `lab_tests` WRITE;

INSERT INTO `lab_tests` (`id`, `price_id`, `test_id`)
VALUES
	(2,3,1),
	(4,5,2);

UNLOCK TABLES;

DROP TABLE IF EXISTS `labs`;

CREATE TABLE `labs` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `certified_by` varchar(255) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `facility` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `off_day` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `pin_code` int(11) DEFAULT NULL,
  `sunday_working_hours` varchar(255) DEFAULT NULL,
  `ultra_sound_working_hours` varchar(255) DEFAULT NULL,
  `usual_working_hours` varchar(255) DEFAULT NULL,
  `van_facility` varchar(255) DEFAULT NULL,
  `city_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5xh9gi4r41h3m4a5p65y7obul` (`city_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `labs` WRITE;

INSERT INTO `labs` (`id`, `address`, `area`, `certified_by`, `contact_person`, `description`, `email`, `facility`, `name`, `off_day`, `phone`, `pin_code`, `sunday_working_hours`, `ultra_sound_working_hours`, `usual_working_hours`, `van_facility`, `city_id`)
VALUES
	(1,'4A/16, Block 4A, Tilak Nagar','Tilak Nagar, Delhi','NABL','Mr. Ashish Srivastava','Janta X-Ray is a double decade old dream realized of eminent veteran, Dr. R.A.Gupta, who envisioned the provision of quality and reliable diagnostic','pathlabs@gmail.com','MRI, CT Scan, Ultrasound, X Ray, EEG, ECG,ECHO and Blood Tests.','Dr Path Labs','None','9650046889',110018,'SUN- (8 AM- 5 PM)','Mon- Sun: (8 AM To 8 PM)','MON - SAT (9 AM - 6 PM)','Yes',1);

UNLOCK TABLES;


DROP TABLE IF EXISTS `labs_bookings`;

CREATE TABLE `labs_bookings` (
  `labs_id` bigint(20) NOT NULL,
  `bookings_id` bigint(20) NOT NULL,
  UNIQUE KEY `UK_l9j6axlkrsonvpvs2b9vykvw0` (`bookings_id`),
  KEY `FKfq0se4yv2to67whf6jb87ltxl` (`labs_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `labs_lab_tests`;

CREATE TABLE `labs_lab_tests` (
  `labs_id` bigint(20) NOT NULL,
  `lab_tests_id` bigint(20) NOT NULL,
  UNIQUE KEY `UK_bya4o0lt73ax9tsg070ql658l` (`lab_tests_id`),
  KEY `FKaeg952r1eodwmsw75ps6m38v4` (`labs_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `labs_lab_tests` WRITE;

INSERT INTO `labs_lab_tests` (`labs_id`, `lab_tests_id`)
VALUES
	(1,4),
	(1,2);

UNLOCK TABLES;


DROP TABLE IF EXISTS `prices`;

CREATE TABLE `prices` (
  `id` bigint(20) NOT NULL,
  `discount_percentage` float DEFAULT NULL,
  `final_price` float DEFAULT NULL,
  `original_price` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `prices` WRITE;

INSERT INTO `prices` (`id`, `discount_percentage`, `final_price`, `original_price`)
VALUES
	(3,10,900,1000),
	(5,15,1700,2000);

UNLOCK TABLES;


DROP TABLE IF EXISTS `tests`;

CREATE TABLE `tests` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `special_requirements` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `tests` WRITE;

INSERT INTO `tests` (`id`, `name`, `special_requirements`)
VALUES
	(1,'Kidney Function Test (KFT/RFT)','Fasting'),
	(2,'CBC Complete Blood Count','None'),
	(3,'Liver Function Test (LFT)','No Special Preparation'),
	(4,'MRI BRAIN','No Fasting required');

UNLOCK TABLES;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `users_bookings`;

CREATE TABLE `users_bookings` (
  `users_id` bigint(20) NOT NULL,
  `bookings_id` bigint(20) NOT NULL,
  UNIQUE KEY `UK_j4bgckbyaonpk9vyg4i6jqy7g` (`bookings_id`),
  KEY `FKcadxnp2arbxwyxn5ucu9k16nv` (`users_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
