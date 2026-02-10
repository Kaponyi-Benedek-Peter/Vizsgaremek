-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 10, 2026 at 08:09 AM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `ban_user_by_id` (IN `p_id` INT)   UPDATE roy.users
SET account_state = 'banned'
WHERE id = p_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `calculate_order_price` (IN `p_id` INT)   BEGIN
    DECLARE final_price DECIMAL(10,2);

    SELECT IFNULL(SUM(price),0)
    INTO final_price
    FROM roy.order_items
    WHERE order_id = p_id;

    UPDATE roy.orders
    SET price = final_price
    WHERE orders.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_account` (IN `p_first_name` VARCHAR(16), IN `p_last_name` VARCHAR(16), IN `p_email` VARCHAR(255), IN `p_sesstoken` VARCHAR(255), IN `p_passhash` VARCHAR(255), IN `p_account_state` VARCHAR(11))   BEGIN
    INSERT INTO roy.users (first_name, last_name, email, sesstoken, passhash, sesstoken_expire , account_state)
    VALUES (p_first_name, p_last_name, p_email, p_sesstoken, p_passhash, NOW() + INTERVAL 1 week, p_account_state);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_confirmation` (IN `p_confirmation_token` VARCHAR(255), IN `p_user_id` INT(255), IN `p_new_value` VARCHAR(255), IN `p_type` VARCHAR(255))   BEGIN
    INSERT INTO roy.confirmations (confirmation_token, confirmation_token_expire, user_id, new_value, confirmation_type)
    VALUES (p_confirmation_token, NOW() + INTERVAL 1 WEEK, p_user_id, p_new_value, p_type);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_order` (IN `p_user_id` INT, IN `p_city` VARCHAR(255), IN `p_zipcode` VARCHAR(10), IN `p_address` VARCHAR(255), IN `p_apartment_number` INT(11), IN `p_note` VARCHAR(255), IN `p_house_number` INT, IN `p_phone_number` VARCHAR(12))   BEGIN

INSERT INTO roy.orders (user_id, created_at, price, city, zipcode, address, apartment_number, note, house_number, phone_number)
VALUES(p_user_id, NOW(),'0', p_city, p_zipcode, p_address, p_apartment_number, p_note, p_house_number, p_phone_number);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_order_item` (IN `p_order_id` INT, IN `p_product_id` INT, IN `p_quantity` INT)   BEGIN
    DECLARE product_price DECIMAL(11,0);


    SELECT 
        CASE 
            WHEN sale_percentage > 0 
            THEN ROUND(price_huf * (1 - (sale_percentage / 100)),0)
            ELSE price_huf
        END
    INTO product_price
    FROM roy.products
    WHERE id = p_product_id;


    INSERT INTO order_items(order_id, product_id, quantity, price)
    VALUES(p_order_id, p_product_id, p_quantity, product_price * p_quantity);


    CALL calculate_order_price(p_order_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_post` (IN `p_body` TEXT, IN `p_title` VARCHAR(255), IN `p_user_id` INT, IN `p_image_source` VARCHAR(255))   BEGIN
    INSERT INTO roy.posts (title, body, user_id, image_source, created_at)
    VALUES (p_title, p_body, p_user_id, p_image_source, NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_product` (IN `p_name_de` VARCHAR(255), IN `p_description_en` TEXT, IN `p_price_huf` DECIMAL(11,0), IN `p_times_ordered` INT, IN `p_stock` INT, IN `p_sale_percentage` DECIMAL(10,0), IN `p_description_preview_en` TEXT, IN `p_name_hu` VARCHAR(255), IN `p_name_en` VARCHAR(255), IN `p_description_hu` TEXT, IN `p_description_de` TEXT, IN `p_description_preview_hu` TEXT, IN `p_description_preview_de` TEXT, IN `p_category` VARCHAR(255), IN `p_manufacturer` VARCHAR(255), IN `p_brand` VARCHAR(255), IN `p_rating` DOUBLE, IN `p_sku` VARCHAR(255), IN `p_active_ingredients` TEXT, IN `p_packaging` VARCHAR(255), IN `p_name` VARCHAR(255))   BEGIN

INSERT INTO roy.products(
    name_de,
    description_en,
    price_huf,
    times_ordered,
    stock,
    sale_percentage,
    description_preview_en,
    name_hu,
    name_en,
    description_hu,
    description_de,
    description_preview_hu,
    description_preview_de,
    category,
    manufacturer,
    brand,
    rating,
    sku,
    active_ingredients,
    packaging,
    name,
    created_at
)
VALUES(
    p_name_de,
    p_description_en,
    p_price_huf,
    p_times_ordered,
    p_stock,
    p_sale_percentage,
    p_description_preview_en,
    p_name_hu,
    p_name_en,
    p_description_hu,
    p_description_de,
    p_description_preview_hu,
    p_description_preview_de,
    p_category,
    p_manufacturer,
    p_brand,
    p_rating,
    p_sku,
    p_active_ingredients,
    p_packaging,
    p_name,
    NOW()
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_account_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.users WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_confirmations` ()   BEGIN
DELETE FROM roy.confirmations;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_orders` ()   BEGIN
DELETE FROM roy.orders;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_order_items` ()   BEGIN
DELETE FROM roy.order_items;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_posts` ()   BEGIN
DELETE FROM roy.posts;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_products` ()   BEGIN
DELETE FROM roy.products;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_users` ()   BEGIN
DELETE FROM roy.users;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_confirmations_by_user_id_and_type` (IN `p_user_id` INT, IN `p_confirmation_type` VARCHAR(255))   BEGIN
DELETE from roy.confirmations
where confirmations.user_id = p_user_id AND confirmations.confirmation_type = p_confirmation_type;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_confirmation_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.confirmations WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_confirmation_by_user_id` (IN `p_user_id` INT(255))   BEGIN
    DELETE FROM roy.confirmations WHERE user_id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_expired_confirmations` ()   DELETE FROM roy.confirmations
    WHERE confirmation_token_expire < NOW()$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_order_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.orders WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_order_item_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.order_items WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_post_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.posts WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `disable_account_by_id` (IN `p_id` INT)   BEGIN
UPDATE roy.users
SET
passhash = 'deleted field',
sesstoken = 'deleted field',
sesstoken_expire = NOW(),
account_state = 'deleted'
WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_confirmations` ()   BEGIN
SELECT *
    FROM roy.confirmations;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_newsletters` ()   BEGIN
SELECT *
    FROM roy.newsletters;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_newsletter_recipients` ()   BEGIN
SELECT *
    FROM roy.newsletter_recipients;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_newsletter_recipients_page` (IN `p_page` INT(11), IN `p_amount` INT(11), OUT `p_count_out` INT(11))   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM `newsletter_recipients`
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM `newsletter_recipients`
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_orders` ()   BEGIN
SELECT *
    FROM roy.orders;
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
    FROM roy.order_items;
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
    FROM roy.posts;
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
    FROM roy.products;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_reviews_page` (IN `p_page` INT(11), IN `p_amount` INT(11), OUT `p_count_out` INT(11))   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM `reviews`
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM `reviews`
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_reviews_page_by_product` (IN `p_page` INT, IN `p_amount` INT, OUT `p_count_out` INT, IN `p_product_id` INT)   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM `reviews`
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM `reviews` 
	WHERE product_id = p_product_id
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_users` ()   BEGIN
SELECT *
    FROM roy.users;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_verified_users` ()   BEGIN
SELECT *
    FROM roy.users
    WHERE account_state = 'verified'
    ORDER BY id ASC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_confirmations_by_user_id` (IN `p_user_id` INT(255))   BEGIN
SELECT * from roy.confirmations
where confirmations.user_id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_confirmations_by_user_id_and_type` (IN `p_user_id` INT(255), IN `p_confirmation_type` VARCHAR(255))   BEGIN
SELECT * from roy.confirmations
where confirmations.user_id = p_user_id AND confirmations.confirmation_type = p_confirmation_type;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_confirmation_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.confirmations
where confirmations.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_order_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.orders
where orders.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_order_items_by_order_id` (IN `p_order_id` INT)   BEGIN
SELECT * from roy.order_items
where order_items.order_id = p_order_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_order_item_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.order_items
where order_items.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_posts_by_user` (IN `p_user_id` INT)   SELECT *
    FROM posts
    WHERE user_id = p_user_id
    ORDER BY created_at DESC$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_post_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.posts
where posts.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_product_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.products
where products.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_by_email` (IN `p_email` VARCHAR(255))   BEGIN
SELECT * from roy.users
where users.email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.users
where users.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `refresh_token_by_id` (IN `p_id` INT(11), IN `p_new_sesstoken` VARCHAR(255))   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_confirmation_by_id` (IN `p_id` INT, IN `p_new_new_value` VARCHAR(255), IN `p_new_confirmation_token` VARCHAR(255), IN `p_new_confirmation_token_expire` DATETIME, IN `p_new_confirmation_type` VARCHAR(255))   BEGIN
UPDATE roy.confirmations
SET new_value = p_new_new_value,
    confirmation_token = p_new_confirmation_token,
    confirmation_token_expire = p_new_confirmation_token_expire,
    confirmation_type = p_new_confirmation_type
WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_name_by_id` (IN `p_id` INT, IN `p_new_first_name` VARCHAR(16), IN `p_new_last_name` VARCHAR(16))   BEGIN
	UPDATE roy.users
    SET first_name = p_new_first_name,
    last_name = p_new_last_name
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_order_item_quantity` (IN `p_id` INT, IN `p_new_quantity` INT)   BEGIN
DECLARE v_order_id INT;

SELECT order_id INTO v_order_id
FROM order_items
WHERE id = p_id;

UPDATE order_items
SET quantity = p_new_quantity
WHERE id = p_id;

CALL calculate_order_price(v_order_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_password_by_id` (IN `p_id` INT(255), IN `p_new_passhash` VARCHAR(255))   BEGIN 
	UPDATE roy.users
    SET passhash = p_new_passhash
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_post_by_id` (IN `p_id` INT, IN `p_body` TEXT, IN `p_image_source` VARCHAR(255), IN `p_title` VARCHAR(255))   BEGIN
   	UPDATE roy.posts
	SET body = p_body, image_source = p_image_source, 	title = p_title
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_user_by_id` (IN `p_id` INT(11), IN `p_new_account_state` VARCHAR(255), IN `p_new_email` VARCHAR(255), IN `p_new_first_name` VARCHAR(16), IN `p_new_last_name` VARCHAR(16), IN `p_new_passhash` VARCHAR(255), IN `p_new_sesstoken` VARCHAR(255))   BEGIN
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
  `user_id` int(255) NOT NULL,
  `new_value` varchar(255) DEFAULT NULL,
  `confirmation_token` varchar(255) NOT NULL,
  `confirmation_token_expire` datetime NOT NULL,
  `confirmation_type` enum('password_change','account_deletion','account_creation') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_recipients`
--

CREATE TABLE `newsletter_recipients` (
  `user_id` int(11) NOT NULL,
  `news_level` int(11) NOT NULL,
  `received_current_newsletter` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `address` varchar(255) NOT NULL,
  `apartment_number` int(11) NOT NULL,
  `note` varchar(255) NOT NULL,
  `house_number` int(11) NOT NULL,
  `phone_number` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_source` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name_de` varchar(255) NOT NULL,
  `description_en` text NOT NULL,
  `price_huf` int(11) NOT NULL,
  `times_ordered` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `sale_percentage` decimal(10,0) NOT NULL,
  `description_preview_en` text NOT NULL,
  `name_hu` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `description_hu` text NOT NULL,
  `description_de` text NOT NULL,
  `description_preview_hu` text NOT NULL,
  `description_preview_de` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `rating` double(3,2) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `active_ingredients` text NOT NULL,
  `packaging` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `alt_text_de` varchar(255) NOT NULL,
  `alt_text_hu` varchar(255) NOT NULL,
  `alt_text_en` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL,
  `sort_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `product_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `rating` decimal(3,2) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(3, '1test@gmail.com', '2026-01-06 10:54:26', 'deleted field', 'deleted field', '2026-01-20 11:21:00', '1Berg', 'Mc1', 'deleted'),
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
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_confirmations_user` (`user_id`);

--
-- Indexes for table `newsletter_recipients`
--
ALTER TABLE `newsletter_recipients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_newsletter_recipients_user` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_user` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_items_order` (`order_id`),
  ADD KEY `fk_order_items_product` (`product_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_posts_user` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `image_url` (`image_url`),
  ADD KEY `fk_product_images_product` (`product_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reviews_product` (`product_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `newsletter_recipients`
--
ALTER TABLE `newsletter_recipients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `confirmations`
--
ALTER TABLE `confirmations`
  ADD CONSTRAINT `fk_confirmations_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `newsletter_recipients`
--
ALTER TABLE `newsletter_recipients`
  ADD CONSTRAINT `fk_newsletter_recipients_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_posts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `fk_product_images_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_reviews_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
