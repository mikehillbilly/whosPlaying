-- phpMyAdmin SQL Dump
-- version 4.7.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 02, 2018 at 03:29 AM
-- Server version: 5.6.37
-- PHP Version: 7.0.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SANFLFixtures`
--

-- --------------------------------------------------------

--
-- Table structure for table `Accreditation`
--

CREATE TABLE `Accreditation` (
  `idAccreditation` int(11) NOT NULL,
  `level` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Accreditation`
--

INSERT INTO `Accreditation` (`idAccreditation`, `level`) VALUES
(4, 'Level 1'),
(5, 'Level 2'),
(6, 'Level 3'),
(7, 'Level 4'),
(8, 'Level 5'),
(9, 'Level 6');

-- --------------------------------------------------------

--
-- Table structure for table `AccreditedUmpire`
--

CREATE TABLE `AccreditedUmpire` (
  `idAccreditedUmpire` int(11) NOT NULL,
  `Accreditation_idAccreditation` int(11) NOT NULL,
  `Umpire_idUmpire` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `AccreditedUmpire`
--

INSERT INTO `AccreditedUmpire` (`idAccreditedUmpire`, `Accreditation_idAccreditation`, `Umpire_idUmpire`) VALUES
(86, 4, 145),
(87, 5, 145),
(88, 6, 145),
(89, 4, 146),
(90, 5, 146),
(91, 6, 146),
(92, 7, 146);

-- --------------------------------------------------------

--
-- Table structure for table `Club`
--

CREATE TABLE `Club` (
  `idClub` int(11) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Club`
--

INSERT INTO `Club` (`idClub`, `name`) VALUES
(1, 'Adelaide'),
(2, 'Central Districts'),
(3, 'Sturt'),
(4, 'Woodville West Torrens'),
(5, 'Glenelg'),
(6, 'North Adelaide'),
(7, 'Norwood'),
(8, 'Port Adelaide'),
(9, 'South Adelaide'),
(10, 'West Adelaide');

-- --------------------------------------------------------

--
-- Table structure for table `Fixture`
--

CREATE TABLE `Fixture` (
  `idFixture` int(11) NOT NULL,
  `FixtureTimeVenue_idFixtureTimeVenue` int(11) NOT NULL,
  `Grade_idGrade` int(11) NOT NULL,
  `HomeTeam_idTeam` int(11) NOT NULL,
  `AwayTeam_idTeam` int(11) NOT NULL,
  `Round_idRound` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Fixture`
--

INSERT INTO `Fixture` (`idFixture`, `FixtureTimeVenue_idFixtureTimeVenue`, `Grade_idGrade`, `HomeTeam_idTeam`, `AwayTeam_idTeam`, `Round_idRound`) VALUES
(1, 1, 1, 1, 6, 1),
(2, 2, 1, 2, 7, 1),
(3, 3, 1, 3, 8, 1),
(4, 4, 1, 4, 9, 1),
(5, 5, 1, 5, 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `FixtureTimeVenue`
--

CREATE TABLE `FixtureTimeVenue` (
  `idFixtureTimeVenue` int(11) NOT NULL,
  `Venue_idVenue` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `FixtureTimeVenue`
--

INSERT INTO `FixtureTimeVenue` (`idFixtureTimeVenue`, `Venue_idVenue`, `Date`, `Time`) VALUES
(1, 2, '2017-04-07', '19:10:00'),
(2, 6, '2077-04-07', '19:10:00'),
(3, 9, '2017-04-07', '19:20:00'),
(4, 1, '2017-04-08', '14:40:00'),
(5, 5, '2017-04-09', '14:10:00');

-- --------------------------------------------------------

--
-- Table structure for table `Grade`
--

CREATE TABLE `Grade` (
  `idGrade` int(11) NOT NULL,
  `description` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Grade`
--

INSERT INTO `Grade` (`idGrade`, `description`) VALUES
(1, 'League'),
(2, 'Reserves'),
(3, 'U18'),
(4, 'U16'),
(5, 'Women');

-- --------------------------------------------------------

--
-- Table structure for table `GradeTypeAccreditation`
--

CREATE TABLE `GradeTypeAccreditation` (
  `idGradeTypeAccreditation` int(11) NOT NULL,
  `Grade_idGrade` int(11) NOT NULL,
  `Type_idType` int(11) NOT NULL,
  `Accreditation_idAccreditation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Round`
--

CREATE TABLE `Round` (
  `idRound` int(11) NOT NULL,
  `Round` varchar(11) NOT NULL,
  `Year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Round`
--

INSERT INTO `Round` (`idRound`, `Round`, `Year`) VALUES
(1, 'Round 1', 2017),
(2, 'Round 2', 2017),
(3, 'Round 3', 2017),
(4, 'Round 4', 2017),
(5, 'Round 5 Spl', 2017),
(6, 'Round 6', 2017),
(7, 'Round 7 Ind', 2017),
(8, 'Round 8', 2017),
(9, 'Round 9', 2017),
(10, 'Round 10 Sp', 2017),
(11, 'Round 11', 2017),
(12, 'Round 12', 2017),
(13, 'Round 13', 2017),
(14, 'Round 14', 2017),
(15, 'Round 15 Sp', 2017),
(16, 'Round 16', 2017),
(17, 'Round 17', 2017),
(18, 'Round 18', 2017),
(19, 'Qualifying ', 2017),
(20, 'Preliminary', 2017),
(21, 'Grand Final', 2017);

-- --------------------------------------------------------

--
-- Table structure for table `Team`
--

CREATE TABLE `Team` (
  `idTeam` int(11) NOT NULL,
  `Grade_idGrade` int(11) NOT NULL,
  `Club_idClub` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Team`
--

INSERT INTO `Team` (`idTeam`, `Grade_idGrade`, `Club_idClub`) VALUES
(1, 1, 10),
(2, 1, 1),
(3, 1, 2),
(4, 1, 3),
(5, 1, 4),
(6, 1, 5),
(7, 1, 6),
(8, 1, 7),
(9, 1, 8),
(10, 1, 9),
(11, 2, 10),
(12, 2, 1),
(13, 2, 2),
(14, 2, 3),
(15, 2, 4),
(16, 2, 5),
(17, 2, 6),
(18, 2, 7),
(19, 2, 8),
(20, 2, 9),
(21, 3, 10),
(22, 3, 1),
(23, 3, 2),
(24, 3, 3),
(25, 3, 4),
(26, 3, 5),
(27, 3, 6),
(28, 3, 7),
(29, 3, 8),
(30, 3, 9),
(31, 3, 10),
(32, 4, 1),
(33, 4, 2),
(34, 4, 3),
(35, 4, 4),
(36, 4, 5),
(37, 4, 6),
(38, 4, 7),
(39, 4, 8),
(40, 4, 9),
(41, 4, 10),
(42, 5, 1),
(43, 5, 2),
(44, 5, 3),
(45, 5, 4),
(46, 5, 5),
(47, 5, 6),
(48, 5, 7),
(49, 5, 8),
(50, 5, 9),
(51, 5, 10);

-- --------------------------------------------------------

--
-- Table structure for table `Type`
--

CREATE TABLE `Type` (
  `idUmpireType` int(11) NOT NULL,
  `type` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Type`
--

INSERT INTO `Type` (`idUmpireType`, `type`) VALUES
(1, 'Field'),
(2, 'Boundary'),
(3, 'Goal');

-- --------------------------------------------------------

--
-- Table structure for table `Umpire`
--

CREATE TABLE `Umpire` (
  `idUmpire` int(11) NOT NULL,
  `familyName` varchar(80) NOT NULL,
  `givenName` varchar(80) NOT NULL,
  `mobile` text NOT NULL,
  `email` text NOT NULL,
  `idEmployee` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Umpire`
--

INSERT INTO `Umpire` (`idUmpire`, `familyName`, `givenName`, `mobile`, `email`, `idEmployee`) VALUES
(145, 'Marriott', 'MIke', '0987654321', 'mike@sanfl.com.au', NULL),
(146, 'afasd', 'dfasdf', '0987654321', 'fd@sanfl.com.au', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `UmpireFixture`
--

CREATE TABLE `UmpireFixture` (
  `idUmpireFixture` int(11) NOT NULL,
  `FixtureTimeVenue_idFixtureTImeVenue` int(11) NOT NULL,
  `Umpire_idUmpire` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `UmpireType`
--

CREATE TABLE `UmpireType` (
  `idUmpireType` int(11) NOT NULL,
  `idUmpire` int(11) NOT NULL,
  `idType` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Venue`
--

CREATE TABLE `Venue` (
  `idVenue` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `address` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Venue`
--

INSERT INTO `Venue` (`idVenue`, `name`, `address`) VALUES
(1, 'Ponderosa', 'Elizabeth'),
(2, 'Gliderol Stadium', 'Glenelg'),
(3, 'Prospect Oval', 'Prospect'),
(4, 'Alberton Oval', 'Alberton'),
(5, 'Unley Oval', 'Unley'),
(6, 'Richmond Oval', 'Richmond'),
(7, 'Adelaide Oval', 'North Adelaide'),
(8, 'Thebarton Oval', 'Thebarton'),
(9, 'The Parade', 'Norwood'),
(10, 'Football Park', 'West Lakes'),
(11, 'Noarlunga', 'Noarlunga');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Accreditation`
--
ALTER TABLE `Accreditation`
  ADD PRIMARY KEY (`idAccreditation`);

--
-- Indexes for table `AccreditedUmpire`
--
ALTER TABLE `AccreditedUmpire`
  ADD PRIMARY KEY (`idAccreditedUmpire`),
  ADD KEY `Accreditation_idAccreditation` (`Accreditation_idAccreditation`),
  ADD KEY `Umpire_idUmpire` (`Umpire_idUmpire`);

--
-- Indexes for table `Club`
--
ALTER TABLE `Club`
  ADD PRIMARY KEY (`idClub`);

--
-- Indexes for table `Fixture`
--
ALTER TABLE `Fixture`
  ADD PRIMARY KEY (`idFixture`),
  ADD KEY `AwayTeam_idTeam` (`AwayTeam_idTeam`),
  ADD KEY `HomeTeam_idTeam` (`HomeTeam_idTeam`),
  ADD KEY `GameTimeVenue_idGameTimeVenue` (`FixtureTimeVenue_idFixtureTimeVenue`),
  ADD KEY `Grade_idGrade` (`Grade_idGrade`),
  ADD KEY `Round_idRound` (`Round_idRound`);

--
-- Indexes for table `FixtureTimeVenue`
--
ALTER TABLE `FixtureTimeVenue`
  ADD PRIMARY KEY (`idFixtureTimeVenue`),
  ADD KEY `Venue_idVenue` (`Venue_idVenue`);

--
-- Indexes for table `Grade`
--
ALTER TABLE `Grade`
  ADD PRIMARY KEY (`idGrade`);

--
-- Indexes for table `GradeTypeAccreditation`
--
ALTER TABLE `GradeTypeAccreditation`
  ADD PRIMARY KEY (`idGradeTypeAccreditation`),
  ADD KEY `Type_idType` (`Type_idType`),
  ADD KEY `GradeTypeAccreditation_ibfk_1` (`Accreditation_idAccreditation`),
  ADD KEY `GradeTypeAccreditation_ibfk_2` (`Grade_idGrade`);

--
-- Indexes for table `Round`
--
ALTER TABLE `Round`
  ADD PRIMARY KEY (`idRound`);

--
-- Indexes for table `Team`
--
ALTER TABLE `Team`
  ADD PRIMARY KEY (`idTeam`),
  ADD KEY `Grade_idGrade` (`Grade_idGrade`),
  ADD KEY `Club_idClub` (`Club_idClub`);

--
-- Indexes for table `Type`
--
ALTER TABLE `Type`
  ADD PRIMARY KEY (`idUmpireType`);

--
-- Indexes for table `Umpire`
--
ALTER TABLE `Umpire`
  ADD PRIMARY KEY (`idUmpire`);

--
-- Indexes for table `UmpireFixture`
--
ALTER TABLE `UmpireFixture`
  ADD PRIMARY KEY (`idUmpireFixture`),
  ADD KEY `FixtureTimeVenue_idFixtureTImeVenue` (`FixtureTimeVenue_idFixtureTImeVenue`),
  ADD KEY `Umpire_idUmpire` (`Umpire_idUmpire`);

--
-- Indexes for table `UmpireType`
--
ALTER TABLE `UmpireType`
  ADD PRIMARY KEY (`idUmpireType`),
  ADD KEY `idType` (`idType`),
  ADD KEY `idUmpire` (`idUmpire`);

--
-- Indexes for table `Venue`
--
ALTER TABLE `Venue`
  ADD PRIMARY KEY (`idVenue`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Accreditation`
--
ALTER TABLE `Accreditation`
  MODIFY `idAccreditation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `AccreditedUmpire`
--
ALTER TABLE `AccreditedUmpire`
  MODIFY `idAccreditedUmpire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `Club`
--
ALTER TABLE `Club`
  MODIFY `idClub` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Fixture`
--
ALTER TABLE `Fixture`
  MODIFY `idFixture` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `FixtureTimeVenue`
--
ALTER TABLE `FixtureTimeVenue`
  MODIFY `idFixtureTimeVenue` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Grade`
--
ALTER TABLE `Grade`
  MODIFY `idGrade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `GradeTypeAccreditation`
--
ALTER TABLE `GradeTypeAccreditation`
  MODIFY `idGradeTypeAccreditation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `Round`
--
ALTER TABLE `Round`
  MODIFY `idRound` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `Team`
--
ALTER TABLE `Team`
  MODIFY `idTeam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `Type`
--
ALTER TABLE `Type`
  MODIFY `idUmpireType` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Umpire`
--
ALTER TABLE `Umpire`
  MODIFY `idUmpire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT for table `UmpireFixture`
--
ALTER TABLE `UmpireFixture`
  MODIFY `idUmpireFixture` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `UmpireType`
--
ALTER TABLE `UmpireType`
  MODIFY `idUmpireType` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `Venue`
--
ALTER TABLE `Venue`
  MODIFY `idVenue` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `AccreditedUmpire`
--
ALTER TABLE `AccreditedUmpire`
  ADD CONSTRAINT `AccreditedUmpire_ibfk_1` FOREIGN KEY (`Accreditation_idAccreditation`) REFERENCES `Accreditation` (`idAccreditation`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `AccreditedUmpire_ibfk_2` FOREIGN KEY (`Umpire_idUmpire`) REFERENCES `Umpire` (`idUmpire`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Fixture`
--
ALTER TABLE `Fixture`
  ADD CONSTRAINT `Fixture_ibfk_1` FOREIGN KEY (`AwayTeam_idTeam`) REFERENCES `Team` (`idTeam`),
  ADD CONSTRAINT `Fixture_ibfk_2` FOREIGN KEY (`HomeTeam_idTeam`) REFERENCES `Team` (`idTeam`),
  ADD CONSTRAINT `Fixture_ibfk_3` FOREIGN KEY (`FixtureTimeVenue_idFixtureTimeVenue`) REFERENCES `FixtureTimeVenue` (`idFixtureTimeVenue`),
  ADD CONSTRAINT `Fixture_ibfk_4` FOREIGN KEY (`Grade_idGrade`) REFERENCES `Grade` (`idGrade`),
  ADD CONSTRAINT `Fixture_ibfk_5` FOREIGN KEY (`Round_idRound`) REFERENCES `Round` (`idRound`);

--
-- Constraints for table `FixtureTimeVenue`
--
ALTER TABLE `FixtureTimeVenue`
  ADD CONSTRAINT `FixtureTimeVenue_ibfk_1` FOREIGN KEY (`Venue_idVenue`) REFERENCES `Venue` (`idVenue`);

--
-- Constraints for table `GradeTypeAccreditation`
--
ALTER TABLE `GradeTypeAccreditation`
  ADD CONSTRAINT `GradeTypeAccreditation_ibfk_1` FOREIGN KEY (`Accreditation_idAccreditation`) REFERENCES `Accreditation` (`idAccreditation`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `GradeTypeAccreditation_ibfk_2` FOREIGN KEY (`Grade_idGrade`) REFERENCES `Grade` (`idGrade`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `GradeTypeAccreditation_ibfk_3` FOREIGN KEY (`Type_idType`) REFERENCES `Type` (`idUmpireType`);

--
-- Constraints for table `Team`
--
ALTER TABLE `Team`
  ADD CONSTRAINT `idClub Constraint` FOREIGN KEY (`Club_idClub`) REFERENCES `Club` (`idClub`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idGrade Constraint` FOREIGN KEY (`Grade_idGrade`) REFERENCES `Grade` (`idGrade`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `UmpireFixture`
--
ALTER TABLE `UmpireFixture`
  ADD CONSTRAINT `UmpireFixture_ibfk_2` FOREIGN KEY (`FixtureTimeVenue_idFixtureTImeVenue`) REFERENCES `FixtureTimeVenue` (`idFixtureTimeVenue`),
  ADD CONSTRAINT `UmpireFixture_ibfk_3` FOREIGN KEY (`Umpire_idUmpire`) REFERENCES `Umpire` (`idUmpire`);

--
-- Constraints for table `UmpireType`
--
ALTER TABLE `UmpireType`
  ADD CONSTRAINT `UmpireType_ibfk_1` FOREIGN KEY (`idType`) REFERENCES `Type` (`idUmpireType`),
  ADD CONSTRAINT `UmpireType_ibfk_2` FOREIGN KEY (`idUmpire`) REFERENCES `Umpire` (`idUmpire`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
