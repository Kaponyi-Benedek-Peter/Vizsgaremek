-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 07, 2026 at 11:50 AM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `roy`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_account` (IN `p_first_name` VARCHAR(16), IN `p_last_name` VARCHAR(16), IN `p_email` VARCHAR(255), IN `p_sesstoken` VARCHAR(255), IN `p_passhash` VARCHAR(255), IN `p_account_state` VARCHAR(11))   BEGIN
    INSERT INTO roy.users (first_name, last_name, email, sesstoken, passhash, sesstoken_expire , account_state)
    VALUES (p_first_name, p_last_name, p_email, p_sesstoken, p_passhash, NOW() + INTERVAL 1 week, p_account_state);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_confirmation` (IN `p_confirmation_token` VARCHAR(255), IN `p_identification` VARCHAR(255), IN `p_new_value` VARCHAR(255), IN `p_type` VARCHAR(255))   BEGIN
    INSERT INTO roy.confirmations (confirmation_token, confirmation_token_expire, identification, new_value, confirmation_type)
    VALUES (p_confirmation_token, NOW() + INTERVAL 1 WEEK, p_identification, p_new_value, p_type);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_order` (IN `p_user_id` INT, IN `p_city` VARCHAR(255), IN `p_zipcode` INT(4), IN `p_address` VARCHAR(255), IN `p_apartment_number` INT(11), IN `p_note` VARCHAR(255), IN `p_house_number` INT, IN `p_phone_number` INT)   BEGIN

INSERT INTO roy.orders (user_id, created_at, price, city, zipcode, address, apartment_number, note, house_number, phone_number)
VALUES(p_user_id, NOW(),'0', p_city, p_zipcode, p_address, p_apartment_number, p_note, p_house_number, p_phone_number);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_order_item` (IN `P_order_id` INT, IN `p_product_id` INT, IN `p_quantity` INT)   BEGIN
DECLARE product_price DECIMAL(10,2);

SELECT price INTO product_price
    FROM products
    WHERE id = p_product_id;
    
INSERT INTO roy.order_items (order_id, product_id, quantity, price)
VALUES(p_order_id, p_product_id, p_quantity, product_price * p_quantity);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_post` (IN `p_body` TEXT, IN `p_title` VARCHAR(255), IN `p_user_id` INT, IN `p_image_source` VARCHAR(255))   BEGIN
    INSERT INTO roy.posts (title, body, user_id, image_source)
    VALUES (p_title, p_body, p_user_id, p_image_source);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_product` (IN `p_name` VARCHAR(11), IN `p_description` TEXT, IN `p_price` DECIMAL, IN `p_times_ordered` INT(11), IN `p_image_source` VARCHAR(255), IN `p_stock` INT(11), IN `p_sale_price` DECIMAL, IN `p_description_preview` TEXT)   BEGIN
INSERT INTO roy.products(name, description, price, times_ordered, image_source, stock, sale_price, description_preview)
VALUES(p_name, p_description, p_price, p_times_ordered, p_image_source, p_stock, p_sale_price, p_description_preview);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_account_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM users WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_confirmations` ()   BEGIN
DELETE FROM confirmations;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_orders` ()   BEGIN
DELETE FROM orders;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_order_items` ()   BEGIN
DELETE FROM order_items;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_posts` ()   BEGIN
DELETE FROM posts;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_products` ()   BEGIN
DELETE FROM products;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_users` ()   BEGIN
DELETE FROM users;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_confimation_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM confirmations WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_confirmation_by_identification` (IN `p_identification` VARCHAR(255))   BEGIN
    DELETE FROM confirmations WHERE identification = p_identification;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_order_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM orders WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_order_item_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM order_items WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_post_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM posts WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `disable_account_by_id` (IN `p_id` INT)   BEGIN
UPDATE roy.users
SET email = NULL,
passhash = NULL,
sesstoken = NULL,
sesstoken_expire = NULL,
account_state = 'deleted'
WHERE id = p_id;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_confirmations` ()   BEGIN
SELECT *
    FROM confirmations;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_confirmations_page` (IN `p_page` INT(11), IN `p_amount` INT(11), OUT `p_count_out` INT(11))   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM `confirmations`
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM `confirmations`
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_orders` ()   BEGIN
SELECT *
    FROM orders;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_orders_page` (IN `p_page` INT(11), IN `p_amount` INT(11), OUT `p_count_out` INT(11))   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM `orders`
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM `orders`
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_order_items` ()   BEGIN
SELECT *
    FROM order_items;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_order_items_page` (IN `p_page` INT(11), IN `p_amount` INT(11), OUT `p_count_out` INT(11))   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM `order_items`
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM `order_items`
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_posts` ()   BEGIN
SELECT *
    FROM posts;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_posts_page` (IN `p_page` INT(11), IN `p_amount` INT(11), OUT `p_count_out` INT(11))   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM `posts`
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM `posts`
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_products` ()   BEGIN
SELECT *
    FROM products;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_products_page` (IN `p_page` INT(11), IN `p_amount` INT(11), OUT `p_count_out` INT(11))   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM `products`
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM `products`
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_users` ()   BEGIN
SELECT *
    FROM users;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_users_page` (IN `p_page` INT(11), IN `p_amount` INT(11), OUT `p_count_out` INT(11))   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM `users`
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM `users`
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_confirmations_by_identification` (IN `p_identification` INT(255))   BEGIN
SELECT * from confirmations
where confirmations.identification = p_identification;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_confirmations_by_identification_and_type` (IN `p_identification` VARCHAR(255), IN `p_confirmation_type` VARCHAR(255))   BEGIN
SELECT * from confirmations
where confirmations.identification = p_identification AND confirmations.confirmation_type = p_confirmation_type;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_confirmation_by_id` (IN `p_id` INT)   BEGIN
SELECT * from confirmations
where confirmations.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_order_by_id` (IN `p_id` INT)   BEGIN
SELECT * from orders
where orders.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_order_items_by_order_id` (IN `p_order_id` INT)   BEGIN
SELECT * from order_items
where order_items.order_id = p_order_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_order_item_by_id` (IN `p_id` INT)   BEGIN
SELECT * from order_items
where order_items.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_post_by_id` (IN `p_id` INT)   BEGIN
SELECT * from posts
where posts.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_product_by_id` (IN `p_id` INT)   BEGIN
SELECT * from products
where products.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_by_email` (IN `p_email` VARCHAR(255))   BEGIN
SELECT * from users
where users.email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_by_id` (IN `p_id` INT)   BEGIN
SELECT * from users
where users.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `orders` ()   BEGIN
DELETE FROM orders;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `refresh_token_by_id` (IN `p_id` VARCHAR(255), IN `p_new_sesstoken` VARCHAR(255))   BEGIN
	UPDATE roy.users
    SET sesstoken_expire = NOW() + INTERVAL 1 WEEK,
    sesstoken = p_new_sesstoken
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_account_state_by_id` (IN `p_id` INT, IN `p_new_account_state` VARCHAR(255))   BEGIN
	UPDATE roy.users
    SET account_state = p_new_account_state
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_confirmation_by_id` (IN `p_id` INT(11), IN `p_new_identification` VARCHAR(255), IN `p_new_new_value` VARCHAR(255), IN `p_new_confirmation_token` VARCHAR(255), IN `p_new_confirmation_token_expire` DATETIME, IN `p_new_confirmation_type` VARCHAR(255))   BEGIN
UPDATE roy.confrimations
SET identification = p_new_identification,
new_value = p_new_new_value,
confirmation_token = p_new_confirmation_token,
comfirmation_type = new_confirmation_type
WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_name_by_id` (IN `p_id` VARCHAR(255), IN `p_new_first_name` VARCHAR(255), IN `p_new_last_name` VARCHAR(255))   BEGIN
	UPDATE roy.users
    SET first_name = p_new_first_name,
    last_name = p_new_last_name
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_order_item_quantity` (IN `p_id` INT, IN `p_new_quantity` INT)   BEGIN
	UPDATE roy.order_items
    SET quantity = p_new_quantity
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_order_price` (IN `p_id` INT)   BEGIN
    DECLARE final_price DECIMAL(10,2);

    SELECT SUM(price)
    INTO final_price
    FROM roy.order_items
    WHERE order_id = p_id;

    UPDATE roy.orders
    SET price = final_price
    WHERE orders.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_password_by_id` (IN `p_id` VARCHAR(255), IN `p_new_passhash` VARCHAR(255))   BEGIN 
	UPDATE roy.users
    SET passhash = p_new_passhash
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_post_by_id` (IN `p_id` INT, IN `p_new_title` VARCHAR(255), IN `p_new_body` TEXT, IN `P_new_user_id` INT, IN `p_new_created_at` DATETIME, IN `p_new_image_source` VARCHAR(255))   BEGIN
UPDATE roy.posts
SET title = p_new_title,
body = p_new_body,
user_id = p_new_user_id,
created_at = p_new_created_at,
image_source = p_new_image_source
WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_product_stock_by_id` (IN `p_id` INT, IN `p_new_stock` INT)   BEGIN
	UPDATE roy.products
    SET stock = p_new_stock
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_product_times_ordered` (IN `p_id` INT, IN `p_new_times_ordered` INT)   BEGIN
	UPDATE roy.products
    SET times_ordered = p_new_times_ordered
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_user_by_id` (IN `p_id` INT(11), IN `p_new_account_state` VARCHAR(255), IN `p_new_email` VARCHAR(255), IN `p_new_first_name` VARCHAR(16), IN `p_new_last_name` VARCHAR(16), IN `p_new_passhash` VARCHAR(255), IN `p_new_sesstoken` INT(2))   BEGIN
	UPDATE roy.users
    SET account_state = p_new_account_state,
    email = p_new_email,
    first_name = p_new_first_name,
    last_name = p_new_last_name,
    passhash = p_new_passhash,
    sesstoken = p_new_sesstoken
    WHERE id = p_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `confirmations`
--

CREATE TABLE `confirmations` (
  `id` int(11) NOT NULL,
  `identification` varchar(255) NOT NULL,
  `new_value` varchar(255) DEFAULT NULL,
  `confirmation_token` varchar(255) NOT NULL,
  `confirmation_token_expire` datetime NOT NULL,
  `confirmation_type` enum('password_change','post_deletion','account_deletion','account_creation') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `confirmations`
--

INSERT INTO `confirmations` (`id`, `identification`, `new_value`, `confirmation_token`, `confirmation_token_expire`, `confirmation_type`) VALUES
(3, '1', '-', 'uSeUOElKgPWhoZqYLtqLtC', '2026-01-13 10:50:19', 'account_deletion'),
(4, '0', '0', 'VneufOPxmcieKspecnRXZk', '2026-01-13 10:54:30', 'account_deletion'),
(5, '1', '1', 'oXnQrOXzlXXEKJzeOjnhgg', '2026-01-13 10:54:30', 'account_deletion'),
(6, '2', '2', 'oXnQrOXzlXXEKJzeOjnhgg', '2026-01-13 10:54:30', 'account_deletion'),
(7, '3', '3', 'oXnQrOXzlXXEKJzeOjnhgg', '2026-01-13 10:54:30', 'account_deletion'),
(8, '4', '4', 'oXnQrOXzlXXEKJzeOjnhgg', '2026-01-13 10:54:30', 'account_deletion'),
(9, '5', '5', 'oXnQrOXzlXXEKJzeOjnhgg', '2026-01-13 10:54:30', 'account_deletion'),
(10, '6', '6', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(11, '7', '7', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(12, '8', '8', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(13, '9', '9', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(14, '10', '10', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(15, '11', '11', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(16, '12', '12', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(17, '13', '13', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(18, '14', '14', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(19, '15', '15', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(20, '16', '16', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(21, '17', '17', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(22, '18', '18', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(23, '19', '19', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(24, '20', '20', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(25, '21', '21', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(26, '22', '22', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(27, '23', '23', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(28, '24', '24', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(29, '25', '25', 'fsMafTJaeyapbzZxeyIXgP', '2026-01-13 10:54:30', 'account_deletion'),
(30, '26', '26', 'ycWwqSScdtOOaQjxQufhmL', '2026-01-13 10:54:30', 'account_deletion'),
(31, '27', '27', 'ycWwqSScdtOOaQjxQufhmL', '2026-01-13 10:54:30', 'account_deletion'),
(32, '28', '28', 'ycWwqSScdtOOaQjxQufhmL', '2026-01-13 10:54:30', 'account_deletion'),
(33, '29', '29', 'ycWwqSScdtOOaQjxQufhmL', '2026-01-13 10:54:30', 'account_deletion'),
(34, '30', '30', 'ycWwqSScdtOOaQjxQufhmL', '2026-01-13 10:54:30', 'account_deletion'),
(35, '31', '31', 'ycWwqSScdtOOaQjxQufhmL', '2026-01-13 10:54:30', 'account_deletion'),
(36, '32', '32', 'ycWwqSScdtOOaQjxQufhmL', '2026-01-13 10:54:30', 'account_deletion');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zipcode` int(4) NOT NULL,
  `address` varchar(255) NOT NULL,
  `apartment_number` int(11) NOT NULL,
  `note` varchar(255) NOT NULL,
  `house_number` int(11) NOT NULL,
  `phone_number` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `created_at`, `price`, `city`, `zipcode`, `address`, `apartment_number`, `note`, `house_number`, `phone_number`) VALUES
(1, 1, '2025-11-13', '102', 'city', 0, 'address', 0, '--', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(11,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(3, 1, 1, 1, '66'),
(4, 1, 2, 3, '36');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(11) NOT NULL,
  `body` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_source` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `body`, `user_id`, `created_at`, `image_source`) VALUES
(2, 'test good', 'test good', 1, '2026-01-06 10:37:16', 'test good');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(11) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(11,0) NOT NULL,
  `times_ordered` int(11) NOT NULL,
  `image_source` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL,
  `sale_price` decimal(10,0) NOT NULL,
  `description_preview` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `times_ordered`, `image_source`, `stock`, `sale_price`, `description_preview`) VALUES
(1, 'TEST 1', 'Test 1', '3', 0, '--', 2, '0', '--'),
(2, 'TEST 2', 'Test 2', '12', 0, '--', 0, '0', '--');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sesstoken` varchar(255) NOT NULL,
  `passhash` varchar(255) NOT NULL,
  `sesstoken_expire` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(16) NOT NULL,
  `account_state` enum('verified','unverified','banned','admin','deleted') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `created_at`, `sesstoken`, `passhash`, `sesstoken_expire`, `first_name`, `last_name`, `account_state`) VALUES
(2, '0test@gmail.com', '2026-01-06 10:54:26', 'DoqcujMNsXbLUIFarjYrHO', 'D8sOKkFGFGDyq3Y11oRgOKzLJD+F0RcMauZTcYYsx0c=', '2026-01-13 10:54:26', '0Berg', 'Mc0', 'unverified'),
(3, '1test@gmail.com', '2026-01-06 10:54:26', 'iDqUtxuvTmCrRcKewRzraE', 'aU8GLJRZi8O2AlMPf7/NbMO4Wi2OAP1tTQQeEMJxFKU=', '2026-01-13 10:54:26', '1Berg', 'Mc1', 'unverified'),
(4, '2test@gmail.com', '2026-01-06 10:54:26', 'TXJLQvMxRbgqRKfdUJsLnw', 'ofUDksnla1w2MUXNuhdFTagKytfMAA/TeCDS8X/AAG4=', '2026-01-13 10:54:26', '2Berg', 'Mc2', 'unverified'),
(5, '3test@gmail.com', '2026-01-06 10:54:26', 'dcsrQAGaIyXAhQPwVUkMtc', 'NLMDlqiqd6aTgq5gfTk4NH3fL4itvFLycXIRvlavXzs=', '2026-01-13 10:54:26', '3Berg', 'Mc3', 'unverified'),
(6, '4test@gmail.com', '2026-01-06 10:54:26', 'nhbXQFBDzUPLxXzPXgcMzH', 'QEloqA0im9fq7vDG+KsG/G9EDTTmeWnhsTLejphFxgs=', '2026-01-13 10:54:26', '4Berg', 'Mc4', 'unverified'),
(7, '5test@gmail.com', '2026-01-06 10:54:26', 'GRktbEJEyPElxoKOJcyWGE', 'D3rfr69Zyi12gShMhOtLxq3+7iYGIJrXv9c/ogWKoxs=', '2026-01-13 10:54:26', '5Berg', 'Mc5', 'unverified'),
(8, '6test@gmail.com', '2026-01-06 10:54:26', 'QWTZbIEhqmvvNuuhKnqWMj', 'vXqdsjwBBmo+a6EFTmGGQ1kNabEkuHke3kpqkRkHJ1k=', '2026-01-13 10:54:26', '6Berg', 'Mc6', 'unverified'),
(9, '7test@gmail.com', '2026-01-06 10:54:26', 'abCFbNyKhInGeBfAMyhWSP', 'gcPQxE8/tVzEkb9CD57CthsMKmMl2+rCGSOopiz7H0I=', '2026-01-13 10:54:26', '7Berg', 'Mc7', 'unverified'),
(10, '8test@gmail.com', '2026-01-06 10:54:26', 'kgklbSsmZefQuIPSNKZWYu', 'bGJ5I4fpsXKyeY+jKFbwsd0SET7hEwo5IFSSvfGwHJQ=', '2026-01-13 10:54:26', '8Berg', 'Mc8', 'unverified'),
(11, '9test@gmail.com', '2026-01-06 10:54:26', 'DQuHmRBoYZUquYZSzGwhfq', 'pRBkeZbdTINu1K85rJMMmEt/GK94Diqhaqw/vwbBzNU=', '2026-01-13 10:54:26', '9Berg', 'Mc9', 'unverified'),
(12, '10test@gmail.com', '2026-01-06 10:54:26', 'WAEcyQKpWUJPupkSlCSrlm', 'sDWvnhGPFPDvUtpJOgAT++KjcErP/RjhiFiAvtugv/0=', '2026-01-13 10:54:26', '10Berg', 'Mc10', 'unverified'),
(13, '11test@gmail.com', '2026-01-06 10:54:26', 'gFmIyVESOqAaKwUknNKrrS', 'LF0Gp8IN1+MM95BtHFQ3AVLog+2n8S7Z7c9qPtiVXD8=', '2026-01-13 10:54:26', '11Berg', 'Mc11', 'unverified'),
(14, '12test@gmail.com', '2026-01-06 10:54:26', 'ypweKUNTNlpzKNekYJgByO', '/OKh7OI8un0HzJsOkxlfnk3D/Ln5J/ymJ1GgFpI1Jzs=', '2026-01-13 10:54:26', '12Berg', 'Mc12', 'unverified'),
(15, '13test@gmail.com', '2026-01-06 10:54:26', 'JufKJZHwEIhKaUPDaUYBEt', 'iLb2qfCCi80rHTBuVQPmL6F4lWnrl8p6F7UpijQcyPg=', '2026-01-13 10:54:26', '13Berg', 'Mc13', 'unverified'),
(16, '14test@gmail.com', '2026-01-06 10:54:26', 'APEUyesXxjjvqJpWqktrEd', 'kH6mHjvkxwdQG5d4yqv+c7gyRZTO4uluqnITiMRxDeA=', '2026-01-13 10:54:26', '14Berg', 'Mc14', 'unverified'),
(17, '15test@gmail.com', '2026-01-06 10:54:26', 'ljXMVcKavZNuqrJVNcmMRV', 'EWYcKfP6HxwcPD2Xx13TEP66626fzmlmxKsVsopg1Tg=', '2026-01-13 10:54:26', '15Berg', 'Mc15', 'unverified'),
(18, '16test@gmail.com', '2026-01-06 10:54:26', 'dEwWJiwBnAQfGhjodrHCRE', 'UztddA9+0GzyzWhyzAA61ZGg/PaPv9P197nlUW70ieA=', '2026-01-13 10:54:26', '16Berg', 'Mc16', 'unverified'),
(19, '17test@gmail.com', '2026-01-06 10:54:26', 'OZPNggNElqueGPEnBjAWex', 'phE7LiB3r+Fs7pRCbLt3Mc6nIQK7Ffo7kl8IzfDVR+E=', '2026-01-13 10:54:26', '17Berg', 'Mc17', 'unverified'),
(20, '18test@gmail.com', '2026-01-06 10:54:26', 'GtpYUmzgdSxPWEeGQyVMdg', 'nh6KQpjHIlkzUDZgz0qI960dXeVuA1Dozp9C5FigLi4=', '2026-01-13 10:54:26', '18Berg', 'Mc18', 'unverified'),
(21, '19test@gmail.com', '2026-01-06 10:54:26', 'QyXEUqtIVooZnLPZSKNMjL', 'vtvL7CkKn80zf2AIaideN3eSC1zF8KY3bxuLI2Gtd+w=', '2026-01-13 10:54:26', '19Berg', 'Mc19', 'unverified'),
(22, '20test@gmail.com', '2026-01-06 10:54:26', 'ijhZgqCKUjdzncZZEGkWqI', 'iKHLhQBaNKP8to7on4qgx/Kv1WkpHXTQYScXU3lI50o=', '2026-01-13 10:54:26', '20Berg', 'Mc20', 'unverified'),
(23, '21test@gmail.com', '2026-01-06 10:54:26', 'toQFguwmLFVJDiJrFRbWwn', 'SXfjAghxWSb/raupHYdPvlCsWeXswsQdAlMeHZN3MXY=', '2026-01-13 10:54:26', '21Berg', 'Mc21', 'unverified'),
(24, '22test@gmail.com', '2026-01-06 10:54:26', 'LYZbrtFoKAKjDzUrrNyhDj', 'ojrrCXDIT22+jjD6kxHhDINN1U8tk8yWmcWJZeYeDuw=', '2026-01-13 10:54:26', '22Berg', 'Mc22', 'unverified'),
(25, '23test@gmail.com', '2026-01-06 10:54:26', 'VdIHryzRCXBtTGEKtYphJP', 'kFCPy2GeCs1sectKG6z2FmIZlLpVvB/sKA1+rbvIvlo=', '2026-01-13 10:54:26', '23Berg', 'Mc23', 'unverified'),
(26, '24test@gmail.com', '2026-01-06 10:54:27', 'girnrDtttttEjNodukhhPu', 'EvLmZdNzVceffVAS60pIAn2H1HnU47VpRTreW04ZXAI=', '2026-01-13 10:54:27', '24Berg', 'Mc24', 'unverified'),
(27, '25test@gmail.com', '2026-01-06 10:54:27', 'ySAJCCCvsoiejdzcggDrWq', 'CPoKaw5u9OM21A09nVnleoomXxRSegplD6pfEaesJxQ=', '2026-01-13 10:54:27', '25Berg', 'Mc25', 'unverified'),
(28, '26test@gmail.com', '2026-01-06 10:54:27', 'IXjpCHwXjKZozkjvirvrcW', 'ZCOnLANSiRGbII7xypKmc+ykgdsqRYKP9MeW7RNnM84=', '2026-01-13 10:54:27', '26Berg', 'Mc26', 'unverified'),
(29, '27test@gmail.com', '2026-01-06 10:54:27', 'urCgaFOahADnzSEuFjoMpO', 'wuk/MrTPeWQuiyMaEwSAEesrZI7isvBrWBRA8r5jRJo=', '2026-01-13 10:54:27', '27Berg', 'Mc27', 'unverified'),
(30, '28test@gmail.com', '2026-01-06 10:54:27', 'EwlMZKIDZWvyPYoNHugMvt', 'n7wVFYMIkPdmghMYFmOEaZD28i4ACdSSKSG9A2d0nXI=', '2026-01-13 10:54:27', '28Berg', 'Mc28', 'unverified'),
(31, '29test@gmail.com', '2026-01-06 10:54:27', 'OBUsZOCgQtnIffZgJGXMBZ', '7K2T1sy/0UEnlXUc5RKwnxvApu/Pv/OFRwavBrsid5Q=', '2026-01-13 10:54:27', '29Berg', 'Mc29', 'unverified'),
(32, '30test@gmail.com', '2026-01-06 10:54:27', 'hldOlNLhPocifwjfuCuWIV', '2+oUXh8mNGOdFTYR/mtBKfIVQwDBPawSyO8yhTmPl/M=', '2026-01-13 10:54:27', '30Berg', 'Mc30', 'unverified'),
(33, '31test@gmail.com', '2026-01-06 10:54:27', 'rqMulSFKHKTswDTywNmWOA', 'mnIHj46fZmPoeEdSCmPqwZIOskat0UaqZiWuxoLH6mU=', '2026-01-13 10:54:27', '31Berg', 'Mc31', 'unverified'),
(34, '32test@gmail.com', '2026-01-06 10:54:27', 'BvvakXAmygLDMJERxYdWUg', 'aGnLYadNZXU73keC2+WPlfdp3dPUw6SGLUaiB2uaBz8=', '2026-01-13 10:54:27', '32Berg', 'Mc32', 'unverified');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `confirmations`
--
ALTER TABLE `confirmations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `confirmations`
--
ALTER TABLE `confirmations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
