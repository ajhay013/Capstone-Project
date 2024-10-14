-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2024 at 02:31 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_jobsync`
--

-- --------------------------------------------------------

--
-- Table structure for table `js_applicants`
--

CREATE TABLE `js_applicants` (
  `applicant_id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) NOT NULL,
  `suffix` varchar(25) DEFAULT NULL,
  `gender` varchar(25) NOT NULL,
  `contact` bigint(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(266) NOT NULL,
  `verification_code` varchar(255) NOT NULL,
  `email_verified_at` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_applicants`
--

INSERT INTO `js_applicants` (`applicant_id`, `firstname`, `middlename`, `lastname`, `suffix`, `gender`, `contact`, `email`, `password`, `verification_code`, `email_verified_at`, `created_at`, `updated_at`) VALUES
(34, 'Ajhay', 'Ramos', 'Arendayen', NULL, 'male', 9123456789, 'ajhayarendayen@gmail.com', '$2y$10$DKT/jw0Wz/iJAmNwOOcy/eRVFwMTiPvZdGgqqUIkO5.DcNVMo7gTy', '135564', '2024-10-09 19:42:40', '2024-10-09 05:41:37', '2024-10-09 11:41:38'),
(35, 'Washing Machine', 'Ramos', 'Washing', NULL, 'male', 9123456789, 'riot@gmail.com', '$2y$10$KHN2r36PqQzr7neZyLCjAuK2mpFmJnjtcnfnku760QBgBXPZG16Pm', '242860', '2024-10-09 21:02:52', '2024-10-09 07:02:37', '2024-10-09 13:02:37');

-- --------------------------------------------------------

--
-- Table structure for table `js_personal_info`
--

CREATE TABLE `js_personal_info` (
  `id` int(11) NOT NULL,
  `applicant_id` int(11) NOT NULL,
  `birthday` varchar(255) NOT NULL,
  `birthplace` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `barangay` varchar(255) NOT NULL,
  `postal` varchar(255) NOT NULL,
  `status` varchar(223) NOT NULL,
  `attainment` varchar(255) NOT NULL,
  `valid_id` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_personal_info`
--

INSERT INTO `js_personal_info` (`id`, `applicant_id`, `birthday`, `birthplace`, `address`, `city`, `barangay`, `postal`, `status`, `attainment`, `valid_id`, `created_at`, `updated_at`) VALUES
(3, 34, '', '', '', '', '', '', '', '', '', '2024-10-09 13:41:37', '2024-10-09 11:41:38'),
(4, 35, '', '', '', '', '', '', '', '', '', '2024-10-09 15:02:37', '2024-10-09 13:02:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `js_applicants`
--
ALTER TABLE `js_applicants`
  ADD PRIMARY KEY (`applicant_id`);

--
-- Indexes for table `js_personal_info`
--
ALTER TABLE `js_personal_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_applicant_personal_info` (`applicant_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `js_applicants`
--
ALTER TABLE `js_applicants`
  MODIFY `applicant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `js_personal_info`
--
ALTER TABLE `js_personal_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `js_personal_info`
--
ALTER TABLE `js_personal_info`
  ADD CONSTRAINT `fk_applicant_personal_info` FOREIGN KEY (`applicant_id`) REFERENCES `js_applicants` (`applicant_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
