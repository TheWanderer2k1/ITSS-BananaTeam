DROP DATABASE IF EXISTS tabeyoudb;

CREATE DATABASE tabeyoudb;

SET NAMES 'utf8';

USE tabeyoudb;

DROP TABLE IF EXISTS reactreview;


DROP TABLE IF EXISTS reply;


DROP TABLE IF EXISTS foodreview;


DROP TABLE IF EXISTS user;


DROP TABLE IF EXISTS role;


DROP TABLE IF EXISTS fooddesciption;


DROP TABLE IF EXISTS food;


DROP TABLE IF EXISTS category;


DROP TABLE IF EXISTS restaurant;


DROP TABLE IF EXISTS image;


CREATE TABLE image (
  ID INT NOT NULL AUTO_INCREMENT,
  GroupID INT NOT NULL,
  Title VARCHAR(256) NOT NULL DEFAULT '',
  Src VARCHAR(1024) NOT NULL DEFAULT '',
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 21,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE image 
  ADD INDEX IDX_GroupImageID(GroupID);


ALTER TABLE image 
  ADD UNIQUE INDEX UK_image_GroupID(GroupID);


CREATE TABLE restaurant (
  ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(256) NOT NULL DEFAULT '',
  Desciption VARCHAR(256) NOT NULL DEFAULT '',
  OpenTime VARCHAR(5) NOT NULL DEFAULT '',
  CloseTime VARCHAR(5) NOT NULL DEFAULT '',
  Phone VARCHAR(256) NOT NULL DEFAULT '',
  Address VARCHAR(256) NOT NULL DEFAULT 'ベトナム',
  GroupImageID INT DEFAULT NULL,
  Status SMALLINT NOT NULL,
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 7,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE restaurant 
  ADD CONSTRAINT FK_Restaurant_GroupImageID FOREIGN KEY (GroupImageID)
    REFERENCES image(GroupID);


CREATE TABLE category (
  ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(10) NOT NULL DEFAULT '',
  Description VARCHAR(2048) NOT NULL DEFAULT '',
  ImageId INT DEFAULT NULL,
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE category 
  ADD CONSTRAINT FK_category_ImageId FOREIGN KEY (ImageId)
    REFERENCES image(ID);


CREATE TABLE food (
  ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(50) NOT NULL DEFAULT '',
  CategoryId INT DEFAULT NULL,
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 21,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE food 
  ADD CONSTRAINT FK_Food_CategoryId FOREIGN KEY (CategoryId)
    REFERENCES category(ID);


CREATE TABLE fooddesciption (
  ID INT NOT NULL AUTO_INCREMENT,
  FoodID INT NOT NULL,
  RestaurantID INT NOT NULL,
  Desciption VARCHAR(2048) NOT NULL DEFAULT '',
  GroupImageID INT DEFAULT NULL,
  Price INT DEFAULT NULL,
  Status SMALLINT NOT NULL,
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 181,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE fooddesciption 
  ADD CONSTRAINT FK_fooddesciption_FoodID FOREIGN KEY (FoodID)
    REFERENCES food(ID);


ALTER TABLE fooddesciption 
  ADD CONSTRAINT FK_fooddesciption_RestaurantID FOREIGN KEY (RestaurantID)
    REFERENCES restaurant(ID);


CREATE TABLE role (
  ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(10) NOT NULL DEFAULT '',
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 5,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


CREATE TABLE user (
  ID INT NOT NULL AUTO_INCREMENT,
  Username VARCHAR(256) NOT NULL DEFAULT '',
  Password VARCHAR(256) NOT NULL DEFAULT '',
  AvatarLink VARCHAR(1024) NOT NULL DEFAULT '',
  Email VARCHAR(256) NOT NULL DEFAULT '',
  Phone VARCHAR(10) NOT NULL DEFAULT '',
  RoleId INT NOT NULL,
  Status SMALLINT NOT NULL,
  Address VARCHAR(256) DEFAULT 'ベトナム',
  Sex VARCHAR(50) NOT NULL DEFAULT '男',
  Point VARCHAR(256) DEFAULT '',
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE user 
  ADD CONSTRAINT CK_User CHECK ((`RoleId` > -(1)) and (`RoleId` < 3));


ALTER TABLE user 
  ADD UNIQUE INDEX Username(Username);


ALTER TABLE user 
  ADD CONSTRAINT FK_user_RoleId FOREIGN KEY (RoleId)
    REFERENCES role(ID);


CREATE TABLE foodreview (
  ID INT NOT NULL AUTO_INCREMENT,
  UserID INT NOT NULL,
  FoodDesID INT NOT NULL,
  Review VARCHAR(2048) NOT NULL DEFAULT '',
  Rating INT NOT NULL,
  Status SMALLINT NOT NULL,
  GroupImageID INT DEFAULT NULL,
  UpdatedAt DATETIME NOT NULL,
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 266,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE foodreview 
  ADD CONSTRAINT FK_foodreview_FoodDesID FOREIGN KEY (FoodDesID)
    REFERENCES fooddesciption(ID);


ALTER TABLE foodreview 
  ADD CONSTRAINT FK_foodreview_GroupImageID FOREIGN KEY (GroupImageID)
    REFERENCES image(GroupID);


ALTER TABLE foodreview 
  ADD CONSTRAINT FK_foodreview_UserID FOREIGN KEY (UserID)
    REFERENCES user(ID);


CREATE TABLE reply (
  ID INT NOT NULL AUTO_INCREMENT,
  UserID INT NOT NULL,
  ReviewID INT NOT NULL,
  Comment VARCHAR(2048) NOT NULL DEFAULT '',
  Status SMALLINT DEFAULT NULL,
  UpdatedAt DATETIME NOT NULL,
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE reply 
  ADD CONSTRAINT FK_reply_ReviewID FOREIGN KEY (ReviewID)
    REFERENCES foodreview(ID);


ALTER TABLE reply 
  ADD CONSTRAINT FK_reply_UserID FOREIGN KEY (UserID)
    REFERENCES user(ID);


CREATE TABLE reactreview (
  UserID INT NOT NULL,
  ReviewID INT NOT NULL,
  React SMALLINT DEFAULT NULL,
  PRIMARY KEY (UserID, ReviewID)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE reactreview 
  ADD CONSTRAINT CK_reactreview CHECK ((`React` > -(1)) and (`React` < 6));


ALTER TABLE reactreview 
  ADD CONSTRAINT FK_ReactReview_ReviewID FOREIGN KEY (ReviewID)
    REFERENCES foodreview(ID);


ALTER TABLE reactreview 
  ADD CONSTRAINT FK_ReactReview_UserID FOREIGN KEY (UserID)
    REFERENCES user(ID);


INSERT INTO image VALUES
(1, 1, 'dsads', 'dsdsd'),
(2, 2, 'dsads', 'e3f3g3'),
(3, 3, 'dsads', 'cxvb'),
(4, 4, 'dsads', 'frt5y'),
(5, 5, 'dsads', 'acbvb'),
(6, 6, 'dsads', 'dt43y5y'),
(7, 7, 'dsads', 'dsagg55'),
(8, 8, 'dsads', 'dqr4365'),
(9, 9, 'dsads', 'vdvdhty'),
(10, 10, 'dsads', 'dwer435'),
(11, 11, 'dsads', 'd3t4t4'),
(12, 12, 'dsads', 'd32t43t'),
(13, 13, 'dsads', 'dsadsv445'),
(14, 14, 'dsads', 'd3r35r'),
(15, 15, 'dsads', 'dsd55'),
(16, 16, 'dsads', 'd3rr353'),
(17, 17, 'dsads', 'd4646'),
(18, 18, 'dsads', 'dsd2222'),
(19, 19, 'dsads', 'dvdbd'),
(20, 20, 'dsads', 'dgy757');


INSERT INTO category VALUES
(1, 'com', 'cui bap', 2),
(2, 'hamburger', 'cui bap', 3),
(3, 'Banh gato', 'dsadsa', 4),
(4, 'Pizza', 'ddddd', 5),
(5, 'Udon', 'dvddb', 6);


INSERT INTO restaurant VALUES
(1, 'Tikkaway', 'abc', '08:30', '22:30', '0123456730', 'HA Noi', 1, 1),
(2, 'Curry Kingdom', 'adb', '08:00', '22:00', '0123456738', 'Hai Phong', 2, 1),
(3, 'Tikka Talk', 'ddddd', '17:30', '21:00', '0123456748', 'Da Nang', 3, 1),
(4, 'The Spice Factory', 'ddsads', '06:33', '12:30', '0123456758', 'TP HCM', 4, 1),
(5, 'The Paneer Bar', 'ewqewq', '08:30', '23:00', '0123456735', 'HA Noi', 5, 1),
(6, 'Curry Leaves', 'ewqewqe', '12:30', '23:40', '0123456755', 'USA', 6, 1);


INSERT INTO food VALUES
(1, 'Tempura', 1),
(2, 'Sushi', 1),
(3, 'Sashimi', 1),
(4, 'Yakitori', 1),
(5, 'Ramen', 2),
(6, 'Okonomiyaki', 2),
(7, 'Jiaozi', 2),
(8, 'Takoyaki', 2),
(9, 'Sukiyaki', 3),
(10, 'Champon', 3),
(11, 'Edamame', 3),
(12, 'Fugu', 3),
(13, 'Gyoza', 4),
(14, 'Gyudon', 4),
(15, 'Gyukatsu', 4),
(16, 'Gyutan', 4),
(17, 'Karaage', 5),
(18, 'Katsudon', 5),
(19, 'Kushikatsu', 5),
(20, 'Miso Soup', 5);


INSERT INTO role VALUES
(1, 'スタッフ'),
(2, 'ユーザー'),
(4, 'アドミン');


INSERT INTO fooddesciption VALUES
(150, 1, 1, 'dsad', 1, 48000, 1),
(151, 2, 1, 'dsaddd', 2, 56000, 1),
(152, 3, 1, 'dddd', 3, 32000, 1),
(153, 4, 1, 'asasas', 4, 30000, 1),
(154, 2, 2, 'sdwqdwq', 2, 30000, 1),
(155, 3, 2, 'dwqdwqd', 3, 44300, 1),
(156, 4, 2, 'dwqdwqd', 4, 47500, 1),
(157, 5, 2, 'dwqdwq', 5, 39000, 1),
(158, 6, 2, 'dwqdwq', 6, 35000, 1),
(159, 3, 3, 'dwqdwq', 3, 31230, 1),
(160, 4, 3, 'dwqdwq', 4, 56788, 1),
(161, 5, 3, 'dwqd', 5, 33333, 1),
(162, 6, 3, 'wdwwdwd', 6, 99999, 1),
(163, 7, 3, 'dwqdwqdw', 7, 11234, 1),
(164, 8, 3, 'dwqdwqd', 8, 43888, 1),
(165, 1, 4, 'dwqdwq', 1, 65777, 1),
(166, 3, 4, 'dwqdwq', 3, 32323, 1),
(167, 5, 4, 'dwqdwqd', 5, 12344, 1),
(168, 9, 4, 'dwqdwq', 9, 12344, 1),
(169, 10, 5, 'dwqdwq', 10, 30000, 1),
(170, 12, 5, '23123', 12, 98989, 1),
(171, 11, 5, '5dsadsa', 11, 34556, 1),
(172, 13, 5, 'fdsvds', 13, 32323, 1),
(173, 14, 5, 'dsgds', 14, 12121, 1),
(174, 14, 6, 'gdsg', 14, 33232, 1),
(175, 15, 6, 'gdsg', 15, 32322, 1),
(176, 16, 6, 'gdsg', 16, 76767, 1),
(177, 17, 6, 'gdsgds', 17, 98888, 1),
(178, 18, 3, 'gdsgds', 18, 98888, 1),
(179, 19, 1, 'gdsgds', 19, 98888, 1),
(180, 20, 4, 'gdsgds', 20, 98888, 1);


INSERT INTO user VALUES
(1, 'vietdung123', '1234', 'dsadsad', 'dsad@gami.com', '0123456790', 2, 1, 'ddsad', 'Male', '1000'),
(2, 'duchuy234', '1234', 'dsads', 'dsad@gami.com', '0123456790', 2, 1, 'dsad', 'Male', '1000'),
(3, 'nhatsang000', '1234', 'dsads', 'dsad@gami.com', '0123456790', 2, 1, 'dsad', 'Male', '1000'),
(4, 'hoanganh132', '1234', 'dddd', 'dsad@gami.com', '0123456790', 2, 1, 'dsad', 'Male', '1000'),
(5, 'nguyenduc2222', '1234', 'dddd', 'dsad@gami.com', '0123456790', 2, 1, 'ddsad', 'Male', '1000');


INSERT INTO foodreview VALUES
(205, 3, 159, 'dsadsa', 3, 1, NULL, '2023-06-02 00:00:00'),
(206, 2, 165, 'dsadsa', 4, 1, NULL, '2023-06-02 00:00:00'),
(207, 4, 157, 'dsadsa', 4, 1, NULL, '2023-06-02 00:00:00'),
(208, 3, 152, 'dsadsa', 4, 1, NULL, '2023-06-02 00:00:00'),
(209, 1, 151, 'dsadsa', 3, 1, NULL, '2023-06-02 00:00:00'),
(210, 3, 160, 'dsadsa', 2, 1, NULL, '2023-06-02 00:00:00'),
(211, 5, 162, 'dsadsa', 5, 1, NULL, '2023-06-02 00:00:00'),
(212, 1, 168, 'dsadsa', 3, 1, NULL, '2023-06-02 00:00:00'),
(213, 2, 164, 'dsadsa', 4, 1, NULL, '2023-06-02 00:00:00'),
(214, 4, 160, 'dsadsa', 3, 1, NULL, '2023-06-02 00:00:00'),
(215, 4, 152, 'dsadsa', 3, 1, NULL, '2023-06-02 00:00:00'),
(216, 4, 156, 'dsadsa', 4, 1, NULL, '2023-06-02 00:00:00'),
(217, 2, 170, 'dsadsa', 1, 1, NULL, '2023-06-02 00:00:00'),
(218, 2, 176, 'dsadsa', 3, 1, NULL, '2023-06-02 00:00:00'),
(219, 3, 154, 'dsadsa', 2, 1, NULL, '2023-06-02 00:00:00'),
(220, 1, 174, 'dsadsa', 3, 1, NULL, '2023-06-02 00:00:00'),
(221, 2, 159, 'dsadsa', 4, 1, NULL, '2023-06-02 00:00:00'),
(222, 1, 173, 'dsadsa', 4, 1, NULL, '2023-06-02 00:00:00'),
(223, 5, 168, 'dsadsa', 1, 1, NULL, '2023-06-02 00:00:00'),
(224, 1, 160, 'dsadsa', 4, 1, NULL, '2023-06-02 00:00:00'),
(225, 4, 158, 'dsadsa', 5, 1, NULL, '2023-06-02 00:00:00'),
(226, 5, 167, 'dsadsa', 5, 1, NULL, '2023-06-02 00:00:00'),
(227, 3, 157, 'dsadsa', 4, 1, NULL, '2023-06-02 00:00:00'),
(228, 4, 168, 'dsadsa', 2, 1, NULL, '2023-06-02 00:00:00'),
(229, 4, 176, 'dsadsa', 1, 1, NULL, '2023-06-02 00:00:00'),
(230, 2, 173, 'dsadsa', 4, 1, NULL, '2023-06-02 00:00:00'),
(231, 1, 162, 'dsadsa', 3, 1, NULL, '2023-06-02 00:00:00'),
(232, 3, 179, 'dsadsa', 4, 1, NULL, '2023-06-02 00:00:00'),
(233, 2, 171, 'dsadsa', 5, 1, NULL, '2023-06-02 00:00:00'),
(234, 2, 156, 'dsadsa', 5, 1, NULL, '2023-06-02 00:00:00'),
(235, 5, 161, 'dsadsa', 5, 1, NULL, '2023-06-02 00:00:00'),
(236, 2, 160, 'dsadsa', 5, 1, NULL, '2023-06-02 00:00:00'),
(237, 5, 158, 'dsadsa', 4, 1, NULL, '2023-06-02 00:00:00'),
(238, 2, 155, 'dsadsa', 1, 1, NULL, '2023-06-02 00:00:00'),
(239, 4, 164, 'dsadsa', 3, 1, NULL, '2023-06-02 00:00:00'),
(240, 4, 166, 'dsadsa', 1, 1, NULL, '2023-06-02 00:00:00'),
(241, 1, 176, 'dsadsa', 2, 1, NULL, '2023-06-02 00:00:00'),
(242, 3, 156, 'dsadsa', 5, 1, NULL, '2023-06-02 00:00:00'),
(243, 4, 171, 'dsadsa', 3, 1, NULL, '2023-06-02 00:00:00'),
(244, 4, 163, 'dsadsa', 1, 1, NULL, '2023-06-02 00:00:00'),
(245, 5, 157, 'dsadsa', 2, 1, NULL, '2023-06-02 00:00:00'),
(246, 5, 169, 'dsadsa', 2, 1, NULL, '2023-06-02 00:00:00'),
(247, 5, 165, 'dsadsa', 2, 1, NULL, '2023-06-02 00:00:00'),
(248, 3, 171, 'dsadsa', 5, 1, NULL, '2023-06-02 00:00:00'),
(249, 1, 152, 'dsadsa', 1, 1, NULL, '2023-06-02 00:00:00'),
(250, 1, 175, 'dsadsa', 2, 1, NULL, '2023-06-02 00:00:00'),
(251, 5, 170, 'dsadsa', 5, 1, NULL, '2023-06-02 00:00:00'),
(252, 2, 153, 'dsadsa', 2, 1, NULL, '2023-06-02 00:00:00'),
(253, 5, 153, 'dsadsa', 4, 1, NULL, '2023-06-02 00:00:00'),
(254, 4, 159, 'dsadsa', 2, 1, NULL, '2023-06-02 00:00:00'),
(255, 3, 155, 'dsadsa', 5, 1, NULL, '2023-06-02 00:00:00'),
(256, 1, 157, 'dsadsa', 1, 1, NULL, '2023-06-02 00:00:00'),
(257, 5, 174, 'dsadsa', 4, 1, NULL, '2023-06-02 00:00:00'),
(258, 4, 167, 'dsadsa', 2, 1, NULL, '2023-06-02 00:00:00'),
(259, 5, 155, 'dsadsa', 1, 1, NULL, '2023-06-02 00:00:00'),
(260, 5, 171, 'dsadsa', 3, 1, NULL, '2023-06-02 00:00:00'),
(261, 5, 154, 'dsadsa', 5, 1, NULL, '2023-06-02 00:00:00'),
(262, 3, 162, 'dsadsa', 5, 1, NULL, '2023-06-02 00:00:00'),
(263, 3, 165, 'dsadsa', 5, 1, NULL, '2023-06-02 00:00:00'),
(264, 4, 178, 'dsadsa', 3, 1, NULL, '2023-06-02 00:00:00'),
(265, 1, 169, 'dsadsa', 3, 1, NULL, '2023-06-02 00:00:00');


