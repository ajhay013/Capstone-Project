-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2024 at 06:01 PM
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
-- Stand-in structure for view `active_job_postings`
-- (See below for the actual view)
--
CREATE TABLE `active_job_postings` (
`job_id` int(11)
,`employer_id` int(11)
,`jobTitle` varchar(255)
,`jobTags` varchar(255)
,`jobRole` varchar(255)
,`minSalary` varchar(255)
,`maxSalary` varchar(255)
,`salaryType` varchar(255)
,`education` varchar(255)
,`experience` varchar(255)
,`jobType` varchar(255)
,`expirationDate` timestamp
,`jobLevel` varchar(255)
,`address` varchar(255)
,`city` varchar(255)
,`selectedBenefits` text
,`jobDescription` text
,`status` varchar(255)
,`job_created_at` timestamp
,`job_updated_at` timestamp
,`company_name` varchar(255)
,`about_us` text
,`logo` text
,`banner` text
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `applicants_favorite_jobs`
-- (See below for the actual view)
--
CREATE TABLE `applicants_favorite_jobs` (
`favorite_job_id` int(11)
,`applicant_id` int(11)
,`added_at` timestamp
,`job_id` int(11)
,`employer_id` int(11)
,`jobTitle` varchar(255)
,`jobTags` varchar(255)
,`jobRole` varchar(255)
,`minSalary` varchar(255)
,`maxSalary` varchar(255)
,`salaryType` varchar(255)
,`education` varchar(255)
,`experience` varchar(255)
,`jobType` varchar(255)
,`expirationDate` timestamp
,`jobLevel` varchar(255)
,`address` varchar(255)
,`city` varchar(255)
,`selectedBenefits` text
,`jobDescription` text
,`status` varchar(255)
,`created_at` timestamp
,`updated_at` timestamp
,`logo` text
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `applicant_details`
-- (See below for the actual view)
--
CREATE TABLE `applicant_details` (
`applicant_id` int(11)
,`firstname` varchar(255)
,`middlename` varchar(255)
,`lastname` varchar(255)
,`suffix` varchar(25)
,`gender` varchar(25)
,`contact` bigint(11)
,`profile_picture` varchar(255)
,`email` varchar(255)
,`password` varchar(266)
,`verification_code` varchar(255)
,`email_verified_at` text
,`headline` varchar(255)
,`birthday` varchar(255)
,`birthplace` varchar(255)
,`address` varchar(255)
,`city` varchar(255)
,`barangay` varchar(255)
,`postal` varchar(255)
,`status` varchar(223)
,`experience` varchar(255)
,`attainment` varchar(255)
,`biography` text
,`personal_info_created_at` datetime
,`personal_info_updated_at` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `applied_jobs`
-- (See below for the actual view)
--
CREATE TABLE `applied_jobs` (
`applicant_id` int(11)
,`job_id` int(11)
,`employer_id` int(11)
,`jobTitle` varchar(255)
,`jobTags` varchar(255)
,`jobRole` varchar(255)
,`minSalary` varchar(255)
,`maxSalary` varchar(255)
,`salaryType` varchar(255)
,`education` varchar(255)
,`experience` varchar(255)
,`jobType` varchar(255)
,`expirationDate` timestamp
,`jobLevel` varchar(255)
,`address` varchar(255)
,`city` varchar(255)
,`selectedBenefits` text
,`jobDescription` text
,`status` varchar(255)
,`created_at` timestamp
,`updated_at` timestamp
,`logo` text
,`applied_at` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `complete_company_profile`
-- (See below for the actual view)
--
CREATE TABLE `complete_company_profile` (
`company_id` int(11)
,`company_name` varchar(255)
,`about_us` text
,`logo` text
,`banner` text
,`company_created_at` timestamp
,`organization` varchar(255)
,`industry` varchar(255)
,`team_size` varchar(255)
,`year_establishment` varchar(255)
,`company_website` varchar(255)
,`company_vision` text
,`founding_info_created_at` timestamp
,`address` varchar(255)
,`contact_number` bigint(11)
,`company_email` varchar(255)
,`city` varchar(255)
,`contact_created_at` timestamp
,`facebook_icon` varchar(255)
,`instagram_icon` varchar(255)
,`youtube_icon` varchar(255)
,`twitter_icon` varchar(255)
,`pinterest_icon` varchar(255)
,`reddit_icon` varchar(255)
,`whatsapp_business_icon` varchar(255)
,`telegram_icon` varchar(255)
,`wechat_icon` varchar(255)
,`social_media_created_at` timestamp
,`job_post_count` bigint(21)
);

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
  `lastname` varchar(255) DEFAULT NULL,
  `suffix` varchar(25) DEFAULT NULL,
  `gender` varchar(25) NOT NULL,
  `contact` bigint(11) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
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

INSERT INTO `js_applicants` (`applicant_id`, `firstname`, `middlename`, `lastname`, `suffix`, `gender`, `contact`, `profile_picture`, `email`, `password`, `verification_code`, `email_verified_at`, `created_at`, `updated_at`) VALUES
(77, 'Ajhay', 'Ramos', 'Arendayen', 'Jr', 'male', 9123456789, 'uploads/profile_6752e19be781d.png', 'ajhayarendayen@gmail.com', '$2y$10$xpWWwy1Fvpf4gPbJceO.W.DYuugXRhpwWwRyrHgNknjPXU.JwqBMi', '350327', '2024-11-24 23:44:38', '2024-11-24 08:44:12', '2024-11-24 15:44:12'),
(93, 'Ricky James', '', 'Molina', '', 'male', 9123456789, 'uploads/profile_675582b9e0710.png', 'tanjirowkamado@gmail.com', '', '', '', '2024-12-08 11:22:55', '2024-12-08 11:22:55');

-- --------------------------------------------------------

--
-- Table structure for table `js_applicant_application`
--

CREATE TABLE `js_applicant_application` (
  `apply_id` int(11) NOT NULL,
  `application_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `applied_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_applicant_application`
--

INSERT INTO `js_applicant_application` (`apply_id`, `application_id`, `question_id`, `answer`, `applied_at`) VALUES
(7, 4, 2, 'Yes', '2024-12-10 04:06:15'),
(8, 4, 3, 'Yes', '2024-12-10 04:06:15'),
(9, 4, 4, 'No', '2024-12-10 04:06:15'),
(10, 4, 5, 'No', '2024-12-10 04:06:15'),
(11, 4, 6, 'Yes', '2024-12-10 04:06:15'),
(23, 8, 12, '2', '2024-12-10 04:35:08'),
(24, 8, 13, 'Yes', '2024-12-10 04:35:08'),
(25, 8, 14, 'Yes', '2024-12-10 04:35:08'),
(26, 19, 7, 'Yes', '2024-12-10 16:36:27'),
(27, 19, 8, 'Yes', '2024-12-10 16:36:27'),
(28, 19, 9, 'Yes', '2024-12-10 16:36:27'),
(29, 19, 10, 'No', '2024-12-10 16:36:27'),
(30, 19, 11, 'No', '2024-12-10 16:36:27');

-- --------------------------------------------------------

--
-- Table structure for table `js_applicant_application_resume`
--

CREATE TABLE `js_applicant_application_resume` (
  `application_id` int(11) NOT NULL,
  `applicant_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `resumeName` varchar(255) NOT NULL,
  `resumePath` varchar(255) NOT NULL,
  `coverLetter` varchar(255) DEFAULT NULL,
  `applied_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_applicant_application_resume`
--

INSERT INTO `js_applicant_application_resume` (`application_id`, `applicant_id`, `job_id`, `resumeName`, `resumePath`, `coverLetter`, `applied_at`) VALUES
(4, 77, 151, 'Resume Arendayen', 'uploads/resume/01 CANADA Checklist_v1_6752d5a3b28b5.pdf', '', '2024-12-10 04:06:15'),
(8, 77, 153, 'Professional Resume', 'uploads/resume/01 CANADA Checklist_v1_6752d610aa657.pdf', '', '2024-12-10 04:35:08'),
(19, 77, 152, 'Professional Resume', 'uploads/resume/01 CANADA Checklist_v1_6752d610aa657.pdf', '', '2024-12-10 16:36:27');

-- --------------------------------------------------------

--
-- Table structure for table `js_applicant_resume`
--

CREATE TABLE `js_applicant_resume` (
  `resume_id` int(11) NOT NULL,
  `applicant_id` int(11) NOT NULL,
  `resumeName` varchar(255) NOT NULL,
  `resumePath` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_applicant_resume`
--

INSERT INTO `js_applicant_resume` (`resume_id`, `applicant_id`, `resumeName`, `resumePath`, `created_at`) VALUES
(8, 77, 'Resume Arendayen', 'uploads/resume/01 CANADA Checklist_v1_6752d5a3b28b5.pdf', '2024-12-06 10:44:51'),
(9, 77, 'Professional Resume', 'uploads/resume/01 CANADA Checklist_v1_6752d610aa657.pdf', '2024-12-06 10:46:40'),
(10, 77, 'Sample Resume', 'uploads/resume/1.1_6752d68a328df.pdf', '2024-12-06 10:48:42'),
(11, 77, 'Pang apat na sample', 'uploads/resume/01 CANADA Checklist_v1_6752d6a159b63.pdf', '2024-12-06 10:49:05'),
(13, 77, 'PANG LIMANGG RESUME', 'uploads/resume/01 CANADA Checklist_v1_6752db204785f.pdf', '2024-12-06 11:08:16'),
(14, 93, 'asdsadsad', 'uploads/resume/01 CANADA Checklist_v1_675581be729d7.pdf', '2024-12-08 11:23:42');

-- --------------------------------------------------------

--
-- Table structure for table `js_applicant_socialmedia`
--

CREATE TABLE `js_applicant_socialmedia` (
  `socialmedia_id` int(11) NOT NULL,
  `applicant_id` int(11) NOT NULL,
  `facebook_icon` varchar(255) DEFAULT NULL,
  `instagram_icon` varchar(255) DEFAULT NULL,
  `youtube_icon` varchar(255) DEFAULT NULL,
  `twitter_icon` varchar(255) DEFAULT NULL,
  `tiktok_icon` varchar(255) DEFAULT NULL,
  `dribble_icon` varchar(255) DEFAULT NULL,
  `github_icon` varchar(255) DEFAULT NULL,
  `reddit_icon` varchar(255) DEFAULT NULL,
  `freelancer_icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_applicant_socialmedia`
--

INSERT INTO `js_applicant_socialmedia` (`socialmedia_id`, `applicant_id`, `facebook_icon`, `instagram_icon`, `youtube_icon`, `twitter_icon`, `tiktok_icon`, `dribble_icon`, `github_icon`, `reddit_icon`, `freelancer_icon`, `created_at`, `updated_at`) VALUES
(17, 77, 'https://www.facebook.com/', 'https://www.facebook.com/', NULL, NULL, NULL, NULL, 'https://github.com/ajhay013', NULL, NULL, '2024-12-02 06:58:43', '2024-12-06 15:51:18'),
(19, 93, 'https://www.facebook.com/', 'https://www.facebook.com/', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-12-08 11:28:20', '2024-12-08 11:28:20');

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `city` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_company_contact`
--

INSERT INTO `js_company_contact` (`company_contact_id`, `employer_id`, `address`, `contact_number`, `company_email`, `created_at`, `city`) VALUES
(1, 41, 'Ph9, Pkg6, Blk10, Lot4', 9123456789, 'riot@gmail.com', '2024-11-23 07:56:50', 'Caloocan City'),
(2, 42, 'Ph9, Pkg6, Blk10, Lot4', 9123456789, 'riot123@gmail.com', '2024-11-23 08:43:38', 'Caloocan City');

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
(31, 41, 'Riot Games', '<h2><strong>Who we are</strong></h2><p>Riot Games was founded in 2006 to develop, publish, and support the most player-focused games in the world. As we went from one game to many, we have expanded to over 4,500 Rioters across more than 20 offices around the world bringing a global perspective to the games we create and the characters in them. From the streets of Piltover to the Radianite labs of Alpha Earth, we are all about making games and serving the people who love them.</p>', 'uploads/logo_67407c2cee8f02.46827300.png', 'uploads/banner_67407c2cf0d2f4.11257937.jpg', '2024-11-22 12:40:16'),
(32, 42, 'Job Company', '<p>Hydrant’s&nbsp;<a href=\"https://www.drinkhydrant.com/pages/about\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--kmt-comp-a-color-base);\">About Us page</a>&nbsp;opens with an inviting image of two people toasting while holding the product in their hands. After reading the copy, one might guess that those hands belong to John and Jai, the company’s two founders.</p><p>The page is broken into three sections, making it easy to digest in chunks. This format is a perfect way to set up your page because it guides the reader slowly down in a way that isn’t overwhelming.</p><p>Each section is designed to hook the reader and bait them into reading a little more. Finally, the page ends with John and Jai’s signature, giving it a personal touch from the founders, who you feel like you can now call friends.</p>', 'uploads/logo_674195394e2de5.63422336.png', 'uploads/banner_674195394e5a48.97187302.png', '2024-11-23 08:41:29');

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
(41, 'Ajhay', '', 'Arendayen', '', 9123456789, 'HR', 'uploads/document_67407b9fdab6a.png', 'uploads/back_67407b9fdab70.png', 'uploads/face_67407b9fdab6f.png', 'ajhayarendayen@gmail.com', '$2y$10$BhYHIWCoMsqmIADapYmUweQ.g5dnnkOPeZCKZlwQVouRxBJdfxg1W', '348168', '2024-11-22 20:40:47', 'accept', '2024-11-22 12:40:16'),
(42, 'Christian Dave', '', 'Bernal', '', 9123456789, 'HR', 'uploads/document_67407b9fdab6a.png', 'uploads/back_67407b9fdab70.png', 'uploads/face_67407b9fdab6f.png', 'bernal@gmail.com', '$2y$10$BhYHIWCoMsqmIADapYmUweQ.g5dnnkOPeZCKZlwQVouRxBJdfxg1W', '348168', '2024-11-22 20:40:47', 'accept', '2024-11-22 12:40:16');

-- --------------------------------------------------------

--
-- Table structure for table `js_favorite_jobs`
--

CREATE TABLE `js_favorite_jobs` (
  `favorite_job_id` int(11) NOT NULL,
  `applicant_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_favorite_jobs`
--

INSERT INTO `js_favorite_jobs` (`favorite_job_id`, `applicant_id`, `job_id`, `added_at`) VALUES
(98, 77, 153, '2024-12-10 04:37:54');

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
(47, 41, 'Public', 'Computer Games', '501-1000 Employees', '2006', 'http://www.riotgames.com', '&lt;p&gt;Foster a thriving ecosystem Our games should be fair, safe, and welcoming for anyone who wants to love them. &lt;/p&gt;&lt;p&gt;We push ourselves to design products and create environments that make it possible.&lt;/p&gt;', '2024-11-22 12:40:16'),
(48, 42, 'Private', 'Computer Games', '51-200 Employees', '2010', 'https://www.facebook.com/', '&lt;p&gt;The Zebra, Lemonade, and Clearcover are three companies in the insurance industry that are paving the way with amazing About Us pages.&lt;/p&gt;', '2024-11-23 08:42:19');

-- --------------------------------------------------------

--
-- Table structure for table `js_personal_info`
--

CREATE TABLE `js_personal_info` (
  `id` int(11) NOT NULL,
  `applicant_id` int(11) NOT NULL,
  `headline` varchar(255) NOT NULL,
  `birthday` varchar(255) NOT NULL,
  `birthplace` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `barangay` varchar(255) NOT NULL,
  `postal` varchar(255) NOT NULL,
  `status` varchar(223) NOT NULL,
  `experience` varchar(255) NOT NULL,
  `attainment` varchar(255) NOT NULL,
  `biography` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_personal_info`
--

INSERT INTO `js_personal_info` (`id`, `applicant_id`, `headline`, `birthday`, `birthplace`, `address`, `city`, `barangay`, `postal`, `status`, `experience`, `attainment`, `biography`, `created_at`, `updated_at`) VALUES
(46, 77, 'Backend Developer', '2003-01-13', 'Bagong Silang', 'Ph9, Pkg6, Blk10, Lot4', 'Caloocan City', 'Barangay 176', '1428', 'single', 'Mid level', 'Bachelors Degree', '<p>asdasdsadassdsadsadaasd</p>', '2024-11-24 16:44:12', '2024-11-24 15:44:12'),
(60, 93, 'Mobile App Developer', '2002-12-30', 'Manila City', 'Ph9, Pkg6, Blk10, Lot4', 'Caloocan City', 'Barangay 167', '1429', 'single', 'Entry level', 'Bachelors Degree', '<p>asdasdassdasd</p>', '2024-12-08 19:22:55', '2024-12-08 11:22:55');

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

--
-- Dumping data for table `js_post_jobs`
--

INSERT INTO `js_post_jobs` (`job_id`, `employer_id`, `jobTitle`, `jobTags`, `jobRole`, `minSalary`, `maxSalary`, `salaryType`, `education`, `experience`, `jobType`, `expirationDate`, `jobLevel`, `address`, `city`, `selectedBenefits`, `jobDescription`, `status`, `created_at`, `updated_at`) VALUES
(151, 42, 'Programmer', 'Programmer, Developer', 'Backend', '25,000', '45,000', 'Monthly', 'Bachelors Degree', '3 years - 4 years', 'Part-time', '2024-12-16 08:00:00', 'Mid Level', 'Ph9, Pkg6, Blk10, Lot4', 'Caloocan City', 'Work from Home,Bonuses,401(k),Paid Time Off,Health Insurance,Stock Options,Retirement Plans', '<p>A computer programmers job is to&nbsp;write, test, and modify code to create and maintain computer software and applications:&nbsp;</p><ul><li><strong>Writing code</strong></li><li>Programmers write code in a variety of languages, such as C++ and Java, to turn designs into instructions that computers can follow.&nbsp;</li><li><strong>Testing</strong></li><li>Programmers test new software and applications to ensure they produce the expected results.&nbsp;They also write unit tests to confirm that small portions of code function as intended.&nbsp;</li><li><strong>Updating programs</strong></li><li>Programmers update existing programs to fix bugs or improve functionality.&nbsp;</li><li><strong>Debugging</strong></li><li>Programmers identify and correct coding errors that cause programs to malfunction.&nbsp;</li><li><strong>Security</strong></li><li>Programmers develop security systems and procedures to protect users from hacks and programs from viruses.&nbsp;</li><li><strong>Documentation</strong></li><li>Programmers prepare reports, manuals, and other documentation on the status, operation, and maintenance of software.&nbsp;</li><li><strong>Training</strong></li><li>Programmers train new users to use updated programs or hardware.&nbsp;</li><li><strong>Collaboration</strong></li><li>Programmers work closely with software developers and may take on some of their tasks, such as designing programs.&nbsp;</li></ul><p>Programmers should have excellent critical thinking and problem-solving skills, as well as strong organizational skills and attention to detail.&nbsp;They should also be able to work under short deadlines and meet production schedules.&nbsp;Most programmers have a bachelors degree in computer science or a related subject.</p>', 'Active', '2024-12-09 10:22:48', NULL),
(152, 41, 'Programmer', 'Programmer, Developer', 'Backend', '25,000', '45,000', 'Monthly', 'Bachelors Degree', '3 years - 4 years', 'Part-time', '2024-12-24 16:00:00', 'Manager Level', 'Ph9, Pkg6, Blk10, Lot4 Bagong Silang Caloocan City', 'Caloocan City', 'Stock Options,Health Insurance,Paid Time Off,Retirement Plans,Child Care,401(k),Bonuses,Work from Home', '<p>A computer programmers job is to&nbsp;write, test, and modify code to create and maintain computer software and applications:&nbsp;</p><ul><li><strong>Writing code</strong></li><li>Programmers write code in a variety of languages, such as C++ and Java, to turn designs into instructions that computers can follow.&nbsp;</li><li><strong>Testing</strong></li><li>Programmers test new software and applications to ensure they produce the expected results.&nbsp;They also write unit tests to confirm that small portions of code function as intended.&nbsp;</li><li><strong>Updating programs</strong></li><li>Programmers update existing programs to fix bugs or improve functionality.&nbsp;</li><li><strong>Debugging</strong></li><li>Programmers identify and correct coding errors that cause programs to malfunction.&nbsp;</li><li><strong>Security</strong></li><li>Programmers develop security systems and procedures to protect users from hacks and programs from viruses.&nbsp;</li><li><strong>Documentation</strong></li><li>Programmers prepare reports, manuals, and other documentation on the status, operation, and maintenance of software.&nbsp;</li><li><strong>Training</strong></li><li>Programmers train new users to use updated programs or hardware.&nbsp;</li><li><strong>Collaboration</strong></li><li>Programmers work closely with software developers and may take on some of their tasks, such as designing programs.&nbsp;</li></ul><p>Programmers should have excellent critical thinking and problem-solving skills, as well as strong organizational skills and attention to detail.&nbsp;They should also be able to work under short deadlines and meet production schedules.&nbsp;Most programmers have a bachelors degree in computer science or a related subject.</p>', 'Active', '2024-12-09 05:30:12', NULL),
(153, 41, 'Backend Developer', 'Programmer, Developer', 'Backend', '25,000', '45,000', 'Monthly', 'Bachelors Degree', '3 years - 4 years', 'Part-time', '2024-12-22 08:00:00', 'Mid Level', 'Ph9, Pkg6, Blk10, Lot4 Bagong Silang Caloocan City', 'Caloocan City', 'Health Insurance,Stock Options,Retirement Plans,Paid Time Off,401(k),Bonuses,Work from Home,Dental Insurance,Life Insurance', '<p>A backend developer is&nbsp;responsible for the server-side components of web applications.&nbsp;Their responsibilities include:&nbsp;</p><ul><li><strong>Developing APIs</strong>:&nbsp;Creating server-side APIs&nbsp;</li><li><strong>Database operations</strong>:&nbsp;Handling database operations, including optimizing queries, ensuring data consistency, and managing large datasets&nbsp;</li><li><strong>Traffic management</strong>:&nbsp;Ensuring the backend can efficiently manage high traffic volumes&nbsp;</li></ul><p>Some skills and responsibilities of a backend developer include:</p><ul><li><strong>Programming languages</strong>:&nbsp;Being proficient in at least one server-side programming language, such as Python, Java, Ruby, or Node.js&nbsp;</li><li><strong>Version control systems</strong>:&nbsp;Using version control systems to track changes, revert to earlier versions, and safeguard source code&nbsp;</li><li><strong>Problem solving</strong>:&nbsp;Being able to come up with creative solutions to issues that arise&nbsp;</li><li><strong>Communication</strong>:&nbsp;Being able to effectively communicate in a team environment&nbsp;</li><li><strong>Database management systems (DBMS)</strong>:&nbsp;Using DBMS to ensure data integrity, security, and performance&nbsp;</li><li><strong>Adaptability to emerging technologies</strong>:&nbsp;Being aware of new technologies and being able to quickly identify, locate, and correct errors</li></ul><p><br></p>', 'Active', '2024-12-10 04:24:19', NULL);

--
-- Triggers `js_post_jobs`
--
DELIMITER $$
CREATE TRIGGER `before_insert_js_post_jobs` BEFORE INSERT ON `js_post_jobs` FOR EACH ROW BEGIN
    IF NEW.expirationDate < NOW() THEN
        SET NEW.status = 'Expired';
    ELSE
        SET NEW.status = 'Active';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_update_js_post_jobs` BEFORE UPDATE ON `js_post_jobs` FOR EACH ROW BEGIN
    IF NEW.expirationDate < NOW() THEN
        SET NEW.status = 'Expired';
    ELSE
        SET NEW.status = 'Active';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `js_screening_question`
--

CREATE TABLE `js_screening_question` (
  `question_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `question` varchar(500) NOT NULL,
  `response_type` varchar(255) DEFAULT NULL,
  `ideal_answer` varchar(255) NOT NULL,
  `mustHave` varchar(255) DEFAULT NULL,
  `qualification_setting` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_screening_question`
--

INSERT INTO `js_screening_question` (`question_id`, `job_id`, `question`, `response_type`, `ideal_answer`, `mustHave`, `qualification_setting`, `created_at`) VALUES
(2, 151, 'Have you completed any level of education?', 'yesno', 'Yes', '1', '', '2024-12-09 10:22:48'),
(3, 151, 'Are you interested in applying for this position?', 'yesno', 'Yes', '1', '', '2024-12-09 10:22:48'),
(4, 151, 'Do you have relevant experience for this job?', 'yesno', 'Yes', '1', '', '2024-12-09 10:22:48'),
(5, 151, 'Are you open to relocating for this job?', 'yesno', 'Yes', '', NULL, '2024-12-09 10:22:48'),
(6, 151, 'Are you located in the required area?', 'yesno', 'Yes', '', NULL, '2024-12-09 10:22:48'),
(7, 152, 'Have you completed any level of education?', 'yesno', 'Yes', '', NULL, '2024-12-09 12:27:49'),
(8, 152, 'Do you speak any of the required languages fluently?', 'yesno', 'Yes', '', NULL, '2024-12-09 12:27:49'),
(9, 152, 'Do you have professional references available?', 'yesno', 'Yes', '', NULL, '2024-12-09 12:27:49'),
(10, 152, 'Do you have a preference for a work environment?', 'yesno', 'Yes', '', NULL, '2024-12-09 12:27:49'),
(11, 152, 'Are you interested in applying for this position?', 'yesno', 'Yes', '', NULL, '2024-12-09 12:27:49'),
(12, 153, 'How many Jobs have you entered in this position?', 'numeric', '1', '1', '', '2024-12-10 04:24:19'),
(13, 153, 'Do you possess any relevant skills for this job?', 'yesno', 'Yes', '', NULL, '2024-12-10 04:24:19'),
(14, 153, 'Does the offered salary range meet your expectations?', 'yesno', 'Yes', '', NULL, '2024-12-10 04:24:19');

-- --------------------------------------------------------

--
-- Table structure for table `js_social_media_company`
--

CREATE TABLE `js_social_media_company` (
  `social_media_id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `facebook_icon` varchar(255) DEFAULT NULL,
  `instagram_icon` varchar(255) DEFAULT NULL,
  `youtube_icon` varchar(255) DEFAULT NULL,
  `twitter_icon` varchar(255) DEFAULT NULL,
  `pinterest_icon` varchar(255) DEFAULT NULL,
  `reddit_icon` varchar(255) DEFAULT NULL,
  `whatsapp_business_icon` varchar(255) DEFAULT NULL,
  `telegram_icon` varchar(255) DEFAULT NULL,
  `wechat_icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `js_social_media_company`
--

INSERT INTO `js_social_media_company` (`social_media_id`, `employer_id`, `facebook_icon`, `instagram_icon`, `youtube_icon`, `twitter_icon`, `pinterest_icon`, `reddit_icon`, `whatsapp_business_icon`, `telegram_icon`, `wechat_icon`, `created_at`) VALUES
(1, 41, 'https://www.facebook.com/', 'https://www.facebook.com/', 'https://www.facebook.com/', NULL, NULL, NULL, NULL, NULL, NULL, '2024-11-24 15:16:51'),
(2, 42, 'https://www.facebook.com/', 'https://www.facebook.com/', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-11-23 08:42:29');

-- --------------------------------------------------------

--
-- Stand-in structure for view `recent_active_jobs`
-- (See below for the actual view)
--
CREATE TABLE `recent_active_jobs` (
`job_id` int(11)
,`employer_id` int(11)
,`jobTitle` varchar(255)
,`jobTags` varchar(255)
,`jobRole` varchar(255)
,`minSalary` varchar(255)
,`maxSalary` varchar(255)
,`salaryType` varchar(255)
,`education` varchar(255)
,`experience` varchar(255)
,`jobType` varchar(255)
,`expirationDate` timestamp
,`jobLevel` varchar(255)
,`address` varchar(255)
,`city` varchar(255)
,`selectedBenefits` text
,`jobDescription` text
,`status` varchar(255)
,`created_at` timestamp
,`updated_at` timestamp
);

-- --------------------------------------------------------

--
-- Structure for view `active_job_postings`
--
DROP TABLE IF EXISTS `active_job_postings`;


CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `active_job_postings` AS 
SELECT 
    `j`.`job_id` AS `job_id`, 
    `j`.`employer_id` AS `employer_id`, 
    `j`.`jobTitle` AS `jobTitle`, 
    `j`.`jobTags` AS `jobTags`, 
    `j`.`jobRole` AS `jobRole`, 
    `j`.`minSalary` AS `minSalary`, 
    `j`.`maxSalary` AS `maxSalary`, 
    `j`.`salaryType` AS `salaryType`, 
    `j`.`education` AS `education`, 
    `j`.`experience` AS `experience`, 
    `j`.`jobType` AS `jobType`, 
    `j`.`expirationDate` AS `expirationDate`, 
    `j`.`jobLevel` AS `jobLevel`, 
    `j`.`address` AS `address`, 
    `j`.`city` AS `city`, 
    `j`.`selectedBenefits` AS `selectedBenefits`, 
    `j`.`jobDescription` AS `jobDescription`, 
    `j`.`status` AS `status`, 
    `j`.`created_at` AS `job_created_at`, 
    `j`.`updated_at` AS `job_updated_at`, 
    `c`.`company_name` AS `company_name`, 
    `c`.`about_us` AS `about_us`, 
    `c`.`logo` AS `logo`, 
    `c`.`banner` AS `banner` 
FROM 
    (`js_post_jobs` `j` 
    JOIN `js_company_info` `c` ON (`j`.`employer_id` = `c`.`employer_id`)) 
WHERE 
    `j`.`status` = 'Active' 
    AND `j`.`expirationDate` > current_timestamp() 
ORDER BY 
    `j`.`created_at` DESC;

-- --------------------------------------------------------

--
-- Structure for view `applicants_favorite_jobs`
--
DROP TABLE IF EXISTS `applicants_favorite_jobs`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `applicants_favorite_jobs`  AS SELECT `fj`.`favorite_job_id` AS `favorite_job_id`, `fj`.`applicant_id` AS `applicant_id`, `fj`.`added_at` AS `added_at`, `pj`.`job_id` AS `job_id`, `pj`.`employer_id` AS `employer_id`, `pj`.`jobTitle` AS `jobTitle`, `pj`.`jobTags` AS `jobTags`, `pj`.`jobRole` AS `jobRole`, `pj`.`minSalary` AS `minSalary`, `pj`.`maxSalary` AS `maxSalary`, `pj`.`salaryType` AS `salaryType`, `pj`.`education` AS `education`, `pj`.`experience` AS `experience`, `pj`.`jobType` AS `jobType`, `pj`.`expirationDate` AS `expirationDate`, `pj`.`jobLevel` AS `jobLevel`, `pj`.`address` AS `address`, `pj`.`city` AS `city`, `pj`.`selectedBenefits` AS `selectedBenefits`, `pj`.`jobDescription` AS `jobDescription`, `pj`.`status` AS `status`, `pj`.`created_at` AS `created_at`, `pj`.`updated_at` AS `updated_at`, `ci`.`logo` AS `logo` FROM ((`js_post_jobs` `pj` join `js_favorite_jobs` `fj` on(`pj`.`job_id` = `fj`.`job_id`)) join `js_company_info` `ci` on(`pj`.`employer_id` = `ci`.`employer_id`))  ;

-- --------------------------------------------------------

--
-- Structure for view `applicant_details`
--
DROP TABLE IF EXISTS `applicant_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `applicant_details`  AS SELECT `a`.`applicant_id` AS `applicant_id`, `a`.`firstname` AS `firstname`, `a`.`middlename` AS `middlename`, `a`.`lastname` AS `lastname`, `a`.`suffix` AS `suffix`, `a`.`gender` AS `gender`, `a`.`contact` AS `contact`, `a`.`profile_picture` AS `profile_picture`, `a`.`email` AS `email`, `a`.`password` AS `password`, `a`.`verification_code` AS `verification_code`, `a`.`email_verified_at` AS `email_verified_at`, `p`.`headline` AS `headline`, `p`.`birthday` AS `birthday`, `p`.`birthplace` AS `birthplace`, `p`.`address` AS `address`, `p`.`city` AS `city`, `p`.`barangay` AS `barangay`, `p`.`postal` AS `postal`, `p`.`status` AS `status`, `p`.`experience` AS `experience`, `p`.`attainment` AS `attainment`, `p`.`biography` AS `biography`, `p`.`created_at` AS `personal_info_created_at`, `p`.`updated_at` AS `personal_info_updated_at` FROM (`js_applicants` `a` join `js_personal_info` `p` on(`a`.`applicant_id` = `p`.`applicant_id`))  ;

-- --------------------------------------------------------

--
-- Structure for view `applied_jobs`
--
DROP TABLE IF EXISTS `applied_jobs`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `applied_jobs`  AS SELECT `ar`.`applicant_id` AS `applicant_id`, `jp`.`job_id` AS `job_id`, `jp`.`employer_id` AS `employer_id`, `jp`.`jobTitle` AS `jobTitle`, `jp`.`jobTags` AS `jobTags`, `jp`.`jobRole` AS `jobRole`, `jp`.`minSalary` AS `minSalary`, `jp`.`maxSalary` AS `maxSalary`, `jp`.`salaryType` AS `salaryType`, `jp`.`education` AS `education`, `jp`.`experience` AS `experience`, `jp`.`jobType` AS `jobType`, `jp`.`expirationDate` AS `expirationDate`, `jp`.`jobLevel` AS `jobLevel`, `jp`.`address` AS `address`, `jp`.`city` AS `city`, `jp`.`selectedBenefits` AS `selectedBenefits`, `jp`.`jobDescription` AS `jobDescription`, `jp`.`status` AS `status`, `jp`.`created_at` AS `created_at`, `jp`.`updated_at` AS `updated_at`, `cf`.`logo` AS `logo`, `ar`.`applied_at` AS `applied_at` FROM ((`js_post_jobs` `jp` join `js_applicant_application_resume` `ar` on(`jp`.`job_id` = `ar`.`job_id`)) join `js_company_info` `cf` on(`jp`.`employer_id` = `cf`.`employer_id`))  ;

-- --------------------------------------------------------

--
-- Structure for view `complete_company_profile`
--
DROP TABLE IF EXISTS `complete_company_profile`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `complete_company_profile`  AS SELECT `ci`.`company_id` AS `company_id`, `ci`.`company_name` AS `company_name`, `ci`.`about_us` AS `about_us`, `ci`.`logo` AS `logo`, `ci`.`banner` AS `banner`, `ci`.`created_at` AS `company_created_at`, `fi`.`organization` AS `organization`, `fi`.`industry` AS `industry`, `fi`.`team_size` AS `team_size`, `fi`.`year_establishment` AS `year_establishment`, `fi`.`company_website` AS `company_website`, `fi`.`company_vision` AS `company_vision`, `fi`.`created_at` AS `founding_info_created_at`, `co`.`address` AS `address`, `co`.`contact_number` AS `contact_number`, `co`.`company_email` AS `company_email`, `co`.`city` AS `city`, `co`.`created_at` AS `contact_created_at`, `smc`.`facebook_icon` AS `facebook_icon`, `smc`.`instagram_icon` AS `instagram_icon`, `smc`.`youtube_icon` AS `youtube_icon`, `smc`.`twitter_icon` AS `twitter_icon`, `smc`.`pinterest_icon` AS `pinterest_icon`, `smc`.`reddit_icon` AS `reddit_icon`, `smc`.`whatsapp_business_icon` AS `whatsapp_business_icon`, `smc`.`telegram_icon` AS `telegram_icon`, `smc`.`wechat_icon` AS `wechat_icon`, `smc`.`created_at` AS `social_media_created_at`, count(case when `j`.`status` <> 'expired' then `j`.`status` end) AS `job_post_count` FROM ((((`js_company_info` `ci` join `js_founding_info` `fi` on(`ci`.`employer_id` = `fi`.`employer_id`)) join `js_company_contact` `co` on(`ci`.`employer_id` = `co`.`employer_id`)) join `js_social_media_company` `smc` on(`ci`.`employer_id` = `smc`.`employer_id`)) left join `js_post_jobs` `j` on(`ci`.`employer_id` = `j`.`employer_id`)) GROUP BY `ci`.`company_id`, `ci`.`company_name`, `ci`.`about_us`, `ci`.`logo`, `ci`.`banner`, `ci`.`created_at`, `fi`.`organization`, `fi`.`industry`, `fi`.`team_size`, `fi`.`year_establishment`, `fi`.`company_website`, `fi`.`company_vision`, `fi`.`created_at`, `co`.`address`, `co`.`contact_number`, `co`.`company_email`, `co`.`city`, `co`.`created_at`, `smc`.`facebook_icon`, `smc`.`instagram_icon`, `smc`.`youtube_icon`, `smc`.`twitter_icon`, `smc`.`pinterest_icon`, `smc`.`reddit_icon`, `smc`.`whatsapp_business_icon`, `smc`.`telegram_icon`, `smc`.`wechat_icon`, `smc`.`created_at`  ;

-- --------------------------------------------------------

--
-- Structure for view `employer_job_count`
--
DROP TABLE IF EXISTS `employer_job_count`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `employer_job_count`  AS SELECT `js_post_jobs`.`employer_id` AS `employer_id`, count(0) AS `total_jobs` FROM `js_post_jobs` GROUP BY `js_post_jobs`.`employer_id` ;

-- --------------------------------------------------------

--
-- Structure for view `recent_active_jobs`
--
DROP TABLE IF EXISTS `recent_active_jobs`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `recent_active_jobs`  AS SELECT `js_post_jobs`.`job_id` AS `job_id`, `js_post_jobs`.`employer_id` AS `employer_id`, `js_post_jobs`.`jobTitle` AS `jobTitle`, `js_post_jobs`.`jobTags` AS `jobTags`, `js_post_jobs`.`jobRole` AS `jobRole`, `js_post_jobs`.`minSalary` AS `minSalary`, `js_post_jobs`.`maxSalary` AS `maxSalary`, `js_post_jobs`.`salaryType` AS `salaryType`, `js_post_jobs`.`education` AS `education`, `js_post_jobs`.`experience` AS `experience`, `js_post_jobs`.`jobType` AS `jobType`, `js_post_jobs`.`expirationDate` AS `expirationDate`, `js_post_jobs`.`jobLevel` AS `jobLevel`, `js_post_jobs`.`address` AS `address`, `js_post_jobs`.`city` AS `city`, `js_post_jobs`.`selectedBenefits` AS `selectedBenefits`, `js_post_jobs`.`jobDescription` AS `jobDescription`, `js_post_jobs`.`status` AS `status`, `js_post_jobs`.`created_at` AS `created_at`, `js_post_jobs`.`updated_at` AS `updated_at` FROM `js_post_jobs` WHERE `js_post_jobs`.`status` = 'active' AND `js_post_jobs`.`expirationDate` > current_timestamp() AND `js_post_jobs`.`created_at` >= current_timestamp() - interval 30 day ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `js_applicants`
--
ALTER TABLE `js_applicants`
  ADD PRIMARY KEY (`applicant_id`);

--
-- Indexes for table `js_applicant_application`
--
ALTER TABLE `js_applicant_application`
  ADD PRIMARY KEY (`apply_id`),
  ADD KEY `application_id` (`application_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `js_applicant_application_resume`
--
ALTER TABLE `js_applicant_application_resume`
  ADD PRIMARY KEY (`application_id`),
  ADD KEY `applicant_id` (`applicant_id`),
  ADD KEY `job_id` (`job_id`);

--
-- Indexes for table `js_applicant_resume`
--
ALTER TABLE `js_applicant_resume`
  ADD PRIMARY KEY (`resume_id`),
  ADD KEY `fk_applicant_id` (`applicant_id`);

--
-- Indexes for table `js_applicant_socialmedia`
--
ALTER TABLE `js_applicant_socialmedia`
  ADD PRIMARY KEY (`socialmedia_id`),
  ADD KEY `applicant_id` (`applicant_id`);

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
-- Indexes for table `js_favorite_jobs`
--
ALTER TABLE `js_favorite_jobs`
  ADD PRIMARY KEY (`favorite_job_id`),
  ADD KEY `fk_applicant_id` (`applicant_id`),
  ADD KEY `fk_job_id` (`job_id`);

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
-- Indexes for table `js_screening_question`
--
ALTER TABLE `js_screening_question`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `fk_job_id` (`job_id`);

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
  MODIFY `applicant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `js_applicant_application`
--
ALTER TABLE `js_applicant_application`
  MODIFY `apply_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `js_applicant_application_resume`
--
ALTER TABLE `js_applicant_application_resume`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `js_applicant_resume`
--
ALTER TABLE `js_applicant_resume`
  MODIFY `resume_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `js_applicant_socialmedia`
--
ALTER TABLE `js_applicant_socialmedia`
  MODIFY `socialmedia_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `js_company_contact`
--
ALTER TABLE `js_company_contact`
  MODIFY `company_contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `js_company_info`
--
ALTER TABLE `js_company_info`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `js_employer_info`
--
ALTER TABLE `js_employer_info`
  MODIFY `employer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `js_favorite_jobs`
--
ALTER TABLE `js_favorite_jobs`
  MODIFY `favorite_job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT for table `js_founding_info`
--
ALTER TABLE `js_founding_info`
  MODIFY `founding_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `js_personal_info`
--
ALTER TABLE `js_personal_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `js_post_jobs`
--
ALTER TABLE `js_post_jobs`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT for table `js_screening_question`
--
ALTER TABLE `js_screening_question`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `js_social_media_company`
--
ALTER TABLE `js_social_media_company`
  MODIFY `social_media_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `js_applicant_application`
--
ALTER TABLE `js_applicant_application`
  ADD CONSTRAINT `js_applicant_application_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `js_applicant_application_resume` (`application_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `js_applicant_application_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `js_screening_question` (`question_id`) ON DELETE CASCADE;

--
-- Constraints for table `js_applicant_application_resume`
--
ALTER TABLE `js_applicant_application_resume`
  ADD CONSTRAINT `js_applicant_application_resume_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `js_applicants` (`applicant_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `js_applicant_application_resume_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `js_post_jobs` (`job_id`) ON DELETE CASCADE;

--
-- Constraints for table `js_applicant_resume`
--
ALTER TABLE `js_applicant_resume`
  ADD CONSTRAINT `fk_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `js_applicants` (`applicant_id`) ON DELETE CASCADE;

--
-- Constraints for table `js_applicant_socialmedia`
--
ALTER TABLE `js_applicant_socialmedia`
  ADD CONSTRAINT `js_applicant_socialmedia_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `js_applicants` (`applicant_id`) ON DELETE CASCADE;

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
-- Constraints for table `js_favorite_jobs`
--
ALTER TABLE `js_favorite_jobs`
  ADD CONSTRAINT `fk_js_favorite_jobs_applicant` FOREIGN KEY (`applicant_id`) REFERENCES `js_applicants` (`applicant_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_js_favorite_jobs_job` FOREIGN KEY (`job_id`) REFERENCES `js_post_jobs` (`job_id`) ON DELETE CASCADE;

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
-- Constraints for table `js_screening_question`
--
ALTER TABLE `js_screening_question`
  ADD CONSTRAINT `fk_job_id` FOREIGN KEY (`job_id`) REFERENCES `js_post_jobs` (`job_id`) ON DELETE CASCADE;

--
-- Constraints for table `js_social_media_company`
--
ALTER TABLE `js_social_media_company`
  ADD CONSTRAINT `js_social_media_company_ibfk_1` FOREIGN KEY (`employer_id`) REFERENCES `js_employer_info` (`employer_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
