DROP TABLE IF EXISTS `donor_sponsor`;
DROP TABLE IF EXISTS `sponsorships`;
DROP TABLE IF EXISTS `sponsor`;
DROP TABLE IF EXISTS `charity`;
DROP TABLE IF EXISTS `donor`;

CREATE TABLE `donor` (`donor_id` int NOT NULL AUTO_INCREMENT, `username` varchar(255), `password` varchar(255), `first_name` varchar(255), `last_name` varchar(255), `short_description` varchar(255), PRIMARY KEY(`donor_id`));
CREATE TABLE `charity` (`charity_id` int NOT NULL AUTO_INCREMENT, `charity_name` varchar(255), `charity_website` varchar(255), `charity_description` varchar(255), PRIMARY KEY(`charity_id`));
CREATE TABLE `sponsor` (`sponsor_id` int NOT NULL AUTO_INCREMENT, `sponsor_name` varchar(255), PRIMARY KEY(`sponsor_id`));
CREATE TABLE `sponsorships` (`id` int NOT NULL AUTO_INCREMENT, `donation_amount` int, `sponsorship` int, `charity_id` int,  `sponsor_id` int, PRIMARY KEY(`id`), FOREIGN KEY(`charity_id`) REFERENCES `charity` (`charity_id`), FOREIGN KEY(`sponsor_id`) REFERENCES `sponsor` (`sponsor_id`));
CREATE TABLE `donor_sponsor` (`id` int NOT NULL AUTO_INCREMENT, `sponsorship_id` int,  `donor_id` int, PRIMARY KEY(`id`), FOREIGN KEY(`sponsorship_id`) REFERENCES `sponsorships` (`id`), FOREIGN KEY(`donor_id`) REFERENCES `donor` (`donor_id`));

INSERT INTO `sponsor` (`sponsor_name`) VALUES ('New Seasons');
INSERT INTO `sponsor` (`sponsor_name`) VALUES ('Nike');
