-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 13, 2026 at 10:01 AM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `ban_user_by_id` (IN `p_id` INT)   BEGIN
UPDATE roy.users
SET account_state = 'banned'
WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `calculate_average_product_rating` (IN `p_product_id` INT)   BEGIN
UPDATE roy.products
SET rating = (
    SELECT AVG(rating)
    FROM reviews
    WHERE product_id = p_product_id
)
WHERE id = p_product_id;
END$$

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_confirmation` (IN `p_confirmation_token` VARCHAR(255), IN `p_user_id` INT, IN `p_new_value` VARCHAR(255), IN `p_type` VARCHAR(255))   BEGIN
    INSERT INTO roy.confirmations (confirmation_token, confirmation_token_expire, user_id, new_value, confirmation_type)
    VALUES (p_confirmation_token, NOW() + INTERVAL 1 WEEK, p_user_id, p_new_value, p_type);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_newsletter_recipient` (IN `p_news_level` INT, IN `p_user_id` INT)   BEGIN
INSERT INTO roy.newsletter_recipients (news_level, user_id, received_current_newsletter)
VALUES (p_news_level, p_user_id, '0');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_order` (IN `p_user_id` INT, IN `p_city` VARCHAR(255), IN `p_zipcode` VARCHAR(10), IN `p_address` VARCHAR(255), IN `p_apartment_number` INT(11), IN `p_note` VARCHAR(255), IN `p_house_number` INT, IN `p_phone_number` VARCHAR(20))   BEGIN

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_product` (IN `p_name_de` VARCHAR(255), IN `p_description_en` TEXT, IN `p_price_huf` DECIMAL(11,0), IN `p_times_ordered` INT, IN `p_stock` INT, IN `p_sale_percentage` DECIMAL(10,0), IN `p_description_preview_en` TEXT, IN `p_name_hu` VARCHAR(255), IN `p_name_en` VARCHAR(255), IN `p_description_hu` TEXT, IN `p_description_de` TEXT, IN `p_description_preview_hu` TEXT, IN `p_description_preview_de` TEXT, IN `p_category` VARCHAR(255), IN `p_manufacturer` VARCHAR(255), IN `p_brand` VARCHAR(255), IN `p_rating` DOUBLE, IN `p_sku` VARCHAR(255), IN `p_active_ingredients` TEXT, IN `p_packaging` VARCHAR(255), IN `p_name` VARCHAR(255), IN `p_thumbnail_url` VARCHAR(255), IN `p_featured` TINYINT)   BEGIN

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
    created_at,
    thumbnail_url,
    featured
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
    '0',
    p_sku,
    p_active_ingredients,
    p_packaging,
    p_name,
    NOW(),
    p_thumbnail_url,
    p_featured
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_product_image` (IN `p_alt_text_de` VARCHAR(255), IN `p_alt_text_en` VARCHAR(255), IN `p_alt_text_hu` VARCHAR(255), IN `p_image_url` VARCHAR(255), IN `p_sort_id` INT, IN `p_product_id` INT)   BEGIN
INSERT INTO roy.product_images(
	alt_text_de,
    alt_text_en,
    alt_text_hu,
    image_url,
    sort_id,
    product_id
)
VALUES (
	p_alt_text_de,
    p_alt_text_en,
    p_alt_text_hu,
    p_image_url,
    p_sort_id,
    p_product_id
);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_review` (IN `p_body` TEXT, IN `p_product_id` INT, IN `p_rating` DECIMAL(3,2), IN `p_title` VARCHAR(255), IN `p_user_id` INT)   BEGIN
INSERT INTO roy.reviews(
	body,
    product_id,
    rating,
    title,
    user_id,
    created_at
)
VALUES (
	p_body,
    p_product_id,
    p_rating,
    p_title,
    p_user_id,
    NOW()
);
CALL calculate_average_product_rating(p_product_id);
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_product_images` ()   BEGIN
DELETE FROM roy.product_images;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_reviews` ()   BEGIN
DELETE FROM roy.reviews;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_confirmation_by_user_id` (IN `p_user_id` INT)   BEGIN
    DELETE FROM roy.confirmations WHERE user_id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_expired_confirmations` ()   BEGIN
DELETE FROM roy.confirmations
    WHERE confirmation_token_expire < NOW();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_order_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.orders WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_order_item_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.order_items WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_post_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.posts WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_review_by_id` (IN `p_id` INT(11))   BEGIN
    DELETE FROM roy.reviews WHERE id = p_id;
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

SELECT * FROM roy.confirmations
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM roy.confirmations
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_featured_products` ()   BEGIN
select * from roy.products
where featured = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_newsletter_recipients` ()   BEGIN
SELECT *
    FROM roy.newsletter_recipients;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_newsletter_recipients_page` (IN `p_page` INT(11), IN `p_amount` INT(11), OUT `p_count_out` INT(11))   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM roy.newsletter_recipients
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM roy.newsletter_recipients
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_orders` ()   BEGIN
SELECT *
    FROM roy.orders;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_orders_page` (IN `p_page` INT(11), IN `p_amount` INT(11), OUT `p_count_out` INT(11))   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM roy.orders
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM roy.orders
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_order_items` ()   BEGIN
SELECT *
    FROM roy.order_items;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_order_items_page` (IN `p_page` INT(11), IN `p_amount` INT(11), OUT `p_count_out` INT(11))   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM roy.order_items
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM roy.order_items
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_posts` ()   BEGIN
SELECT *
    FROM roy.posts;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_posts_page` (IN `p_page` INT(11), IN `p_amount` INT(11), OUT `p_count_out` INT(11))   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM roy.posts
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM roy.posts
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_products` ()   BEGIN
SELECT *
    FROM roy.products;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_products_page` (IN `p_page` INT(11), IN `p_amount` INT(11), OUT `p_count_out` INT(11))   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM roy.products
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM roy.products
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_product_images` ()   BEGIN
SELECT *
    FROM roy.product_images;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_product_images_by_product_id` (IN `p_product_id` INT)   BEGIN
SELECT *
    FROM roy.product_images
    WHERE product_id = p_product_id
    ORDER BY sort_id ASC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_reviews_page` (IN `p_page` INT(11), IN `p_amount` INT(11), OUT `p_count_out` INT(11))   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM roy.reviews
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM roy.reviews
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_reviews_page_by_product_id` (IN `p_page` INT, IN `p_amount` INT, OUT `p_count_out` INT, IN `p_product_id` INT)   BEGIN

DECLARE page INT DEFAULT 0;

SET page = (p_page - 1) * p_amount;

SELECT * FROM roy.reviews
WHERE product_id = p_product_id
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM roy.reviews
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

SELECT * FROM roy.users
LIMIT p_amount OFFSET page;

SET p_count_out = (
    SELECT COUNT(*) FROM roy.users
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_verified_users` ()   BEGIN
SELECT *
    FROM roy.users
    WHERE account_state = 'verified'
    ORDER BY id ASC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_confirmations_by_user_id` (IN `p_user_id` INT)   BEGIN
SELECT * from roy.confirmations
where confirmations.user_id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_confirmations_by_user_id_and_type` (IN `p_user_id` INT, IN `p_confirmation_type` VARCHAR(255))   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_posts_by_user` (IN `p_user_id` INT)   BEGIN
SELECT *
    FROM posts
    WHERE user_id = p_user_id
    ORDER BY created_at DESC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_post_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.posts
where posts.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_product_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.products
where products.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_product_image_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.product_images
where id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_by_email` (IN `p_email` VARCHAR(255))   BEGIN
SELECT * from roy.users
where users.email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.users
where users.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `received_current_newsletter_true_by_id` (IN `p_id` INT)   BEGIN
	UPDATE roy.newsletter_recipients
    SET received_current_newsletter = '1'
    WHERE id = p_id;
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
    DECLARE v_product_id INT;
    DECLARE v_unit_price DECIMAL(10,2);

    SELECT order_id, product_id, price / quantity
    INTO v_order_id, v_product_id, v_unit_price
    FROM order_items
    WHERE id = p_id;

    UPDATE order_items
    SET quantity = p_new_quantity,
        price = v_unit_price * p_new_quantity
    WHERE id = p_id;

    CALL calculate_order_price(v_order_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_password_by_id` (IN `p_id` INT, IN `p_new_passhash` VARCHAR(255))   BEGIN 
	UPDATE roy.users
    SET passhash = p_new_passhash
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_post_by_id` (IN `p_id` INT, IN `p_body` TEXT, IN `p_image_source` VARCHAR(255), IN `p_title` VARCHAR(255))   BEGIN
   	UPDATE roy.posts
	SET body = p_body, image_source = p_image_source, 	title = p_title
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_product_by_id` (IN `p_id` INT, IN `p_name_de` VARCHAR(255), IN `p_description_en` TEXT, IN `p_price_huf` INT, IN `p_times_ordered` INT, IN `p_stock` INT, IN `p_sale_percentage` DECIMAL(10,0), IN `p_description_preview_en` TEXT, IN `p_name_hu` VARCHAR(255), IN `p_name_en` VARCHAR(255), IN `p_description_hu` TEXT, IN `p_description_de` TEXT, IN `p_description_preview_hu` TEXT, IN `p_description_preview_de` TEXT, IN `p_category` VARCHAR(255), IN `p_manufacturer` VARCHAR(255), IN `p_brand` VARCHAR(255), IN `p_sku` VARCHAR(255), IN `p_active_ingredients` TEXT, IN `p_packaging` VARCHAR(255), IN `p_name` VARCHAR(255), IN `p_thumbnail_url` VARCHAR(255), IN `p_featured` TINYINT)   BEGIN

UPDATE roy.products
SET
    name_de = p_name_de,
    description_en = p_description_en,
    price_huf = p_price_huf,
    times_ordered = p_times_ordered,
    stock = p_stock,
    sale_percentage = p_sale_percentage,
    description_preview_en = p_description_preview_en,
    name_hu = p_name_hu,
    name_en = p_name_en,
    description_hu = p_description_hu,
    description_de = p_description_de,
    description_preview_hu = p_description_preview_hu,
    description_preview_de = p_description_preview_de,
    category = p_category,
    manufacturer = p_manufacturer,
    brand = p_brand,
    sku = p_sku,
    active_ingredients = p_active_ingredients,
    packaging = p_packaging,
    name = p_name,
    thumbnail_url = p_thumbnail_url,
    featured = p_featured
WHERE id = p_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_product_image_sort_by_id` (IN `p_id` INT, IN `p_sort_id` INT)   BEGIN
	UPDATE roy.product_images
    SET sort_id = p_sort_id
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_product_image_url_by_id` (IN `p_id` INT, IN `p_image_url` VARCHAR(255))   BEGIN
	UPDATE roy.product_images
    SET image_url = p_image_url
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_product_stock_by_id` (IN `p_id` INT, IN `p_new_stock` INT)   BEGIN
	UPDATE roy.products
    SET stock = p_new_stock
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_product_times_ordered_by_id` (IN `p_id` INT, IN `p_new_times_ordered` INT)   BEGIN
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
  `user_id` int(11) NOT NULL,
  `new_value` varchar(255) DEFAULT NULL,
  `confirmation_token` varchar(255) NOT NULL,
  `confirmation_token_expire` datetime NOT NULL,
  `confirmation_type` enum('password_change','account_deletion','account_creation') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `confirmations`
--

INSERT INTO `confirmations` (`id`, `user_id`, `new_value`, `confirmation_token`, `confirmation_token_expire`, `confirmation_type`) VALUES
(4, 38, 'test_new_value', 'test_new_confirmation_token', '2026-02-19 21:41:20', 'account_creation');

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

--
-- Dumping data for table `newsletter_recipients`
--

INSERT INTO `newsletter_recipients` (`user_id`, `news_level`, `received_current_newsletter`, `id`) VALUES
(38, 1, 1, 1);

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
  `phone_number` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `created_at`, `price`, `city`, `zipcode`, `address`, `apartment_number`, `note`, `house_number`, `phone_number`) VALUES
(1, 38, '2026-02-13 09:16:58', '1803.00', 'Test_city', '0000', 'address', 0, 'note', 12, '9999');

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

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 1, 2, '1800.00'),
(2, 1, 2, 3, '3.00');

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
  `name` varchar(255) NOT NULL,
  `thumbnail_url` varchar(255) NOT NULL,
  `featured` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name_de`, `description_en`, `price_huf`, `times_ordered`, `stock`, `sale_percentage`, `description_preview_en`, `name_hu`, `name_en`, `description_hu`, `description_de`, `description_preview_hu`, `description_preview_de`, `category`, `manufacturer`, `brand`, `rating`, `sku`, `active_ingredients`, `packaging`, `created_at`, `updated_at`, `name`, `thumbnail_url`, `featured`) VALUES
(1, 'test_name_de', 'test_description_en', 1000, 5, 50, '10', 'test_description_preview_en', 'test_name_hu', 'test_name_en', 'test_description_hu', 'test_description_de', 'test_description_preview_hu', 'test_description_preview_de', 'test_category', 'test_manufacturer', 'test_brand', 2.90, 'test_sku', 'test_active_ingredients', 'test_packaging', '2026-02-10 09:37:40', '2026-02-13 09:44:43', 'test_name', 'test_thumbnail_url', 1),
(2, 'name_de', 'product1_en', 1, 0, 10, '0', 'description_preview_en', 'name_hu', 'name_en', 'product1_hu', 'product1_de', 'description_preview_hu', 'description_preview_en', 'category', 'manufacturer', 'brand', 2.00, 'sku', 'active_ingredient', 'valami', '2026-02-10 09:37:40', '2026-02-11 10:48:06', 'product1', '', 0);

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

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `alt_text_de`, `alt_text_hu`, `alt_text_en`, `image_url`, `product_id`, `sort_id`) VALUES
(1, 'altde', 'althu', 'alten', 'test_url', 1, 3),
(2, 'alt_text_de', 'alt_text_hu', 'alt_text_en', 'image_url', 1, 1);

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
(38, '0test@gmail.com', '2026-02-10 09:39:40', 'friMJMAGQgfFKAwlcREtoa', 'D8sOKkFGFGDyq3Y11oRgOKzLJD+F0RcMauZTcYYsx0c=', '2026-02-17 09:39:40', 'Berg', 'Mc0', 'unverified'),
(39, '1test@gmail.com', '2026-02-10 09:39:40', 'WMHWxRlhJIhqaqWEshZjnK', 'aU8GLJRZi8O2AlMPf7/NbMO4Wi2OAP1tTQQeEMJxFKU=', '2026-02-17 09:39:40', 'Berg', 'Mc1', 'unverified'),
(40, '2test@gmail.com', '2026-02-10 09:39:40', 'pwRsIQujHDWQaHgEedwtuG', 'ofUDksnla1w2MUXNuhdFTagKytfMAA/TeCDS8X/AAG4=', '2026-02-17 09:39:40', 'Berg', 'Mc2', 'unverified'),
(41, '3test@gmail.com', '2026-02-10 09:39:40', 'pwRsIQujHDWQaHgEedwtuG', 'NLMDlqiqd6aTgq5gfTk4NH3fL4itvFLycXIRvlavXzs=', '2026-02-17 09:39:40', 'Berg', 'Mc3', 'unverified'),
(42, '4test@gmail.com', '2026-02-10 09:39:40', 'HgbOUPDkGxLpaYqEQYSDAC', 'QEloqA0im9fq7vDG+KsG/G9EDTTmeWnhsTLejphFxgs=', '2026-02-17 09:39:40', 'Berg', 'Mc4', 'unverified'),
(43, '5test@gmail.com', '2026-02-10 09:39:40', 'zBAYIVoMzZOaqOQXgontAl', 'D3rfr69Zyi12gShMhOtLxq3+7iYGIJrXv9c/ogWKoxs=', '2026-02-17 09:39:40', 'Berg', 'Mc5', 'unverified'),
(44, '6test@gmail.com', '2026-02-10 09:39:40', 'SlJuUUxNyUDAqebWRkKDGh', 'vXqdsjwBBmo+a6EFTmGGQ1kNabEkuHke3kpqkRkHJ1k=', '2026-02-17 09:39:40', 'Berg', 'Mc6', 'unverified'),
(45, '7test@gmail.com', '2026-02-10 09:39:40', 'JGjEIajoqvFlGUBphAftGR', 'gcPQxE8/tVzEkb9CD57CthsMKmMl2+rCGSOopiz7H0I=', '2026-02-17 09:39:40', 'Berg', 'Mc7', 'unverified'),
(46, '8test@gmail.com', '2026-02-10 09:39:40', 'JGjEIajoqvFlGUBphAftGR', 'bGJ5I4fpsXKyeY+jKFbwsd0SET7hEwo5IFSSvfGwHJQ=', '2026-02-17 09:39:40', 'Berg', 'Mc8', 'unverified'),
(47, '9test@gmail.com', '2026-02-10 09:39:40', 'cqsaUZsqpquKGlLpTvBENN', 'pRBkeZbdTINu1K85rJMMmEt/GK94Diqhaqw/vwbBzNU=', '2026-02-17 09:39:40', 'Berg', 'Mc9', 'unverified'),
(48, '10test@gmail.com', '2026-02-10 09:39:40', 'uaCvfYAroljkGCWpFrYOTJ', 'sDWvnhGPFPDvUtpJOgAT++KjcErP/RjhiFiAvtugv/0=', '2026-02-17 09:39:40', 'Berg', 'Mc10', 'unverified'),
(49, '11test@gmail.com', '2026-02-10 09:39:40', 'mvbGTemShNmVWswIVHtETs', 'LF0Gp8IN1+MM95BtHFQ3AVLog+2n8S7Z7c9qPtiVXD8=', '2026-02-17 09:39:40', 'Berg', 'Mc11', 'unverified'),
(50, '12test@gmail.com', '2026-02-10 09:39:40', 'mvbGTemShNmVWswIVHtETs', '/OKh7OI8un0HzJsOkxlfnk3D/Ln5J/ymJ1GgFpI1Jzs=', '2026-02-17 09:39:40', 'Berg', 'Mc12', 'unverified'),
(51, '13test@gmail.com', '2026-02-10 09:39:40', 'FfkbfdvUgHbuWJGHGDQOZo', 'iLb2qfCCi80rHTBuVQPmL6F4lWnrl8p6F7UpijQcyPg=', '2026-02-17 09:39:40', 'Berg', 'Mc13', 'unverified'),
(52, '14test@gmail.com', '2026-02-10 09:39:40', 'XPuxrcDVfCQUWZQHsymYgl', 'kH6mHjvkxwdQG5d4yqv+c7gyRZTO4uluqnITiMRxDeA=', '2026-02-17 09:39:40', 'Berg', 'Mc14', 'unverified'),
(53, '15test@gmail.com', '2026-02-10 09:39:40', 'PkTHfhpxXeTFmPqaIOHOgU', 'EWYcKfP6HxwcPD2Xx13TEP66626fzmlmxKsVsopg1Tg=', '2026-02-17 09:39:40', 'Berg', 'Mc15', 'unverified'),
(54, '16test@gmail.com', '2026-02-10 09:39:40', 'hUddqhyyWZHemgBauKeYmQ', 'UztddA9+0GzyzWhyzAA61ZGg/PaPv9P197nlUW70ieA=', '2026-02-17 09:39:40', 'Berg', 'Mc16', 'unverified'),
(55, '17test@gmail.com', '2026-02-10 09:39:40', 'hUddqhyyWZHemgBauKeYmQ', 'phE7LiB3r+Fs7pRCbLt3Mc6nIQK7Ffo7kl8IzfDVR+E=', '2026-02-17 09:39:40', 'Berg', 'Mc17', 'unverified'),
(56, '18test@gmail.com', '2026-02-10 09:39:40', 'ZpCnfmjZOAKPDWbtKazOmz', 'nh6KQpjHIlkzUDZgz0qI960dXeVuA1Dozp9C5FigLi4=', '2026-02-17 09:39:40', 'Berg', 'Mc18', 'unverified'),
(57, '19test@gmail.com', '2026-02-10 09:39:40', 'rZMJqlsbNvzpDnlsvVVYsw', 'vtvL7CkKn80zf2AIaideN3eSC1zF8KY3bxuLI2Gtd+w=', '2026-02-17 09:39:40', 'Berg', 'Mc19', 'unverified'),
(58, '20test@gmail.com', '2026-02-10 09:39:40', 'KKVfCkBcMqoODEvshRsjzs', 'iKHLhQBaNKP8to7on4qgx/Kv1WkpHXTQYScXU3lI50o=', '2026-02-17 09:39:40', 'Berg', 'Mc20', 'unverified'),
(59, '21test@gmail.com', '2026-02-10 09:39:40', 'CeupqqmDFRrzTtVLxhNZyb', 'SXfjAghxWSb/raupHYdPvlCsWeXswsQdAlMeHZN3MXY=', '2026-02-17 09:39:40', 'Berg', 'Mc21', 'unverified'),
(60, '22test@gmail.com', '2026-02-10 09:39:40', 'UPELCpvFEMgZTKgLjdjjFX', 'ojrrCXDIT22+jjD6kxHhDINN1U8tk8yWmcWJZeYeDuw=', '2026-02-17 09:39:40', 'Berg', 'Mc22', 'unverified'),
(61, '23test@gmail.com', '2026-02-10 09:39:40', 'UPELCpvFEMgZTKgLjdjjFX', 'kFCPy2GeCs1sectKG6z2FmIZlLpVvB/sKA1+rbvIvlo=', '2026-02-17 09:39:40', 'Berg', 'Mc23', 'unverified'),
(62, '24test@gmail.com', '2026-02-10 09:39:40', 'nzNgNoEGDHVyTbqKUYGtMT', 'EvLmZdNzVceffVAS60pIAn2H1HnU47VpRTreW04ZXAI=', '2026-02-17 09:39:40', 'Berg', 'Mc24', 'unverified'),
(63, '25test@gmail.com', '2026-02-10 09:39:40', 'eTnrBuphvjXjjRQdkobjLD', 'CPoKaw5u9OM21A09nVnleoomXxRSegplD6pfEaesJxQ=', '2026-02-17 09:39:40', 'Berg', 'Mc25', 'unverified'),
(64, '26test@gmail.com', '2026-02-10 09:39:40', 'xEwMNtyjueMJjiadWkytSz', 'ZCOnLANSiRGbII7xypKmc+ykgdsqRYKP9MeW7RNnM84=', '2026-02-17 09:39:40', 'Berg', 'Mc26', 'unverified'),
(65, '27test@gmail.com', '2026-02-10 09:39:40', 'pYVXByjKnFPuzYAwmATjRi', 'wuk/MrTPeWQuiyMaEwSAEesrZI7isvBrWBRA8r5jRJo=', '2026-02-17 09:39:40', 'Berg', 'Mc27', 'unverified'),
(66, '28test@gmail.com', '2026-02-10 09:39:40', 'pYVXByjKnFPuzYAwmATjRi', 'n7wVFYMIkPdmghMYFmOEaZD28i4ACdSSKSG9A2d0nXI=', '2026-02-17 09:39:40', 'Berg', 'Mc28', 'unverified'),
(67, '29test@gmail.com', '2026-02-10 09:39:40', 'HJfsNysMmAETzoLwYvptYe', '7K2T1sy/0UEnlXUc5RKwnxvApu/Pv/OFRwavBrsid5Q=', '2026-02-17 09:39:40', 'Berg', 'Mc29', 'unverified'),
(68, '30test@gmail.com', '2026-02-10 09:39:40', 'atoOYxBNlvttzFVvJrMDfa', '2+oUXh8mNGOdFTYR/mtBKfIVQwDBPawSyO8yhTmPl/M=', '2026-02-17 09:39:40', 'Berg', 'Mc30', 'unverified'),
(69, '31test@gmail.com', '2026-02-10 09:39:40', 'ROOYNCnodWvePvvPZHhteK', 'mnIHj46fZmPoeEdSCmPqwZIOskat0UaqZiWuxoLH6mU=', '2026-02-17 09:39:40', 'Berg', 'Mc31', 'unverified'),
(70, '32test@gmail.com', '2026-02-10 09:39:40', 'ROOYNCnodWvePvvPZHhteK', 'aGnLYadNZXU73keC2+WPlfdp3dPUw6SGLUaiB2uaBz8=', '2026-02-17 09:39:40', 'Berg', 'Mc32', 'unverified');

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`);

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
  ADD KEY `fk_reviews_product` (`product_id`),
  ADD KEY `fk_reviews_user` (`user_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `newsletter_recipients`
--
ALTER TABLE `newsletter_recipients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

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
  ADD CONSTRAINT `fk_newsletter_recipients_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_newsletter_recipients_user_complete` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `fk_posts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_posts_user_complete` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `fk_product_images_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_reviews_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reviews_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
