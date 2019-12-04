CREATE DATABASE cab_service;

USE cab_service;

CREATE TABLE IF NOT EXISTS `cab_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_location` varchar(200) DEFAULT 'NA',
  `seats` int(11) DEFAULT 2,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `user_bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` varchar(200) NOT NULL,
  `destination` varchar(200) NOT NULL,
  `noOfPerson` int(11) DEFAULT 1,
  `fare` int(11) DEFAULT 0,
  `cab_id` int(11),
  FOREIGN KEY (cab_id) REFERENCES cab_info(id),
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `distance_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locationA` varchar(200) DEFAULT NULL,
  `locationB` varchar(200) DEFAULT NULL,
  `distance` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
);

  INSERT INTO `cab_info` (`current_location`, `seats`) VALUES
  ('Location 1', 2),
  ('Location 2', 3),
  ('Location 3', 2),
  ('Location 4', 5),
  ('Location 5', 6),
  ('Location 6', 8);

INSERT INTO `distance_mapping` (`locationA`, `locationB`, `distance`) VALUES
('Location 1', 'Location 2', 30),
('Location 1', 'Location 3', 20),
('Location 1', 'Location 4', 10),
('Location 1', 'Location 5', 50),

('Location 2', 'Location 4', 30),
('Location 2', 'Location 3', 20),
('Location 2', 'Location 5', 110),
('Location 2', 'Location 1', 30),

('Location 3', 'Location 2', 20),
('Location 3', 'Location 1', 20),
('Location 3', 'Location 4', 110),
('Location 3', 'Location 5', 10),

('Location 4', 'Location 2', 30),
('Location 4', 'Location 1', 10),
('Location 4', 'Location 3', 110),
('Location 4', 'Location 5', 10),

('Location 5', 'Location 2', 110),
('Location 5', 'Location 1', 50),
('Location 5', 'Location 4', 10),
('Location 5', 'Location 3', 10);
