-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2024 at 05:04 PM
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
-- Stand-in structure for view `employer_job_count`
-- (See below for the actual view)
--
CREATE TABLE `employer_job_count` (
`employer_id` int(11)
,`total_jobs` bigint(21)
);

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
(34, 'Ajhay', 'Ramos', 'Arendayen', NULL, 'male', 9123456789, 'ajhayarendayen231@gmail.com', '$2y$10$DKT/jw0Wz/iJAmNwOOcy/eRVFwMTiPvZdGgqqUIkO5.DcNVMo7gTy', '135564', '2024-10-09 19:42:40', '2024-10-09 05:41:37', '2024-10-09 11:41:38'),
(49, 'Christian Dave', 'Patricio', 'Bernal', NULL, 'male', 9123456789, 'joxir19719@evasud.com', '$2y$10$o1dus2jDunO9PNIudPpC2.euygO94j/kBUmo2HgFUNcS8UIWIIX8y', '273990', '2024-10-26 14:16:36', '2024-10-26 00:15:55', '2024-10-26 06:15:55'),
(71, 'Washing Machine', NULL, 'Washing', NULL, 'male', 9123456789, 'ajhayarendayen2121@gmail.com', '$2y$10$/fMY0ttaCsG4BXuGqj5m2uCqv1qyOM4CZYcecWB8It4DHi9h52GVW', '345422', '2024-11-03 22:19:57', '2024-11-03 07:19:25', '2024-11-03 14:19:25'),
(72, 'Washing Machine', NULL, 'Washing', NULL, 'male', 9123456789, 'ajhayarendayen@gmail.com', '$2y$10$oC9LnNMbJoDgYPfFUqAHAeO7xJim.kY5pszy1IJ6QiU/04/hdsi9O', '249366', '2024-11-03 22:55:07', '2024-11-03 07:54:11', '2024-11-03 14:54:11');

-- --------------------------------------------------------

--
-- Table structure for table `js_company_contact`
--

CREATE TABLE `js_company_contact` (
  `company_contact_id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact_number` bigint(11) NOT NULL,
  `company_email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_company_contact`
--

INSERT INTO `js_company_contact` (`company_contact_id`, `employer_id`, `address`, `contact_number`, `company_email`, `created_at`) VALUES
(1, 39, 'asdasdsadada', 912343566, 'riot@gmail.com', '2024-11-12 15:56:35');

-- --------------------------------------------------------

--
-- Table structure for table `js_company_info`
--

CREATE TABLE `js_company_info` (
  `company_id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `about_us` text NOT NULL,
  `logo` text DEFAULT NULL,
  `banner` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_company_info`
--

INSERT INTO `js_company_info` (`company_id`, `employer_id`, `company_name`, `about_us`, `logo`, `banner`, `created_at`) VALUES
(27, 39, 'Gamanag Corporation Management ', '<p>WHAHAHA HAHAH HAHAHAHAHA HAHAHAHAH AHAHHAHA</p>', 'uploads/logo_6733795db57637.24799947.png', 'uploads/banner_6733795db5a1a3.12024372.png', '2024-11-12 15:50:53');

-- --------------------------------------------------------

--
-- Table structure for table `js_employer_info`
--

CREATE TABLE `js_employer_info` (
  `employer_id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `middlename` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `suffix` varchar(255) NOT NULL,
  `contact` bigint(11) NOT NULL,
  `position` varchar(255) NOT NULL,
  `document_path` text NOT NULL,
  `back_side_path` text NOT NULL,
  `face_path` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `verification_code` varchar(255) DEFAULT NULL,
  `email_verified_at` text NOT NULL,
  `decision` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_employer_info`
--

INSERT INTO `js_employer_info` (`employer_id`, `firstname`, `middlename`, `lastname`, `suffix`, `contact`, `position`, `document_path`, `back_side_path`, `face_path`, `email`, `password`, `verification_code`, `email_verified_at`, `decision`, `created_at`) VALUES
(39, 'Ajhay', 'Ramos', 'Arendayen', '', 9123456789, 'Backend Developer', 'uploads/document_6731d5517dafb.png', 'uploads/back_6731d5517db01.png', 'uploads/face_6731d5517daff.png', 'ajhayarendayen@gmail.com', '$2y$10$6fzEF9e/JkEJ6cSbXXrJIOHFV3Bzn3Ow1OZDji7uSs5jXSMq9NLVW', '118896', '2024-11-11 17:59:06', 'accept', '2024-11-11 09:58:56');

-- --------------------------------------------------------

--
-- Table structure for table `js_founding_info`
--

CREATE TABLE `js_founding_info` (
  `founding_id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `organization` varchar(255) NOT NULL,
  `industry` varchar(255) NOT NULL,
  `team_size` varchar(255) NOT NULL,
  `year_establishment` varchar(255) NOT NULL,
  `company_website` varchar(255) NOT NULL,
  `company_vision` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_founding_info`
--

INSERT INTO `js_founding_info` (`founding_id`, `employer_id`, `organization`, `industry`, `team_size`, `year_establishment`, `company_website`, `company_vision`, `created_at`) VALUES
(43, 39, 'Private', 'Technology', '11-50', '2019', 'https://www.facebook.com/', '&lt;p&gt;WAHAHAH HAHAHAHAH AHAHAHAHAHH AHAHAHH HAHAHAHA&lt;/p&gt;', '2024-11-12 15:51:10');

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
  `profile_picture` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_personal_info`
--

INSERT INTO `js_personal_info` (`id`, `applicant_id`, `birthday`, `birthplace`, `address`, `city`, `barangay`, `postal`, `status`, `attainment`, `valid_id`, `profile_picture`, `created_at`, `updated_at`) VALUES
(3, 34, '', '', '', '', '', '', '', '', '', '', '2024-10-09 13:41:37', '2024-10-09 11:41:38'),
(18, 49, '', '', '', '', '', '', '', '', '', '', '2024-10-26 08:15:55', '2024-10-26 06:15:55'),
(40, 71, '', '', '', '', '', '', '', '', '', '', '2024-11-03 15:19:25', '2024-11-03 14:19:25'),
(41, 72, '', '', '', '', '', '', '', '', '', '', '2024-11-03 15:54:11', '2024-11-03 14:54:11');

-- --------------------------------------------------------

--
-- Table structure for table `js_post_jobs`
--

CREATE TABLE `js_post_jobs` (
  `job_id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `jobTitle` varchar(255) NOT NULL,
  `jobTags` varchar(255) NOT NULL,
  `jobRole` varchar(255) NOT NULL,
  `minSalary` varchar(255) NOT NULL,
  `maxSalary` varchar(255) NOT NULL,
  `salaryType` varchar(255) NOT NULL,
  `education` varchar(255) NOT NULL,
  `experience` varchar(255) NOT NULL,
  `jobType` varchar(255) NOT NULL,
  `expirationDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `jobLevel` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `selectedBenefits` text NOT NULL,
  `jobDescription` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `js_social_media_company`
--

CREATE TABLE `js_social_media_company` (
  `social_media_id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `social_media` varchar(255) DEFAULT NULL,
  `media_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_social_media_company`
--

INSERT INTO `js_social_media_company` (`social_media_id`, `employer_id`, `social_media`, `media_link`, `created_at`) VALUES
(20, 39, 'Facebook', 'https://www.facebook.com/', '2024-11-12 15:55:11'),
(21, 39, 'Instagram', 'https://www.facebook.com/', '2024-11-12 15:55:11');

-- --------------------------------------------------------

--
-- Structure for view `employer_job_count`
--
DROP TABLE IF EXISTS `employer_job_count`;

-- CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `employer_job_count`  AS SELECT `js_post_jobs`.`employer_id` AS `employer_id`, count(0) AS `total_jobs` FROM `js_post_jobs` GROUP BY `js_post_jobs`.`employer_id``employer_id`  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `js_applicants`
--
ALTER TABLE `js_applicants`
  ADD PRIMARY KEY (`applicant_id`);

--
-- Indexes for table `js_company_contact`
--
ALTER TABLE `js_company_contact`
  ADD PRIMARY KEY (`company_contact_id`),
  ADD KEY `employer_id` (`employer_id`);

--
-- Indexes for table `js_company_info`
--
ALTER TABLE `js_company_info`
  ADD PRIMARY KEY (`company_id`),
  ADD KEY `fk_employer_company` (`employer_id`);

--
-- Indexes for table `js_employer_info`
--
ALTER TABLE `js_employer_info`
  ADD PRIMARY KEY (`employer_id`);

--
-- Indexes for table `js_founding_info`
--
ALTER TABLE `js_founding_info`
  ADD PRIMARY KEY (`founding_id`),
  ADD KEY `employer_id` (`employer_id`);

--
-- Indexes for table `js_personal_info`
--
ALTER TABLE `js_personal_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_applicant_personal_info` (`applicant_id`);

--
-- Indexes for table `js_post_jobs`
--
ALTER TABLE `js_post_jobs`
  ADD PRIMARY KEY (`job_id`),
  ADD KEY `employer_id` (`employer_id`);

--
-- Indexes for table `js_social_media_company`
--
ALTER TABLE `js_social_media_company`
  ADD PRIMARY KEY (`social_media_id`),
  ADD KEY `employer_id` (`employer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `js_applicants`
--
ALTER TABLE `js_applicants`
  MODIFY `applicant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `js_company_contact`
--
ALTER TABLE `js_company_contact`
  MODIFY `company_contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `js_company_info`
--
ALTER TABLE `js_company_info`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `js_employer_info`
--
ALTER TABLE `js_employer_info`
  MODIFY `employer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `js_founding_info`
--
ALTER TABLE `js_founding_info`
  MODIFY `founding_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `js_personal_info`
--
ALTER TABLE `js_personal_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `js_post_jobs`
--
ALTER TABLE `js_post_jobs`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `js_social_media_company`
--
ALTER TABLE `js_social_media_company`
  MODIFY `social_media_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `js_company_contact`
--
ALTER TABLE `js_company_contact`
  ADD CONSTRAINT `js_company_contact_ibfk_1` FOREIGN KEY (`employer_id`) REFERENCES `js_employer_info` (`employer_id`) ON DELETE CASCADE;

--
-- Constraints for table `js_company_info`
--
ALTER TABLE `js_company_info`
  ADD CONSTRAINT `fk_employer_company` FOREIGN KEY (`employer_id`) REFERENCES `js_employer_info` (`employer_id`) ON DELETE CASCADE;

--
-- Constraints for table `js_founding_info`
--
ALTER TABLE `js_founding_info`
  ADD CONSTRAINT `js_founding_info_ibfk_1` FOREIGN KEY (`employer_id`) REFERENCES `js_employer_info` (`employer_id`) ON DELETE CASCADE;

--
-- Constraints for table `js_personal_info`
--
ALTER TABLE `js_personal_info`
  ADD CONSTRAINT `fk_applicant_personal_info` FOREIGN KEY (`applicant_id`) REFERENCES `js_applicants` (`applicant_id`) ON DELETE CASCADE;

--
-- Constraints for table `js_social_media_company`
--
ALTER TABLE `js_social_media_company`
  ADD CONSTRAINT `js_social_media_company_ibfk_1` FOREIGN KEY (`employer_id`) REFERENCES `js_employer_info` (`employer_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
