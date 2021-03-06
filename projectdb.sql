DROP TABLE IF EXISTS `donor_sponsor`;
DROP TABLE IF EXISTS `sponsorships`;
DROP TABLE IF EXISTS `sponsor`;
DROP TABLE IF EXISTS `charity`;
DROP TABLE IF EXISTS `donor`;

#CREATE TABLE `donor` (`donor_id` int NOT NULL AUTO_INCREMENT, `username` varchar(255), `password` varchar(255), `first_name` varchar(255), `last_name` varchar(255), `short_description` varchar(255), PRIMARY KEY(`donor_id`));
CREATE TABLE `donor` (`donor_id` int NOT NULL AUTO_INCREMENT, `username` varchar(255), `password` varchar(255), `first_name` varchar(255), `last_name` varchar(255), `short_description` varchar(255), `lifetime_steps` int, PRIMARY KEY(`donor_id`));
CREATE TABLE `charity` (`charity_id` int NOT NULL AUTO_INCREMENT, `charity_name` varchar(255), `charity_website` varchar(255), `charity_description` varchar(255), PRIMARY KEY(`charity_id`));
CREATE TABLE `sponsor` (`sponsor_id` int NOT NULL AUTO_INCREMENT, `sponsor_name` varchar(255), PRIMARY KEY(`sponsor_id`));
CREATE TABLE `sponsorships` (`charity_id` int NOT NULL, `donation_amount` int, `sponsorship` int, `cur_steps` int, `progress` decimal(4, 2) NOT NULL, `sponsor_id` int, PRIMARY KEY(`charity_id`), FOREIGN KEY(`charity_id`) REFERENCES `charity` (`charity_id`), FOREIGN KEY(`sponsor_id`) REFERENCES `sponsor` (`sponsor_id`));
CREATE TABLE `donor_sponsor` (`donor_id` int NOT NULL, `sponsorship_id` int, PRIMARY KEY(`donor_id`), FOREIGN KEY(`sponsorship_id`) REFERENCES `sponsorships` (`charity_id`), FOREIGN KEY(`donor_id`) REFERENCES `donor` (`donor_id`));

INSERT INTO `sponsor` (`sponsor_name`) VALUES ('New Seasons');
INSERT INTO `sponsor` (`sponsor_name`) VALUES ('Nike');
INSERT INTO `sponsor` (`sponsor_name`) VALUES ('Disney');

INSERT INTO `donor` (`username`, `password`, `first_name`, `lifetime_steps`) VALUES ('Daviduser', 'password', 'David', 1000);
INSERT INTO `donor` (`username`, `password`, `first_name`, `lifetime_steps`) VALUES ('Example User', 'password', 'Example User', 210);

INSERT INTO `charity` (`charity_name`, `charity_website`, `charity_description`) VALUES ('Red Cross', 'www.redcross.org', 'Blood Donation Program');
INSERT INTO `charity` (`charity_name`, `charity_website`, `charity_description`) VALUES ('Doctors without Borders', 'www.doctorswithoutborders.org', 'Providing medical aid where it is needed most');
INSERT INTO `charity` (`charity_name`, `charity_website`, `charity_description`) VALUES ('Amnesty International', 'www.amnesty.org', 'Protecting human rights across the globe');

INSERT INTO `sponsorships` (`donation_amount`, `sponsorship`, `charity_id`, `sponsor_id`, `cur_steps`, `progress`) VALUES (100, 10000, 1, 1, 4736, 47.36);
INSERT INTO `sponsorships` (`donation_amount`, `sponsorship`, `charity_id`, `sponsor_id`, `cur_steps`, `progress`) VALUES (250, 50000, 2, 2, 15000, 30);
INSERT INTO `sponsorships` (`donation_amount`, `sponsorship`, `charity_id`, `sponsor_id`, `cur_steps`, `progress`) VALUES (250, 60000, 3, 3, 34509, 57.515);

INSERT INTO `donor_sponsor` (`sponsorship_id`, `donor_id`) VALUES (1, 1);
