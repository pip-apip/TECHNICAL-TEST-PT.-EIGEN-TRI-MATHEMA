-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2024 at 06:02 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perpus_express`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `code` varchar(5) NOT NULL,
  `title` varchar(25) NOT NULL,
  `author` varchar(25) NOT NULL,
  `stock` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`code`, `title`, `author`, `stock`) VALUES
('HOB-8', 'The Hobbit, or There and ', 'J.R.R. Tolkien', 0),
('JK-45', 'Harry Potter', 'J.K Rowling', 0),
('NRN-7', 'The Lion, the Witch and t', 'C.S. Lewis', 1),
('SHR-1', 'A Study in Scarlet', 'Arthur Conan Doyle', 1),
('TW-11', 'Twilight', 'Stephenie Meyer', 1);

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `code` varchar(4) NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`code`, `name`) VALUES
('M001', 'Angga'),
('M002', 'Ferry'),
('M003', 'Putri');

-- --------------------------------------------------------

--
-- Table structure for table `penalty_list`
--

CREATE TABLE `penalty_list` (
  `id_penalty` int(3) NOT NULL,
  `member_code` varchar(4) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id_transaction` int(3) NOT NULL,
  `member_code` varchar(4) NOT NULL,
  `book_code` varchar(5) NOT NULL,
  `borrowed_date` date NOT NULL,
  `return_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id_transaction`, `member_code`, `book_code`, `borrowed_date`, `return_date`) VALUES
(3, 'M001', 'HOB-8', '2024-12-10', '2024-12-12'),
(4, 'M002', 'JK-45', '2024-12-10', '2024-12-20'),
(6, 'M002', 'HOB-8', '2024-12-23', NULL),
(7, 'M001', 'JK-45', '2024-10-05', NULL),
(8, 'M001', 'SHR-1', '2024-10-05', '2024-10-10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `penalty_list`
--
ALTER TABLE `penalty_list`
  ADD PRIMARY KEY (`id_penalty`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id_transaction`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `penalty_list`
--
ALTER TABLE `penalty_list`
  MODIFY `id_penalty` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id_transaction` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
