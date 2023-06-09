
SET NAMES 'utf8';


USE tabeyoudb;


DROP TABLE IF EXISTS reactreview;


DROP TABLE IF EXISTS reply;


DROP TABLE IF EXISTS foodreview;


DROP TABLE IF EXISTS user;


DROP TABLE IF EXISTS role;


DROP TABLE IF EXISTS fooddescription;


DROP TABLE IF EXISTS restaurant;


DROP TABLE IF EXISTS food;


DROP TABLE IF EXISTS category;


DROP TABLE IF EXISTS image;


USE tabeyoudb;


CREATE TABLE image (
  ID int NOT NULL AUTO_INCREMENT,
  GroupID int NOT NULL,
  Title varchar(256) NOT NULL DEFAULT '',
  Src varchar(1024) NOT NULL DEFAULT '',
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 39,
AVG_ROW_LENGTH = 819,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


CREATE TABLE category (
  ID int NOT NULL AUTO_INCREMENT,
  Name varchar(10) NOT NULL DEFAULT '',
  Description varchar(2048) NOT NULL DEFAULT '',
  ImageId int DEFAULT NULL,
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 11,
AVG_ROW_LENGTH = 3276,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE category
 ADD CONSTRAINT FK_category_ImageId FOREIGN KEY (ImageId)
REFERENCES image (ID);


CREATE TABLE food (
  ID int NOT NULL AUTO_INCREMENT,
  Name varchar(50) NOT NULL DEFAULT '',
  CategoryId int DEFAULT NULL,
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 21,
AVG_ROW_LENGTH = 819,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE food
 ADD CONSTRAINT FK_Food_CategoryId FOREIGN KEY (CategoryId)
REFERENCES category (ID) ON DELETE CASCADE ON UPDATE CASCADE;


CREATE TABLE restaurant (
  ID int NOT NULL AUTO_INCREMENT,
  Name varchar(256) NOT NULL DEFAULT '',
  Description varchar(256) NOT NULL DEFAULT '',
  OpenTime varchar(5) NOT NULL DEFAULT '',
  CloseTime varchar(5) NOT NULL DEFAULT '',
  Phone varchar(256) NOT NULL DEFAULT '',
  Province varchar(256) NOT NULL DEFAULT 'ハノイ',
  GroupImageID int DEFAULT NULL,
  Status smallint NOT NULL,
  District varchar(255) DEFAULT NULL,
  Ward varchar(255) DEFAULT NULL,
  DetailedAddress varchar(255) DEFAULT NULL,
  Avatar varchar(255) DEFAULT NULL,
  `From` varchar(255) DEFAULT NULL,
  `To` varchar(255) DEFAULT NULL,
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 7,
AVG_ROW_LENGTH = 2730,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE fooddescription (
  ID int NOT NULL AUTO_INCREMENT,
  FoodID int NOT NULL,
  RestaurantID int NOT NULL,
  Description varchar(2048) NOT NULL DEFAULT '',
  GroupImageID int DEFAULT NULL,
  Price int DEFAULT NULL,
  Status smallint NOT NULL,
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 181,
AVG_ROW_LENGTH = 528,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE fooddescription
 ADD CONSTRAINT FK_fooddescription_FoodID FOREIGN KEY (FoodID)
REFERENCES food (ID) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE fooddescription
 ADD CONSTRAINT FK_fooddescription_RestaurantID FOREIGN KEY (RestaurantID)
REFERENCES restaurant (ID) ON DELETE CASCADE ON UPDATE CASCADE;


CREATE TABLE role (
  ID int NOT NULL AUTO_INCREMENT,
  Name varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 5,
AVG_ROW_LENGTH = 5461,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


CREATE TABLE user (
  ID int NOT NULL AUTO_INCREMENT,
  Username varchar(256) NOT NULL DEFAULT '',
  Password varchar(256) NOT NULL DEFAULT '',
  AvatarLink varchar(1024) NOT NULL DEFAULT '',
  Email varchar(256) NOT NULL DEFAULT '',
  Phone varchar(10) NOT NULL DEFAULT '',
  RoleId int NOT NULL,
  Status smallint NOT NULL,
  Address varchar(256) DEFAULT 'ベトナム',
  Sex varchar(50) NOT NULL DEFAULT '男',
  Point varchar(256) DEFAULT '',
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
AVG_ROW_LENGTH = 3276,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE user
 ADD CONSTRAINT CK_User CHECK ((`RoleId` > -(1)) AND (`RoleId` < 3));


ALTER TABLE user
 ADD UNIQUE INDEX Username (Username);


ALTER TABLE user
 ADD CONSTRAINT FK_user_RoleId FOREIGN KEY (RoleId)
REFERENCES role (ID);


CREATE TABLE foodreview (
  ID int NOT NULL AUTO_INCREMENT,
  UserID int NOT NULL,
  FoodDesID int NOT NULL,
  Review varchar(2048) NOT NULL DEFAULT '',
  Rating int NOT NULL,
  Status smallint NOT NULL,
  GroupImageID int DEFAULT NULL,
  UpdatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
AUTO_INCREMENT = 267,
AVG_ROW_LENGTH = 268,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE foodreview
 ADD CONSTRAINT FK_foodreview_FoodDesID FOREIGN KEY (FoodDesID)
REFERENCES fooddescription (ID) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE foodreview
 ADD CONSTRAINT FK_foodreview_UserID FOREIGN KEY (UserID)
REFERENCES user (ID) ON DELETE CASCADE ON UPDATE CASCADE;


CREATE TABLE reply (
  ID int NOT NULL AUTO_INCREMENT,
  UserID int NOT NULL,
  ReviewID int NOT NULL,
  Comment varchar(2048) NOT NULL DEFAULT '',
  Status smallint DEFAULT NULL,
  UpdatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ID)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE reply
 ADD CONSTRAINT FK_reply_ReviewID FOREIGN KEY (ReviewID)
REFERENCES foodreview (ID) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE reply
 ADD CONSTRAINT FK_reply_UserID FOREIGN KEY (UserID)
REFERENCES user (ID) ON DELETE CASCADE ON UPDATE CASCADE;


CREATE TABLE reactreview (
  UserID int NOT NULL,
  ReviewID int NOT NULL,
  React smallint DEFAULT NULL,
  PRIMARY KEY (UserID, ReviewID)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;


ALTER TABLE reactreview
 ADD CONSTRAINT CK_reactreview CHECK ((`React` > -(1)) AND (`React` < 6));


ALTER TABLE reactreview
 ADD CONSTRAINT FK_ReactReview_ReviewID FOREIGN KEY (ReviewID)
REFERENCES foodreview (ID);


ALTER TABLE reactreview
 ADD CONSTRAINT FK_ReactReview_UserID FOREIGN KEY (UserID)
REFERENCES user (ID);


INSERT INTO image VALUES
(2, 2, 'dsads', '/upload/img-resource/foods/sushi.jpg'),
(3, 3, 'dsads', '/upload/img-resource/foods/sashimi.jpg'),
(4, 4, 'dsads', '/upload/img-resource/foods/yakitori.jpg'),
(5, 5, 'dsads', '/upload/img-resource/foods/ramen.png'),
(6, 6, 'dsads', '/upload/img-resource/foods/okonomiyaki.jpg'),
(7, 7, 'dsads', '/upload/img-resource/foods/jiaozi.jpg'),
(8, 8, 'dsads', '/upload/img-resource/foods/takoyaki.jpg'),
(9, 9, 'dsads', '/upload/img-resource/foods/sukiyaki.jpg'),
(10, 10, 'dsads', '/upload/img-resource/foods/Champon.jpg'),
(11, 11, 'dsads', '/upload/img-resource/foods/edamame.jpg'),
(12, 12, 'dsads', '/upload/img-resource/foods/Fugu.jpg'),
(13, 13, 'dsads', '/upload/img-resource/foods/Gyoza.jpg'),
(14, 14, 'dsads', '/upload/img-resource/foods/gyudon.jpg'),
(15, 15, 'dsads', '/upload/img-resource/foods/gyukatsu.jpg'),
(16, 16, 'dsads', '/upload/img-resource/foods/gyutan.jpg'),
(17, 17, 'dsads', '/upload/img-resource/foods/karaage.jpeg'),
(18, 18, 'dsads', '/upload/img-resource/foods/katsudon.jpeg'),
(19, 19, 'dsads', '/upload/img-resource/foods/Kushikatsu.jpg'),
(20, 20, 'dsads', '/upload/img-resource/foods/Miso-soup.jpeg'),
(21, 0, 'dsads', '/upload/img-resource/categories/drink-icon.jpg'),
(22, 0, 'dsads', '/upload/img-resource/categories/soup-icon.jpg'),
(23, 0, 'dsads', '/upload/img-resource/categories/skewer-icon.jpg'),
(24, 0, 'dsads', '/upload/img-resource/categories/rice-icon.jpg'),
(25, 0, 'dsads', '/upload/img-resource/categories/noodles-icon.jpg'),
(26, 0, 'dsads', '/upload/img-resource/categories/sushi-icon.jpg'),
(27, 0, 'dsads', '/upload/img-resource/categories/com-nam-icon.jpg'),
(28, 0, 'dsads', '/upload/img-resource/categories/soup-icon.jpg'),
(29, 0, 'dsads', '/upload/img-resource/categories/tea-icon.jpg'),
(30, 0, 'dsads', '/upload/img-resource/categories/fried-food-icon.jpg'),
(36, 1, '', '/upload/restaurant/image/3da746cdf2f9224e8d32f8fa8c092eda.jpeg'),
(37, 1, '', '/upload/restaurant/image/92bf064e3f81a0047bac7343001159e3.jpg'),
(38, 1, '', '/upload/restaurant/image/751305b96d00d4e92df1d64af3106bfd.jpg');


INSERT INTO category VALUES
(1, 'drink', 'cui bap', 21),
(2, 'hotpot', 'cui bap', 22),
(3, 'bbq', 'good', 23),
(4, 'rice', 'ddddd', 24),
(5, 'noodle', 'dvddb', 25),
(6, 'roll', 'dvddb', 26),
(7, 'snack', 'dvddb', 27),
(8, 'vegetarian', 'dvddb', 28),
(9, 'dessert', 'dvddb', 29),
(10, 'other', 'dvddb', 30);


INSERT INTO restaurant VALUES
(1, 'a', 'abc', '08:30', '22:30', '0123456730', 'Thành phố Hà Nội', 1, 1, 'Huyện Từ Liêm', 'Phố Đỗ Đức Dục', 'số 8 Đỗ Đức Dục, Từ Liêm, Hà Nội', '/upload/restaurant/avatar/91e7e433e34c3b8843334c1467001cb7.jpg', 'Thứ 2', 'Thứ 6'),
(2, 'Curry Kingdom', 'adb', '08:00', '22:00', '0123456738', 'Thành phố Hà Nội', 2, 1, 'Quận Hoàn Kiếm', 'Phố Gia Ngư', '38 Gia Ngư, Hoàn Kiếm, Hà Nội', '/upload/restaurant/avatar/91e7e433e34c3b8843334c1467001cb7.jpg', 'Thứ 2', 'Chủ Nhật'),
(3, 'Tikka Talk', 'ddddd', '17:30', '21:00', '0123456748', 'Thành phố Hà Nội', 3, 1, 'Quận Thanh Xuân', 'Phố Ngụy Như Kon Tum', 'số 1 Ngụy Như Kon Tum, Thanh Xuân, Hà Nội', '/upload/restaurant/avatar/91e7e433e34c3b8843334c1467001cb7.jpg', 'Thứ 5', 'Chủ Nhật'),
(4, 'The Spice Factory', 'ddsads', '06:33', '12:30', '0123456758', 'Thành phố Hà Nội', 4, 1, 'Quận Hoàn Kiếm', 'Phố Nguyễn Quang Bích', '12 Nguyễn Quang Bích, Hoàn Kiếm, Hà Nội', '/upload/restaurant/avatar/91e7e433e34c3b8843334c1467001cb7.jpg', 'Thứ 6', 'Chủ Nhật'),
(5, 'The Paneer Bar', 'ewqewq', '08:30', '23:00', '0123456735', 'Thành phố Hà Nội', 5, 1, 'Quận Hoàn Kiếm', 'Phố Đinh Tiên Hoàng', 'số 7 Đinh Tiên Hoàng, Hoàn Kiếm, Hà Nội', '/upload/restaurant/avatar/91e7e433e34c3b8843334c1467001cb7.jpg', 'Thứ 2', 'Thứ 5'),
(6, 'Curry Leaves', 'ewqewqe', '12:30', '23:40', '0123456755', 'Thành phố Hà Nội', 6, 1, 'Quận Hoàn Kiếm', 'Phố Tông Đản', '24 Tông Đản, Tràng Tiền, Hoàn Kiếm, Hà Nội', '/upload/restaurant/avatar/91e7e433e34c3b8843334c1467001cb7.jpg', 'Thứ 3', 'Thứ 7');


INSERT INTO food VALUES
(2, 'Sushi', 6),
(3, 'Sashimi', 4),
(4, 'Yakitori', 3),
(5, 'Ramen', 5),
(6, 'Okonomiyaki', 10),
(7, 'Jiaozi', 10),
(8, 'Takoyaki', 3),
(9, 'Sukiyaki', 3),
(10, 'Champon', 5),
(11, 'Edamame', 10),
(12, 'Fugu', 10),
(13, 'Gyoza', 4),
(14, 'Gyudon', 4),
(15, 'Gyukatsu', 4),
(16, 'Gyutan', 4),
(17, 'Karaage', 3),
(18, 'Katsudon', 4),
(19, 'Kushikatsu', 10),
(20, 'Miso Soup', 8);


INSERT INTO role VALUES
(1, 'スタッフ'),
(2, 'ユーザー'),
(4, 'アドミン');


INSERT INTO fooddescription VALUES
(151, 2, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 2, 56000, 1),
(152, 3, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 3, 32000, 1),
(153, 4, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 4, 30000, 1),
(154, 2, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 2, 30000, 1),
(155, 3, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 3, 44300, 1),
(156, 4, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 4, 47500, 1),
(157, 5, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 5, 39000, 1),
(158, 6, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 6, 35000, 1),
(159, 3, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 3, 31230, 1),
(160, 4, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 4, 56788, 1),
(161, 5, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 5, 33333, 1),
(162, 6, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 6, 99999, 1),
(163, 7, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 7, 11234, 1),
(164, 8, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 8, 43888, 1),
(166, 3, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 3, 32323, 1),
(167, 5, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 5, 12344, 1),
(168, 9, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 9, 12344, 1),
(169, 10, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 10, 30000, 1),
(170, 12, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 12, 98989, 1),
(171, 11, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 11, 34556, 1),
(172, 13, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 13, 32323, 1),
(173, 14, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 14, 12121, 1),
(174, 14, 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 14, 33232, 1),
(175, 15, 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 15, 32322, 1),
(176, 16, 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 16, 76767, 1),
(177, 17, 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 17, 98888, 1),
(178, 18, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 18, 98888, 1),
(179, 19, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 19, 98888, 1),
(180, 20, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce diam nulla, maximus et ligula a, vestibulum pellentesque justo. Praesent aliquam metus eu porta viverra. Sed vitae lectus nunc. Maecenas sollicitudin at mauris a luctus. Duis pulvinar risus nunc, vitae imperdiet purus pharetra nec. Sed sit amet placerat magna. Praesent imperdiet elit sed orci porta semper. Fusce mattis urna non ligula ultrices tincidunt. Proin rhoncus sit amet magna quis venenatis. Aenean libero erat, rhoncus et lorem tempus, efficitur egestas felis. Ut non quam molestie, volutpat massa id, aliquam orci.', 20, 98888, 1);


INSERT INTO user VALUES
(1, 'vietdung123', '1234', 'この料理はとてもおいしいd', 'dsad@gami.com', '0123456791', 2, 1, 'ddsad', 'Male', '1000'),
(2, 'duchuy234', '1234', 'dsads', 'dsad@gami.com', '0123456792', 2, 1, 'dsad', 'Male', '1000'),
(3, 'nhatsang000', '1234', 'dsads', 'dsad@gami.com', '0123456793', 2, 1, 'dsad', 'Male', '1000'),
(4, 'hoanganh132', '1234', 'dddd', 'dsad@gami.com', '0123456794', 2, 1, 'dsad', 'Male', '1000'),
(5, 'nguyenduc2222', '1234', 'dddd', 'dsad@gami.com', '0123456795', 2, 1, 'ddsad', 'Male', '1000');


INSERT INTO foodreview VALUES
(205, 3, 159, 'この料理はとてもおいしい', 3, 1, NULL, '2023-06-02 00:00:00'),
(207, 4, 157, 'ママと思う', 4, 1, NULL, '2023-06-02 00:00:00'),
(208, 3, 152, 'ママと思う', 4, 1, NULL, '2023-06-02 00:00:00'),
(210, 3, 160, 'この料理はとてもおいしい', 2, 1, NULL, '2023-06-02 00:00:00'),
(211, 5, 162, 'この料理はとてもおいしい', 5, 1, NULL, '2023-06-02 00:00:00'),
(212, 1, 168, 'この料理はとてもおいしい', 3, 1, NULL, '2023-06-02 00:00:00'),
(213, 2, 164, 'この料理はとてもおいしい', 4, 1, NULL, '2023-06-02 00:00:00'),
(214, 4, 160, 'この料理はとてもおいしい', 3, 1, NULL, '2023-06-02 00:00:00'),
(215, 4, 152, 'この料理はとてもおいしい', 3, 1, NULL, '2023-06-02 00:00:00'),
(216, 4, 156, 'この料理はとてもおいしい', 4, 1, NULL, '2023-06-02 00:00:00'),
(217, 2, 170, 'この料理はとてもおいしい', 1, 1, NULL, '2023-06-02 00:00:00'),
(218, 2, 176, 'この料理はとてもおいしい', 3, 1, NULL, '2023-06-02 00:00:00'),
(219, 3, 154, 'この料理はとてもおいしい', 2, 1, NULL, '2023-06-02 00:00:00'),
(220, 1, 174, 'この料理はとてもおいしい', 3, 1, NULL, '2023-06-02 00:00:00'),
(221, 2, 159, 'この料理はとてもおいしい', 4, 1, NULL, '2023-06-02 00:00:00'),
(222, 1, 173, 'この料理はとてもおいしい', 4, 1, NULL, '2023-06-02 00:00:00'),
(223, 5, 168, 'この料理はとてもおいしい', 1, 1, NULL, '2023-06-02 00:00:00'),
(224, 1, 160, 'この料理はとてもおいしい', 4, 1, NULL, '2023-06-02 00:00:00'),
(225, 4, 158, 'この料理はとてもおいしい', 5, 1, NULL, '2023-06-02 00:00:00'),
(226, 5, 167, 'この料理はとてもおいしい', 5, 1, NULL, '2023-06-02 00:00:00'),
(227, 3, 157, 'この料理はとてもおいしい', 4, 1, NULL, '2023-06-02 00:00:00'),
(228, 4, 168, 'この料理はとてもおいしい', 2, 1, NULL, '2023-06-02 00:00:00'),
(229, 4, 176, 'この料理はとてもおいしい', 1, 1, NULL, '2023-06-02 00:00:00'),
(230, 2, 173, 'この料理はとてもおいしい', 4, 1, NULL, '2023-06-02 00:00:00'),
(231, 1, 162, 'この料理はとてもおいしい', 3, 1, NULL, '2023-06-02 00:00:00'),
(232, 3, 179, 'この料理はとてもおいしい', 4, 1, NULL, '2023-06-02 00:00:00'),
(233, 2, 171, 'この料理はとてもおいしい', 5, 1, NULL, '2023-06-02 00:00:00'),
(234, 2, 156, 'この料理はとてもおいしい', 5, 1, NULL, '2023-06-02 00:00:00'),
(235, 5, 161, 'この料理はとてもおいしい', 5, 1, NULL, '2023-06-02 00:00:00'),
(236, 2, 160, 'この料理はとてもおいしい', 5, 1, NULL, '2023-06-02 00:00:00'),
(237, 5, 158, 'この料理はとてもおいしい', 4, 1, NULL, '2023-06-02 00:00:00'),
(238, 2, 155, 'この料理はとてもおいしい', 1, 1, NULL, '2023-06-02 00:00:00'),
(239, 4, 164, 'この料理はとてもおいしい', 3, 1, NULL, '2023-06-02 00:00:00'),
(240, 4, 166, 'この料理はとてもおいしい', 1, 1, NULL, '2023-06-02 00:00:00'),
(241, 1, 176, 'この料理はとてもおいしい', 2, 1, NULL, '2023-06-02 00:00:00'),
(242, 3, 156, 'この料理はとてもおいしい', 5, 1, NULL, '2023-06-02 00:00:00'),
(243, 4, 171, 'この料理はとてもおいしい', 3, 1, NULL, '2023-06-02 00:00:00'),
(244, 4, 163, 'この料理はとてもおいしい', 1, 1, NULL, '2023-06-02 00:00:00'),
(245, 5, 157, 'この料理はとてもおいしい', 2, 1, NULL, '2023-06-02 00:00:00'),
(246, 5, 169, 'この料理はとてもおいしい', 2, 1, NULL, '2023-06-02 00:00:00'),
(248, 3, 171, 'この料理はとてもおいしい', 5, 1, NULL, '2023-06-02 00:00:00'),
(249, 1, 152, 'この料理はとてもおいしい', 1, 1, NULL, '2023-06-02 00:00:00'),
(250, 1, 175, 'この料理はとてもおいしい', 2, 1, NULL, '2023-06-02 00:00:00'),
(251, 5, 170, 'この料理はとてもおいしい', 5, 1, NULL, '2023-06-02 00:00:00'),
(252, 2, 153, 'この料理はとてもおいしい', 2, 1, NULL, '2023-06-02 00:00:00'),
(253, 5, 153, 'この料理はとてもおいしい', 4, 1, NULL, '2023-06-02 00:00:00'),
(254, 4, 159, 'この料理はとてもおいしい', 2, 1, NULL, '2023-06-02 00:00:00'),
(255, 3, 155, 'この料理はとてもおいしい', 5, 1, NULL, '2023-06-02 00:00:00'),
(256, 1, 157, 'この料理はとてもおいしい', 1, 1, NULL, '2023-06-02 00:00:00'),
(257, 5, 174, 'この料理はとてもおいしい', 4, 1, NULL, '2023-06-02 00:00:00'),
(258, 4, 167, 'この料理はとてもおいしい', 2, 1, NULL, '2023-06-02 00:00:00'),
(259, 5, 155, 'この料理はとてもおいしい', 1, 1, NULL, '2023-06-02 00:00:00'),
(260, 5, 171, 'この料理はとてもおいしい', 3, 1, NULL, '2023-06-02 00:00:00'),
(261, 5, 154, 'この料理はとてもおいしい', 5, 1, NULL, '2023-06-02 00:00:00'),
(262, 3, 162, 'この料理はとてもおいしい', 5, 1, NULL, '2023-06-02 00:00:00'),
(264, 4, 178, 'この料理はとてもおいしい', 3, 1, NULL, '2023-06-02 00:00:00'),
(265, 1, 169, 'この料理はとてもおいしい', 3, 1, NULL, '2023-06-02 00:00:00'),
(266, 3, 151, 'この料理はとてもおいしい', 4, 1, 5757865, '2023-07-04 21:09:33');


INSERT INTO reactreview VALUES
(3, 266, 3);
