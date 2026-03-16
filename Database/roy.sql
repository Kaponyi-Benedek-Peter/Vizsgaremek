-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Gép: localhost:8889
-- Létrehozás ideje: 2026. Már 16. 09:50
-- Kiszolgáló verziója: 5.7.24
-- PHP verzió: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `roy`
--

DELIMITER $$
--
-- Eljárások
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `calculate_product_category_number_of_products` ()   BEGIN

    UPDATE roy.product_categories pc
    SET number_of_products = (
        SELECT COUNT(*)
        FROM roy.products p
        WHERE p.category_id = pc.id
    );

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_account` (IN `p_first_name` VARCHAR(16), IN `p_last_name` VARCHAR(16), IN `p_email` VARCHAR(255), IN `p_sesstoken` VARCHAR(255), IN `p_passhash` VARCHAR(255), IN `p_account_state` VARCHAR(11))   BEGIN
    INSERT INTO roy.users (first_name, last_name, email, sesstoken, passhash, sesstoken_expire , account_state)
    VALUES (p_first_name, p_last_name, p_email, p_sesstoken, p_passhash, NOW() + INTERVAL 1 week, p_account_state);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_confirmation` (IN `p_confirmation_token` VARCHAR(255), IN `p_user_id` INT, IN `p_new_value` VARCHAR(255), IN `p_type` VARCHAR(255))   BEGIN
    INSERT INTO roy.confirmations (confirmation_token, confirmation_token_expire, user_id, new_value, confirmation_type)
    VALUES (p_confirmation_token, NOW() + INTERVAL 1 WEEK, p_user_id, p_new_value, p_type);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_newsletter_recipient` (IN `p_news_level` INT, IN `p_email` VARCHAR(255), IN `p_name` VARCHAR(255))   BEGIN
INSERT INTO roy.newsletter_recipients (news_level, email, name, received_current_newsletter)
VALUES (p_news_level, p_email, '0');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_order` (IN `p_user_id` INT, IN `p_city` VARCHAR(255), IN `p_zipcode` VARCHAR(10), IN `p_address` VARCHAR(255), IN `p_apartment_number` INT(11), IN `p_note` VARCHAR(255), IN `p_house_number` INT, IN `p_phone_number` VARCHAR(20))   BEGIN

INSERT INTO roy.orders (user_id, created_at, price, city, zipcode, address, apartment_number, note, house_number, phone_number)
VALUES(p_user_id, NOW(),'0', p_city, p_zipcode, p_address, p_apartment_number, p_note, p_house_number, p_phone_number);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_order_item` (IN `p_order_id` INT, IN `p_product_id` INT, IN `p_quantity` INT)   BEGIN
    DECLARE v_unit_price      DECIMAL(10,2);
    DECLARE v_name_hu         VARCHAR(255);
    DECLARE v_name_en         VARCHAR(255);
    DECLARE v_name_de         VARCHAR(255);
    DECLARE v_thumbnail_url   VARCHAR(255);
    DECLARE v_sku             VARCHAR(255);

    -- Termék adatok lekérése a rendelés pillanatában
    SELECT
        price_huf,
        name_hu,
        name_en,
        name_de,
        thumbnail_url,
        sku
    INTO
        v_unit_price,
        v_name_hu,
        v_name_en,
        v_name_de,
        v_thumbnail_url,
        v_sku
    FROM roy.products
    WHERE id = p_product_id;

    INSERT INTO roy.order_items (
        order_id,
        product_id,
        quantity,
        price,
        unit_price,
        product_name_hu,
        product_name_en,
        product_name_de,
        thumbnail_url,
        sku
    )
    VALUES (
        p_order_id,
        p_product_id,
        p_quantity,
        v_unit_price * p_quantity,  -- végösszeg
        v_unit_price,               -- egységár snapshot
        v_name_hu,
        v_name_en,
        v_name_de,
        v_thumbnail_url,
        v_sku
    );

    -- Rendelés végösszegének frissítése
    CALL calculate_order_price(p_order_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_post` (IN `p_title` VARCHAR(255), IN `p_content` TEXT, IN `p_user_id` INT, IN `p_image_url` VARCHAR(255), IN `p_category_id` INT, IN `p_slug` VARCHAR(255), IN `p_excerpt` TEXT, IN `p_status` ENUM('draft','published','archived','hidden'), IN `p_is_featured` TINYINT(1), IN `p_tags` TEXT)   BEGIN
    INSERT INTO roy.posts (
        title, content, user_id, image_url, category_id,
        slug, excerpt, status, is_featured, tags,
        created_at, published_at, last_activity_at
    )
    VALUES (
        p_title, p_content, p_user_id, p_image_url, p_category_id,
        p_slug, p_excerpt, p_status, p_is_featured, p_tags,
        NOW(),
        IF(p_status = 'published', NOW(), NULL),
        NOW()
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_post_comment_by_comment_id` (IN `p_post_id` INT, IN `p_user_id` INT, IN `p_content` TEXT)   BEGIN
    INSERT INTO roy.post_comments (post_id, user_id, content, created_at)
    VALUES (p_post_id, p_user_id, p_content, NOW());

    UPDATE roy.posts
    SET
        comment_count = comment_count + 1,
        last_activity_at = NOW()
    WHERE id = p_post_id;

    SELECT LAST_INSERT_ID() AS id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_product` (IN `p_name_de` VARCHAR(255), IN `p_description_en` TEXT, IN `p_price_huf` DECIMAL(11,0), IN `p_times_ordered` INT, IN `p_stock` INT, IN `p_sale_percentage` DECIMAL(10,0), IN `p_description_preview_en` TEXT, IN `p_name_hu` VARCHAR(255), IN `p_name_en` VARCHAR(255), IN `p_description_hu` TEXT, IN `p_description_de` TEXT, IN `p_description_preview_hu` TEXT, IN `p_description_preview_de` TEXT, IN `p_category_id` INT(255), IN `p_manufacturer` VARCHAR(255), IN `p_brand` VARCHAR(255), IN `p_rating` DOUBLE, IN `p_sku` VARCHAR(255), IN `p_active_ingredients` TEXT, IN `p_packaging_en` VARCHAR(255), IN `p_packaging_hu` VARCHAR(255), IN `p_packaging_de` VARCHAR(255), IN `p_thumbnail_url` VARCHAR(255), IN `p_featured` TINYINT)   BEGIN

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
    category_id,
    manufacturer,
    brand,
    rating,
    sku,
    active_ingredients,
    packaging_en,
	packaging_hu,
	packaging_de,
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
    p_category_id,
    p_manufacturer,
    p_brand,
    '0',
    p_sku,
    p_active_ingredients,
    p_packaging_en,
	p_packaging_hu,
	p_packaging_de,
    NOW(),
    p_thumbnail_url,
    p_featured
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_product_category` (IN `p_category_en` VARCHAR(255), IN `p_category_de` VARCHAR(255), IN `p_category_hu` VARCHAR(255), IN `p_emoji` VARCHAR(255), IN `p_color` VARCHAR(255))   BEGIN
    INSERT INTO roy.product_categories (category_en, category_hu, category_de, emoji, color, number_of_products)
    VALUES (p_category_en,p_category_hu,p_category_de, p_emoji, p_color, 0);
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_post_comments` ()   BEGIN
    DELETE FROM roy.post_comments;

    UPDATE roy.posts SET comment_count = 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_all_post_comments_by_post_id` (IN `p_post_id` INT)   BEGIN
    DELETE FROM roy.post_comments WHERE post_id = p_post_id;

    UPDATE roy.posts
    SET comment_count = 0
    WHERE id = p_post_id;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_confirmations_by_user_id` (IN `p_user_id` INT)   BEGIN
    DELETE FROM roy.confirmations WHERE user_id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_confirmations_by_user_id_and_type` (IN `p_user_id` INT, IN `p_confirmation_type` VARCHAR(255))   BEGIN
DELETE from roy.confirmations
where confirmations.user_id = p_user_id AND confirmations.confirmation_type = p_confirmation_type;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_confirmation_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.confirmations WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_expired_confirmations` ()   BEGIN
DELETE FROM roy.confirmations
    WHERE confirmation_token_expire < NOW();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_newsletter_recipient_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.newsletter_recipients WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_order_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.orders WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_order_by_tracking_token` (IN `p_tracking` VARCHAR(255), IN `p_token` VARCHAR(255))   BEGIN
    DELETE FROM roy.orders
    WHERE tracking = p_tracking
      AND token    = p_token;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_order_item_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.order_items WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_post_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.posts WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_post_comment_by_comment_id` (IN `p_id` INT)   BEGIN
    DECLARE v_post_id INT;

    SELECT post_id INTO v_post_id
    FROM roy.post_comments
    WHERE id = p_id;

    DELETE FROM roy.post_comments WHERE id = p_id;

    UPDATE roy.posts
    SET comment_count = GREATEST(comment_count - 1, 0)
    WHERE id = v_post_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_post_comment_by_post_id` (IN `p_post_id` INT)   BEGIN
    DELETE FROM roy.posts WHERE post_id = p_post_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_product_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.products WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_product_category_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.product_categories WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_product_image_by_id` (IN `p_id` INT)   BEGIN
    DELETE FROM roy.product_images WHERE id = p_id;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_admins` ()   BEGIN
SELECT *
    FROM roy.users
    WHERE account_state = 'admin'
    ORDER BY id ASC;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_order_by_user_id` (IN `p_user_id` INT)   BEGIN
SELECT *
FROM orders
    WHERE orders.user_id = p_user_id
    ORDER BY orders.id ASC;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_posts` (IN `p_category_id` VARCHAR(20), IN `p_status` VARCHAR(20))   BEGIN
    IF p_status IS NULL OR p_status = '' THEN
        SELECT * FROM roy.posts
        WHERE (
            p_category_id IS NULL 
            OR p_category_id = '' 
            OR category_id = CAST(p_category_id AS UNSIGNED)
        )
        ORDER BY created_at DESC;
    ELSE
        SELECT * FROM roy.posts
        WHERE (
            p_category_id IS NULL 
            OR p_category_id = '' 
            OR category_id = CAST(p_category_id AS UNSIGNED)
        )
        AND status = p_status
        ORDER BY created_at DESC;
    END IF;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_product_categories` ()   BEGIN
SELECT *
    FROM roy.product_categories;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_newsletter_recipient_name_by_email` (IN `p_email` VARCHAR(255))   BEGIN
    SELECT name
    FROM roy.newsletter_recipients
    WHERE email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_order_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.orders
where orders.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_order_by_tracking_token` (IN `p_tracking` VARCHAR(255), IN `p_token` VARCHAR(255))   BEGIN
    SELECT *
    FROM roy.orders
    WHERE tracking = p_tracking
      AND token    = p_token
    LIMIT 1;
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
    SELECT * FROM roy.posts
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_post_by_slug` (IN `p_slug` VARCHAR(255))   BEGIN
    SELECT * FROM roy.posts
    WHERE slug = p_slug;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_products_by_category_id` (IN `p_category_id` INT)   BEGIN
    SELECT *
    FROM roy.products
    WHERE category_id = p_category_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_products_by_category_id_page` (IN `p_category_id` INT, IN `p_page` INT, IN `p_amount` INT, OUT `p_count_out` INT)   BEGIN

    DECLARE page INT DEFAULT 0;

    SET page = (p_page - 1) * p_amount;

    SELECT *
    FROM roy.products
    WHERE category_id = p_category_id
    LIMIT p_amount OFFSET page;

    SET p_count_out = (
        SELECT COUNT(*)
        FROM roy.products
        WHERE category_id = p_category_id
    );

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_product_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.products
where products.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_product_category_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.product_categories
where id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_product_image_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.product_images
where id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_review_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.reviews
where reviews.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_by_email` (IN `p_email` VARCHAR(255))   BEGIN
SELECT * from roy.users
where users.email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_by_id` (IN `p_id` INT)   BEGIN
SELECT * from roy.users
where users.id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `increment_post_view_by_id` (IN `p_id` INT)   BEGIN
    UPDATE roy.posts
    SET views = views + 1
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modify_order_by_tracking_token` (IN `p_tracking` VARCHAR(255), IN `p_token` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_billing_name` VARCHAR(255), IN `p_shipping_name` VARCHAR(255), IN `p_order_status` ENUM('pending','processing','shipped','delivered','cancelled'), IN `p_shipping_company` VARCHAR(255), IN `p_confirmed` TINYINT(1), IN `p_confirmed_at` DATETIME)   BEGIN
    UPDATE roy.orders
    SET
        email            = p_email,
        billing_name     = p_billing_name,
        shipping_name    = p_shipping_name,
        order_status     = p_order_status,
        shipping_company = p_shipping_company,
        confirmed        = p_confirmed,
        confirmed_at     = p_confirmed_at
    WHERE tracking = p_tracking
      AND token    = p_token;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `received_current_newsletter_false_all` ()   BEGIN
    UPDATE roy.newsletter_recipients
    SET received_current_newsletter = '0';
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_post_by_id` (IN `p_id` INT, IN `p_title` VARCHAR(255), IN `p_content` TEXT, IN `p_image_url` VARCHAR(255), IN `p_category_id` INT, IN `p_slug` VARCHAR(255), IN `p_excerpt` TEXT, IN `p_status` ENUM('draft','published','archived','hidden'), IN `p_is_featured` TINYINT(1), IN `p_tags` TEXT)   BEGIN
    UPDATE roy.posts
    SET
        title = p_title,
        content = p_content,
        image_url = p_image_url,
        category_id = p_category_id,
        slug = p_slug,
        excerpt = p_excerpt,
        status = p_status,
        is_featured = p_is_featured,
        tags = p_tags,
        published_at = CASE
            WHEN p_status = 'published' AND published_at IS NULL THEN NOW()
            ELSE published_at
        END
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_post_comment_by_post_id` (IN `p_id` INT, IN `p_content` TEXT)   BEGIN
    UPDATE roy.post_comments
    SET
        content = p_content,
        is_edited = 1
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_product_by_id` (IN `p_id` INT, IN `p_name_de` VARCHAR(255), IN `p_description_en` TEXT, IN `p_price_huf` INT, IN `p_times_ordered` INT, IN `p_stock` INT, IN `p_sale_percentage` DECIMAL(10,0), IN `p_description_preview_en` TEXT, IN `p_name_hu` VARCHAR(255), IN `p_name_en` VARCHAR(255), IN `p_description_hu` TEXT, IN `p_description_de` TEXT, IN `p_description_preview_hu` TEXT, IN `p_description_preview_de` TEXT, IN `p_category_id` INT, IN `p_manufacturer` VARCHAR(255), IN `p_brand` VARCHAR(255), IN `p_sku` VARCHAR(255), IN `p_active_ingredients` TEXT, IN `p_packaging_en` VARCHAR(255), IN `p_packaging_hu` VARCHAR(255), IN `p_packaging_de` VARCHAR(255), IN `p_thumbnail_url` VARCHAR(255), IN `p_featured` TINYINT)   BEGIN

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
    category_id = p_category_id,
    manufacturer = p_manufacturer,
    brand = p_brand,
    sku = p_sku,
    active_ingredients = p_active_ingredients,
    packaging_en = p_packaging_en,
	packaging_hu = p_packaging_hu,
	packaging_de = p_packaging_de,
    thumbnail_url = p_thumbnail_url,
    featured = p_featured
WHERE id = p_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_product_category_by_id` (IN `p_id` INT, IN `p_category_en` VARCHAR(255), IN `p_category_hu` INT, IN `p_category_de` VARCHAR(255), IN `p_color` VARCHAR(255), IN `p_emoji` VARCHAR(255))   BEGIN
	UPDATE roy.product_categories
    SET category_en = p_category_en,
    category_hu = p_category_hu,
    category_de = p_category_de,
    color = p_color,
    emoji = p_emoji
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
-- Tábla szerkezet ehhez a táblához `confirmations`
--

CREATE TABLE `confirmations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `new_value` varchar(255) DEFAULT NULL,
  `confirmation_token` varchar(255) NOT NULL,
  `confirmation_token_expire` datetime NOT NULL,
  `confirmation_type` enum('password_change','account_deletion','account_creation','login') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `newsletter_recipients`
--

CREATE TABLE `newsletter_recipients` (
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `news_level` int(11) NOT NULL,
  `received_current_newsletter` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `newsletter_recipients`
--

INSERT INTO `newsletter_recipients` (`email`, `name`, `news_level`, `received_current_newsletter`, `id`) VALUES
('38', '', 1, 0, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `billing_name` varchar(255) DEFAULT NULL,
  `shipping_name` varchar(255) DEFAULT NULL,
  `tracking` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `guest` tinyint(1) NOT NULL DEFAULT '0',
  `order_status` enum('pending','processing','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  `shipping_company` varchar(255) DEFAULT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `confirmed_at` datetime DEFAULT NULL,
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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `product_name_hu` varchar(255) DEFAULT NULL,
  `product_name_en` varchar(255) DEFAULT NULL,
  `product_name_de` varchar(255) DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_url` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `slug` varchar(255) NOT NULL DEFAULT '',
  `excerpt` text,
  `status` enum('draft','published','archived','hidden') NOT NULL DEFAULT 'draft',
  `views` int(11) NOT NULL DEFAULT '0',
  `likes` int(11) NOT NULL DEFAULT '0',
  `comment_count` int(11) NOT NULL DEFAULT '0',
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `published_at` datetime DEFAULT NULL,
  `last_activity_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tags` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `user_id`, `created_at`, `image_url`, `category_id`, `updated_at`, `slug`, `excerpt`, `status`, `views`, `likes`, `comment_count`, `is_featured`, `published_at`, `last_activity_at`, `tags`) VALUES
(2, 'reg', 'reg', 77, '2026-03-10 12:42:58', 'rg', 1, '2026-03-10 13:05:37', 'reg', 'erg', 'hidden', 0, 0, 0, 0, NULL, '2026-03-10 13:42:58', 'reg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `post_categories`
--

CREATE TABLE `post_categories` (
  `id` int(11) NOT NULL,
  `name_hu` varchar(255) NOT NULL,
  `name_de` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `emoji` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `post_categories`
--

INSERT INTO `post_categories` (`id`, `name_hu`, `name_de`, `name_en`, `color`, `emoji`) VALUES
(1, 'hasd', 'dasd', 'easd', 'red', ':)');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `post_comments`
--

CREATE TABLE `post_comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `likes` int(11) NOT NULL DEFAULT '0',
  `is_edited` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
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
  `category_id` int(11) NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `rating` double(3,2) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `active_ingredients` text NOT NULL,
  `packaging_en` varchar(255) NOT NULL DEFAULT '',
  `packaging_hu` varchar(255) NOT NULL DEFAULT '',
  `packaging_de` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `thumbnail_url` varchar(255) NOT NULL,
  `featured` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `name_de`, `description_en`, `price_huf`, `times_ordered`, `stock`, `sale_percentage`, `description_preview_en`, `name_hu`, `name_en`, `description_hu`, `description_de`, `description_preview_hu`, `description_preview_de`, `category_id`, `manufacturer`, `brand`, `rating`, `sku`, `active_ingredients`, `packaging_en`, `packaging_hu`, `packaging_de`, `created_at`, `updated_at`, `thumbnail_url`, `featured`) VALUES
(1, 'Aspirin 500mg Filmtabletten', 'Aspirin 500mg provides effective relief for mild to moderate pain, including headaches, toothache, back pain and muscle pain. Its anti-inflammatory and antipyretic properties offer fast relief from discomfort. The film coating makes the tablet easier to swallow and protects the stomach. Suitable for adults and adolescents over 16 years. Take with or after food with plenty of water.', 1490, 128, 250, '0', 'Effective pain relief for headaches, toothache and muscle pain. Fast-acting, easy-to-swallow film-coated tablet.', 'Aspirin 500mg filmtabletta', 'Aspirin 500mg Film-coated Tablets', 'Az Aspirin 500mg hatásos segítség enyhe és közepes erősségű fájdalmak esetén, mint a fejfájás, fogfájás, hátfájás és izomfájdalom. Gyulladáscsökkentő és lázcsillapító hatása révén rövid idő alatt enyhíti a kellemetlen tüneteket. A filmtabletta bevonata megkönnyíti a lenyelést és védi a gyomrot. Felnőttek és 16 éven felüli fiatalok szedhetik. Étkezés közben vagy után célszerű bevenni, és bőséges folyadékkal lenyelni.', 'Aspirin 500mg bietet wirksame Linderung bei leichten bis mittelschweren Schmerzen, einschließlich Kopfschmerzen, Zahnschmerzen, Rückenschmerzen und Muskelschmerzen. Dank seiner entzündungshemmenden und fiebersenkenden Eigenschaften lindert es Beschwerden schnell. Die Filmhülle erleichtert das Schlucken und schützt den Magen. Geeignet für Erwachsene und Jugendliche über 16 Jahre. Mit oder nach einer Mahlzeit mit reichlich Wasser einnehmen.', 'Hatásos fájdalomcsillapító fejfájásra, fogfájásra és izomfájdalomra. Gyorsan hat, könnyen nyelhető filmtabletta.', 'Wirksames Schmerzmittel bei Kopfschmerzen, Zahnschmerzen und Muskelschmerzen. Schnell wirkende, leicht schluckbare Filmtablette.', 1, 'Bayer AG', 'Aspirin', 4.60, 'ASP-500-20T', 'Acetylsalicylsäure 500 mg', '20 film-coated tablets', '20 filmtabletta', '20 Filmtabletten', '2026-02-26 18:03:29', '2026-03-13 10:03:58', '/assets/products/aspirin-500-thumb.jpg', 1),
(2, 'Omega-3 Fischöl 1000mg Kapseln', 'Omega-3 fish oil capsules contain high-quality EPA and DHA fatty acids, which contribute to normal heart function, maintenance of normal blood triglyceride levels, and support for brain and vision health. The capsules feature a special coating to reduce fishy aftertaste. Take 1–2 capsules daily to ensure adequate Omega-3 intake. An ideal supplement for those who consume little oily fish.', 3890, 87, 180, '10', 'Premium Omega-3 source for heart, brain and vision health. Specially coated, odour-reduced capsule.', 'Omega-3 Halolaj 1000mg kapszula', 'Omega-3 Fish Oil 1000mg Capsules', 'Az Omega-3 halolaj kapszulák kiváló minőségű EPA és DHA zsírsavakat tartalmaznak, amelyek hozzájárulnak a szív- és érrendszer egészségéhez, a normális vérzsírszint fenntartásához, valamint az agy és a látás megfelelő működéséhez. A kapszulák halolaj szagát speciális bevonat csökkenti. Napi 1–2 kapszula bevételével gondoskodhat a szükséges Omega-3 bevitelről. Ideális kiegészítés azok számára, akik kevés tengeri halat fogyasztanak.', 'Omega-3 Fischölkapseln enthalten hochwertige EPA- und DHA-Fettsäuren, die zu einer normalen Herzfunktion, zur Aufrechterhaltung eines normalen Triglyceridspiegels im Blut sowie zur Unterstützung der Gehirn- und Sehfunktion beitragen. Die Kapseln haben eine spezielle Beschichtung, um den Fischgeschmack zu reduzieren. Nehmen Sie täglich 1–2 Kapseln ein. Ideal als Ergänzung für Personen, die wenig Fettfisch essen.', 'Prémium Omega-3 forrás szív-, agy- és látásegészségért. Speciálisan bevont, szagmentes kapszula.', 'Premium Omega-3 Quelle für Herz-, Gehirn- und Sehgesundheit. Speziell beschichtete, geruchsarme Kapsel.', 2, 'Nordic Naturals', 'Nordic Naturals', 4.80, 'OMG3-1000-60C', 'EPA (Eicosapentaenoic acid) 180mg, DHA (Docosahexaenoic acid) 120mg', '60 capsules', '60 kapszula', '60 Kapseln', '2026-02-26 18:03:29', '2026-03-13 10:04:06', '/assets/products/omega3-1000-thumb.jpg', 1),
(3, 'Magnesium + Vitamin B6 Tabletten', 'Magnesium is essential for normal muscle and nerve function, reduces tiredness and fatigue, and helps maintain electrolyte balance. Vitamin B6 enhances magnesium absorption and supports healthy immune function. Particularly recommended for athletes, people under stress, and pregnant women. Take 2 tablets daily to ensure adequate magnesium intake.', 2290, 56, 320, '0', 'Magnesium and Vitamin B6 combination for nerves and muscles. Reduces fatigue and improves magnesium absorption.', 'Magnézium + B6-vitamin tabletta', 'Magnesium + Vitamin B6 Tablets', 'A magnézium elengedhetetlen az izmok és az idegrendszer normális működéséhez, csökkenti a fáradtságot és a kimerültséget, és hozzájárul az elektrolit-egyensúly fenntartásához. A B6-vitamin segíti a magnézium felszívódását, és támogatja az immunrendszer egészséges működését. Különösen ajánlott sportoló, stresszes életmódot folytató, illetve terhes nők számára. Napi 2 tabletta bevételével biztosíthatja a szükséges magnéziumbevitelt.', 'Magnesium ist für die normale Muskel- und Nervenfunktion unerlässlich, verringert Müdigkeit und Erschöpfung und hilft, das Elektrolytgleichgewicht aufrechtzuerhalten. Vitamin B6 verbessert die Magnesiumabsorption und unterstützt eine gesunde Immunfunktion. Besonders empfohlen für Sportler, Personen unter Stress und Schwangere. Nehmen Sie täglich 2 Tabletten ein.', 'Magnézium és B6-vitamin kombinációja az ideg- és izomrendszerért. Csökkenti a fáradtságot, javítja a magnézium felszívódását.', 'Magnesium und Vitamin B6 Kombination für Nerven und Muskeln. Reduziert Müdigkeit und verbessert die Magnesiumabsorption.', 2, 'Solgar', 'Solgar', 4.70, 'MGVB6-400-60T', 'Magnesium (as magnesium oxide) 400mg, Vitamin B6 (pyridoxine HCl) 10mg', '60 tablets', '60 tabletta', '60 Tabletten', '2026-02-26 18:03:29', '2026-03-13 10:04:11', '/assets/products/magnesium-b6-thumb.jpg', 0),
(4, 'Cetirizin 10mg Tabletten (Allergie)', 'Cetirizine 10mg is an effective, non-drowsy antihistamine used to treat allergic rhinitis, hay fever, urticaria (hives) and other allergic symptoms. A single daily dose is sufficient to relieve symptoms for 24 hours. The product acts quickly, with improvement typically noticed within 1 hour. Suitable for adults and children over 6 years. Can be taken with or without food. Once-daily dosing allows convenient long-term treatment.', 1890, 203, 150, '15', 'Effective, non-drowsy antihistamine for allergic rhinitis and hay fever. Once-daily dose provides 24-hour protection.', 'Cetirizin 10mg tabletta (allergia)', 'Cetirizine 10mg Tablets (Allergy)', 'A Cetirizin 10mg tabletta hatékony, nem szedáló antihisztamin, amelyet allergiás nátha, szénanátha, csalánkiütés és más allergiás tünetek kezelésére alkalmaznak. Egyetlen napi adag elegendő a tünetek 24 órán át tartó enyhítéséhez. A készítmény gyorsan hat, általában 1 órán belül tapasztalható a javulás. Felnőttek és 6 éven felüli gyermekek számára alkalmas. Étkezéstől függetlenül bevehető, a napi egyszeri adagolás kényelmes hosszú távú kezelést tesz lehetővé.', 'Cetirizin 10mg ist ein wirksames, nicht sedierendes Antihistaminikum zur Behandlung von allergischer Rhinitis, Heuschnupfen, Urtikaria (Nesselsucht) und anderen allergischen Symptomen. Eine einzige Tagesdosis reicht aus, um die Symptome 24 Stunden lang zu lindern. Das Produkt wirkt schnell – in der Regel ist innerhalb von 1 Stunde eine Verbesserung spürbar. Geeignet für Erwachsene und Kinder über 6 Jahre. Kann mit oder ohne Mahlzeit eingenommen werden.', 'Hatékony, nem álmosító antihisztamin allergiás náthára és szénanáthára. Napi egyszeri adag 24 órás védelmet nyújt.', 'Wirksames, nicht sedierendes Antihistaminikum bei allergischer Rhinitis und Heuschnupfen. Einmal täglich für 24-Stunden-Schutz.', 5, 'UCB Pharma', 'Zyrtec', 4.50, 'CTZ-10-30T', 'Cetirizine dihydrochloride 10mg', '30 tablets', '30 tabletta', '30 Tabletten', '2026-02-26 18:03:29', '2026-03-13 10:04:19', '/assets/products/cetirizin-10-thumb.jpg', 1),
(5, 'Probiotika 10 Milliarden KBE Kapseln', 'This premium probiotic capsule contains 10 billion CFU (colony-forming units) of live bacterial cultures from 8 different strains, supporting a healthy gut microbiome. The combination of Lactobacillus and Bifidobacterium strains helps maintain optimal gut flora, strengthens the immune system, and reduces bloating and digestive discomfort. Especially recommended after antibiotic treatment. Delayed-release capsules protect bacteria from stomach acid.', 4990, 44, 90, '0', 'Premium probiotic with 8 strains and 10 billion CFU. Healthy gut flora, stronger immune system.', 'Probiotikum 10 milliárd CFU kapszula', 'Probiotic 10 Billion CFU Capsules', 'A prémium probiotikum kapszula 10 milliárd CFU (kolóniaképző egység) élő baktérium kultúrát tartalmaz 8 különböző törzsből, amelyek támogatják az emésztőrendszer egészséges mikrobiomját. A Lactobacillus és Bifidobacterium törzsek kombinációja hozzájárul az optimális bélflóra fenntartásához, az immunrendszer erősítéséhez és a puffadás, emésztési panaszok csökkentéséhez. Antibiotikum-kúra utáni regenerálódáshoz különösen ajánlott. A késleltetett felszabadulású kapszula védi a baktériumokat a gyomorsavtól.', 'Diese Premium-Probiotikumskapsel enthält 10 Milliarden KBE (koloniebildende Einheiten) lebender Bakterienkulturen aus 8 verschiedenen Stämmen und unterstützt ein gesundes Darmmikrobiom. Die Kombination aus Lactobacillus- und Bifidobacterium-Stämmen hilft, eine optimale Darmflora aufrechtzuerhalten, stärkt das Immunsystem und reduziert Blähungen und Verdauungsbeschwerden. Besonders empfohlen nach einer Antibiotikatherapie. Magensäureresistente Kapseln schützen die Bakterien.', 'Prémium probiotikum 8 törzses, 10 milliárd CFU tartalommal. Egészséges bélflóra, erősebb immunrendszer.', 'Premium-Probiotikum mit 8 Stämmen und 10 Milliarden KBE. Gesunde Darmflora, stärkeres Immunsystem.', 4, 'Culturelle', 'Culturelle', 4.90, 'PRO-10B-30C', 'Lactobacillus rhamnosus GG 5B CFU, Bifidobacterium longum 2B CFU, Lactobacillus acidophilus 1.5B CFU, Bifidobacterium breve 1.5B CFU (total 10B CFU)', '30 capsules', '30 kapszula', '30 Kapseln', '2026-02-26 18:03:29', '2026-03-13 10:04:23', '/assets/products/probiotikum-10b-thumb.jpg', 0),
(6, 'Coenzym Q10 100mg Kapseln', 'Coenzyme Q10 (Ubiquinone) is a naturally occurring antioxidant found in every cell of the body, playing a vital role in energy production and cardiovascular health. Levels of CoQ10 naturally decline with age, making supplementation beneficial. This supplement supports normal heart muscle function, reduces oxidative stress, and may help maintain healthy blood pressure. Particularly recommended for individuals over 40, those taking statin medications, and people with high physical activity levels. Take 1 capsule daily with a meal containing fat for best absorption.', 4490, 0, 120, '0', 'Essential antioxidant for heart health and cellular energy production. Recommended for adults over 40 and those on statin therapy.', 'Koenzim Q10 100mg kapszula', 'Coenzyme Q10 100mg Capsules', 'A Koenzim Q10 (Ubikinon) egy természetesen előforduló antioxidáns, amely minden sejtünkben megtalálható, és kulcsszerepet játszik az energiatermelésben és a szív- és érrendszer egészségének megőrzésében. Szintje az életkor előrehaladtával csökken, ezért pótlása különösen hasznos. Ez a táplálékkiegészítő támogatja a szívizom normális működését, csökkenti az oxidatív stresszt, és hozzájárulhat az egészséges vérnyomás fenntartásához. Különösen ajánlott 40 év felettieknek, sztatinszedőknek és fokozott fizikai aktivitást végzőknek. Napi 1 kapszulát zsírt tartalmazó étkezéssel együtt vegyen be a legjobb felszívódás érdekében.', 'Coenzym Q10 (Ubiquinon) ist ein natürlich vorkommendes Antioxidans, das in jeder Körperzelle vorkommt und eine wichtige Rolle bei der Energieproduktion und der Herzgesundheit spielt. Der CoQ10-Spiegel nimmt mit dem Alter natürlich ab, weshalb eine Supplementierung vorteilhaft sein kann. Dieses Nahrungsergänzungsmittel unterstützt die normale Herzmuskalfunktion, reduziert oxidativen Stress und kann helfen, einen gesunden Blutdruck aufrechtzuerhalten. Besonders empfohlen für Personen über 40, Statineinnehmende und Menschen mit hoher körperlicher Aktivität. Täglich 1 Kapsel zu einer fetthaltigen Mahlzeit für beste Aufnahme einnehmen.', 'Esszenciális antioxidáns a szívegészségért és a sejtek energiatermeléséért. Ajánlott 40 év felettieknek és sztatinszedőknek.', 'Essenzielles Antioxidans für Herzgesundheit und zelluläre Energieproduktion. Empfohlen für Erwachsene über 40 und Personen mit Statintherapie.', 3, 'Solgar', 'Solgar', 0.00, 'COQ10-100-30C', 'Coenzyme Q10 (Ubiquinone) 100mg', '30 capsules', '30 kapszula', '30 Kapseln', '2026-03-13 11:09:41', '2026-03-13 10:09:41', '/assets/products/coq10-100-thumb.jpg', 0),
(7, 'Bepanthen 5% Dexpanthenol Creme', 'Bepanthen 5% cream contains dexpanthenol, a provitamin B5 derivative that deeply penetrates the skin and converts to pantothenic acid, stimulating natural skin regeneration. It effectively soothes minor wounds, abrasions, sunburn, and dry or cracked skin. The cream is fragrance-free, preservative-free, and suitable for the whole family including newborns. It forms a breathable protective layer that keeps skin moist while allowing oxygen exchange. Ideal for daily care of sensitive, irritated, or damaged skin.', 1890, 0, 200, '0', 'Dexpanthenol cream for wound healing, dry and irritated skin. Fragrance-free, suitable for the whole family including newborns.', 'Bepanthen 5% Dexpanthenol krém', 'Bepanthen 5% Dexpanthenol Cream', 'A Bepanthen 5% krém dexpantenolt tartalmaz, amely egy B5-provitamin-származék, mélyen behatol a bőrbe és pantoténsavvá alakul, serkentve a bőr természetes regenerációját. Hatékonyan enyhíti a kisebb sebeket, horzsolásokat, napsütést és a száraz vagy repedt bőrt. A krém illatanyag- és tartósítószermentes, az egész család számára alkalmas, beleértve az újszülötteket is. Légáteresztő védőréteget képez, amely nedvesen tartja a bőrt és lehetővé teszi az oxigéncsere. Ideális az érzékeny, irritált vagy sérült bőr mindennapi ápolásához.', 'Bepanthen 5% Creme enthält Dexpanthenol, ein Provitamin-B5-Derivat, das tief in die Haut eindringt und sich in Pantothensäure umwandelt, wodurch die natürliche Hautregeneration angeregt wird. Es lindert wirksam kleine Wunden, Abschürfungen, Sonnenbrand sowie trockene oder rissige Haut. Die Creme ist duftstoff- und konservierungsmittelfrei und für die ganze Familie geeignet, einschließlich Neugeborener. Sie bildet eine atmungsaktive Schutzschicht, die die Haut feucht hält und gleichzeitig den Sauerstoffaustausch ermöglicht. Ideal für die tägliche Pflege empfindlicher, gereizter oder geschädigter Haut.', 'Dexpanthenol krém sebgyógyuláshoz, száraz és irritált bőrre. Illatanyagmentes, az egész família számára alkalmas, beleértve az újszülötteket.', 'Dexpanthenol-Creme zur Wundheilung bei trockener und gereizter Haut. Duftstofofrei, für die ganze Familie geeignet, auch für Neugeborene.', 6, 'Bayer AG', 'Bepanthen', 0.00, 'BEP-5-30G', 'Dexpanthenol 50mg/g (5%)', '30g cream', '30g krém', '30g Creme', '2026-03-13 11:09:41', '2026-03-13 10:09:41', '/assets/products/bepanthen-5-thumb.jpg', 0),
(8, 'Eucerin Trockene Haut Intensiv-Lotion 10% Urea', 'Eucerin Dry Skin Intensive Lotion with 10% urea is clinically proven to provide long-lasting relief for very dry and rough skin. Urea is a natural moisturising factor that binds water in the skin and restores the skins barrier function. The formula with urea and lactate effectively reduces flaking, itching, and tightness within just 7 days of regular use. Fragrance-free, dermatologically tested, and suitable for chronic dry skin conditions such as ichthyosis or eczema-prone skin. Apply to affected areas once or twice daily.', 3290, 0, 150, '10', 'Clinically proven intensive lotion with 10% urea for very dry skin. Reduces flaking and itching within 7 days.', 'Eucerin Száraz Bőr Intenzív Testápoló 10% Urea', 'Eucerin Dry Skin Intensive Lotion 10% Urea', 'Az Eucerin Száraz Bőr Intenzív Testápoló 10% ureával klinikailag bizonyítottan tartós enyhülést nyújt a nagyon száraz és érdes bőrre. Az urea egy természetes hidratáló faktor, amely vizet köt a bőrben és helyreállítja a bőr barrier funkcióját. Az ureát és laktátot tartalmazó formula már 7 napos rendszeres használat után hatékonyan csökkenti a hámlást, viszketést és feszülést. Illatanyagmentes, dermatológiailag tesztelt, és alkalmas krónikus száraz bőrállapotokra, mint az ichthyosis vagy az ekcémára hajlamos bőr. Naponta egyszer vagy kétszer vigye fel az érintett területekre.', 'Die Eucerin Trockene Haut Intensiv-Lotion mit 10% Urea ist klinisch erprobt und lindert nachhaltig sehr trockene und raue Haut. Urea ist ein natürlicher Feuchtigkeitsfaktor, der Wasser in der Haut bindet und die Hautbarrierefunktion wiederherstellt. Die Formel mit Urea und Laktat reduziert Schuppung, Juckreiz und Spannungsgefühl bereits nach 7 Tagen regelmäßiger Anwendung effektiv. Duftstofffrei, dermatologisch getestet und geeignet für chronisch trockene Hauterkrankungen wie Ichthyose oder ekzemgefährdete Haut. Einmal oder zweimal täglich auf die betroffenen Stellen auftragen.', 'Klinikailag bizonyított intenzív testápoló 10% ureával nagyon száraz bőrre. 7 napon belül csökkenti a hámlást és viszketést.', 'Klinisch bewährte Intensivlotion mit 10% Urea für sehr trockene Haut. Reduziert Schuppung und Juckreiz innerhalb von 7 Tagen.', 6, 'Beiersdorf AG', 'Eucerin', 0.00, 'EUC-DS-250ML', 'Urea 10%, Sodium Lactate, Aqua', '250ml lotion', '250ml testápoló', '250ml Lotion', '2026-03-13 11:09:41', '2026-03-13 10:09:41', '/assets/products/eucerin-ds-urea-thumb.jpg', 0),
(9, 'Tri-Vi-Sol D3+A+C Vitamin Tropfen für Säuglinge', 'Tri-Vi-Sol provides three essential vitamins — D3, A, and C — in a single daily drop dose specifically formulated for infants and toddlers. Vitamin D3 supports calcium absorption and healthy bone development, Vitamin A promotes normal vision and immune function, and Vitamin C contributes to collagen formation and immune defence. The drop format allows easy, precise dosing and can be mixed into formula, breast milk, or juice. Free from artificial colours and flavours. Recommended by paediatricians for breastfed infants from birth.', 2990, 0, 100, '0', 'Three essential vitamins D3, A and C in one daily drop dose for infants. Supports bone development, vision and immune function.', 'Tri-Vi-Sol D3+A+C Vitamin Csepp Csecsemőknek', 'Tri-Vi-Sol D3+A+C Vitamin Drops for Infants', 'A Tri-Vi-Sol három alapvető vitamint — D3, A és C — kínál egyetlen napi cseppnyi adagban, kifejezetten csecsemők és kisgyermekek számára összeállítva. A D3-vitamin elősegíti a kalcium felszívódását és az egészséges csontfejlődést, az A-vitamin a normális látást és immunfunkciót támogatja, a C-vitamin pedig hozzájárul a kollagénképzéshez és az immunvédekezéshez. A cseppformátum egyszerű, pontos adagolást tesz lehetővé, és keverhetőtápszerbe, anyatejbe vagy gyümölcslébe. Mentes mesterséges színezékektől és aromáktól. Gyermekgyógyászok ajánlják szoptatott csecsemőknek születéstől fogva.', 'Tri-Vi-Sol liefert drei essentielle Vitamine — D3, A und C — in einer einzigen täglichen Tropfendosis, speziell für Säuglinge und Kleinkinder formuliert. Vitamin D3 unterstützt die Calciumaufnahme und eine gesunde Knochenentwicklung, Vitamin A fördert das normale Sehvermögen und die Immunfunktion, und Vitamin C trägt zur Kollagenbildung und Immunabwehr bei. Das Tropfenformat ermöglicht eine einfache, präzise Dosierung und kann in Säuglingsnahrung, Muttermilch oder Saft gemischt werden. Frei von künstlichen Farb- und Aromastoffen. Von Kinderärzten für gestillte Säuglinge ab Geburt empfohlen.', 'Három alapvető vitamin D3, A és C egyetlen napi cseppnyi adagban csecsemőknek. Támogatja a csontfejlődést, a látást és az immunfunkciót.', 'Drei essentielle Vitamine D3, A und C in einer täglichen Tropfendosis für Säuglinge. Unterstützt Knochenentwicklung, Sehvermögen und Immunfunktion.', 7, 'Enfamil', 'Tri-Vi-Sol', 0.00, 'TVS-DAC-50ML', 'Vitamin D3 400IU, Vitamin A 1500IU, Vitamin C 35mg per 1ml', '50ml drops', '50ml csepp', '50ml Tropfen', '2026-03-13 11:09:41', '2026-03-13 10:09:41', '/assets/products/tri-vi-sol-thumb.jpg', 0),
(10, 'Zarbees Naturals Kinder Honig-Hustensirup', 'Zarbee\'s Naturals Children\'s Cough Syrup is a natural, honey-based formula designed to soothe coughs and throat irritation in children aged 1 year and older. The gentle recipe uses real honey as its primary active ingredient, which has been scientifically shown to be as effective as dextromethorphan for relieving nighttime cough in children. Enriched with zinc and Vitamin C to further support the immune system during illness. Free from alcohol, artificial sweeteners, dyes, and parabens. The pleasant honey flavour is well accepted by children. Shake well before use and administer with the included measuring cup.', 3490, 0, 80, '0', 'Natural honey-based cough syrup for children aged 1 and over. No alcohol, no artificial sweeteners. Enriched with Vitamin C and zinc.', 'Zarbee\'s Naturals Gyerek Méz Alapú Köhögés Szirup', 'Zarbee\'s Naturals Children\'s Honey Cough Syrup', 'A Zarbee\'s Naturals gyerek köhögés szirup egy természetes, méz alapú készítmény, amelyet az 1 éves és idősebb gyermekek köhögésének és torokirritációjának enyhítésére fejlesztettek ki. A kíméletes receptúra valódi mézet használ elsődleges hatóanyagként, amelyről tudományosan bizonyított, hogy ugyanolyan hatékony, mint a dextrometorfán a gyermekek éjszakai köhögésének enyhítésében. Cinkkel és C-vitaminnal gazdagítva tovább támogatja az immunrendszert betegség idején. Mentes alkoholtól, mesterséges édesítőszerektől, színezékektől és parabénektől. A kellemes mézes ízt a gyerekek jól fogadják. Használat előtt rázza fel és az adagoló pohárral mérje ki.', 'Zarbee\'s Naturals Kinderhustensirup ist eine natürliche, auf Honig basierende Formel zur Linderung von Husten und Halsreizungen bei Kindern ab 1 Jahr. Das sanfte Rezept verwendet echten Honig als primären Wirkstoff, von dem wissenschaftlich nachgewiesen wurde, dass er bei der Linderung von nächtlichem Husten bei Kindern genauso wirksam ist wie Dextromethorphan. Mit Zink und Vitamin C angereichert, um das Immunsystem während einer Erkrankung zusätzlich zu unterstützen. Frei von Alkohol, künstlichen Süßungsmitteln, Farbstoffen und Parabenen. Der angenehme Honiggeschmack wird von Kindern gut akzeptiert. Vor Gebrauch schütteln und mit dem beiliegenden Messbecher dosieren.', 'Természetes méz alapú köhögés szirup 1 éves és idősebb gyerekeknek. Alkohol- és mesterséges édesítőszer-mentes. C-vitaminnal és cinkkel dúsítva.', 'Natürlicher Honig-Hustensirup für Kinder ab 1 Jahr. Ohne Alkohol und künstliche Süßungsmittel. Mit Vitamin C und Zink angereichert.', 7, 'Zarbee\'s Naturals', 'Zarbee\'s', 0.00, 'ZAR-COUGH-118ML', 'Honey 2.5ml per 5ml, Zinc 2.5mg, Vitamin C 15mg', '118ml syrup', '118ml szirup', '118ml Sirup', '2026-03-13 11:09:41', '2026-03-13 10:09:41', '/assets/products/zarbees-cough-thumb.jpg', 0),
(11, 'Echinacea 400mg Kapseln', 'Echinacea purpurea is one of the most widely researched medicinal herbs, traditionally used to support the immune system and reduce the duration and severity of colds and upper respiratory infections. Each capsule provides 400mg of standardised Echinacea purpurea aerial parts extract, ensuring consistent potency. Clinical studies suggest that Echinacea can reduce the risk of catching a cold by up to 58% and shorten its duration by over a day. Best taken at the first sign of illness or as a short-term preventative during cold and flu season. Not recommended for continuous long-term use exceeding 8 weeks.', 2490, 0, 180, '0', 'Standardised Echinacea purpurea extract for immune support. Reduces cold duration and severity. Best taken at first sign of illness.', 'Echinacea 400mg kapszula', 'Echinacea 400mg Capsules', 'Az Echinacea purpurea az egyik legtöbbet kutatott gyógynövény, amelyet hagyományosan az immunrendszer támogatására és a nátha, valamint a felső légúti fertőzések időtartamának és súlyosságának csökkentésére alkalmaznak. Minden kapszula 400mg standardizált Echinacea purpurea légirész-kivonatot tartalmaz, garantálva az egyenletes hatékonyságot. Klinikai vizsgálatok szerint az Echinacea akár 58%-kal csökkentheti a nátha elkapásának kockázatát és több mint egy nappal rövidítheti le annak időtartamát. Legjobban a betegség első jeleinél vagy rövid távú megelőzésként alkalmazható a megfázás- és influenzaszezonban. Nem ajánlott 8 hetet meghaladó folyamatos hosszú távú szedésre.', 'Echinacea purpurea ist eine der am besten erforschten Heilpflanzen, die traditionell zur Unterstützung des Immunsystems und zur Verkürzung der Dauer und Schwere von Erkältungen und Infektionen der oberen Atemwege eingesetzt wird. Jede Kapsel enthält 400mg standardisierten Echinacea purpurea Krautextrakt für gleichbleibende Wirksamkeit. Klinische Studien legen nahe, dass Echinacea das Erkältungsrisiko um bis zu 58% senken und die Dauer um mehr als einen Tag verkürzen kann. Am besten bei ersten Krankheitszeichen oder zur kurzfristigen Vorbeugung während der Erkältungssaison einzunehmen. Nicht für eine kontinuierliche Langzeitanwendung über 8 Wochen empfohlen.', 'Standardizált Echinacea purpurea kivonat immunerősítéshez. Csökkenti a nátha időtartamát és súlyosságát. Legjobb a betegség első jeleinél bevenni.', 'Standardisierter Echinacea purpurea Extrakt zur Immununterstützung. Verkürzt Dauer und Schwere von Erkältungen. Am besten bei ersten Krankheitszeichen.', 8, 'Nature\'s Way', 'Nature\'s Way', 0.00, 'ECH-400-100C', 'Echinacea purpurea (aerial parts) 400mg', '100 capsules', '100 kapszula', '100 Kapseln', '2026-03-13 11:09:41', '2026-03-13 10:09:41', '/assets/products/echinacea-400-thumb.jpg', 0),
(12, 'Baldrian Wurzel 500mg Kapseln', 'Valerian root has been used for centuries as a natural remedy for sleep difficulties and anxiety. Each capsule contains 500mg of standardised Valeriana officinalis root extract, rich in valerenic acid — the compound responsible for its calming and sleep-promoting properties. Valerian works by increasing the availability of GABA in the brain, promoting relaxation without the grogginess associated with pharmaceutical sleep aids. It is non-habit-forming and suitable for short to medium-term use. Take 1–2 capsules 30–60 minutes before bedtime. Also available for daytime use at lower doses to reduce mild anxiety and stress.', 2190, 0, 140, '0', 'Natural valerian root extract for better sleep and reduced anxiety. Non-habit-forming. Take before bedtime for a restful night.', 'Macskagyökér (Valerian) 500mg kapszula', 'Valerian Root 500mg Capsules', 'A macskagyökeret évszázadok óta alkalmazzák természetes gyógymódként alvási nehézségek és szorongás esetén. Minden kapszula 500mg standardizált Valeriana officinalis gyökérkivonatot tartalmaz, amely gazdag valériánsavban — ez a vegyület felelős a nyugtató és alváselősegítő hatásokért. A macskagyökér az agy GABA elérhetőségének növelésével hat, relaxációt elősegítve anélkül, hogy a gyógyszeres altatókhoz társuló kábultságot okozna. Nem alakít ki függőséget és rövid-közepes távú használatra alkalmas. Lefekvés előtt 30–60 perccel vegyen be 1–2 kapszulát. Alacsonyabb adagban napközben is alkalmazható enyhe szorongás és stressz csökkentésére.', 'Baldrianwurzel wird seit Jahrhunderten als natürliches Mittel bei Schlafstörungen und Angstzuständen verwendet. Jede Kapsel enthält 500mg standardisierten Valeriana officinalis Wurzelextrakt, reich an Valerensäure — der Verbindung, die für seine beruhigenden und schlaffördernden Eigenschaften verantwortlich ist. Baldrian wirkt, indem er die Verfügbarkeit von GABA im Gehirn erhöht und Entspannung fördert, ohne die Benommenheit, die mit pharmakologischen Schlafmitteln verbunden ist. Er macht nicht abhängig und ist für den kurz- bis mittelfristigen Gebrauch geeignet. Nehmen Sie 1–2 Kapseln 30–60 Minuten vor dem Schlafengehen ein. Auch tagsüber in niedrigerer Dosierung zur Linderung leichter Angstzustände und Stress geeignet.', 'Természetes macskagyökér kivonat jobb alvásért és csökkentett szorongásért. Nem alakít ki függőséget. Lefekvés előtt vedd be a pihentető éjszakáért.', 'Natürlicher Baldrianwurzelextrakt für besseren Schlaf und weniger Angst. Nicht abhängig machend. Vor dem Schlafengehen für eine erholsame Nacht einnehmen.', 8, 'Nature\'s Bounty', 'Nature\'s Bounty', 0.00, 'VAL-500-60C', 'Valerian Root (Valeriana officinalis) 500mg', '60 capsules', '60 kapszula', '60 Kapseln', '2026-03-13 11:09:41', '2026-03-13 10:09:41', '/assets/products/valerian-500-thumb.jpg', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `product_categories`
--

CREATE TABLE `product_categories` (
  `category_en` varchar(255) NOT NULL,
  `emoji` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `number_of_products` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `category_hu` varchar(255) NOT NULL,
  `category_de` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `product_categories`
--

INSERT INTO `product_categories` (`category_en`, `emoji`, `color`, `number_of_products`, `id`, `category_hu`, `category_de`) VALUES
('Pain Relief', '1', '#E74C3C', 1, 1, 'Fájdalomcsillapítók', 'Schmerzlinderung'),
('Vitamins & Supplements', '2', '#27AE60', 2, 2, 'Vitaminok & Táplálékkiegészítők', 'Vitamine & Nahrungsergänzung'),
('Heart & Circulation', '3', '#C0392B', 0, 3, 'Szív & Érrendszer', 'Herz & Kreislauf'),
('Digestion & Stomach', '4', '#F39C12', 1, 4, 'Emésztés & Gyomor', 'Verdauung & Magen'),
('Allergy & Breathing', '5', '#3498DB', 1, 5, 'Allergia & Légzés', 'Allergie & Atemwege'),
('Skin Care', '6', '#9B59B6', 0, 6, 'Bőrápolás', 'Hautpflege'),
('Child Health', '7', '#1ABC9C', 0, 7, 'Gyermek egészség', 'Kindergesundheit'),
('Natural Remedies', '8', '#2ECC71', 0, 8, 'Természetes gyógymódok', 'Natürliche Heilmittel');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `product_images`
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
-- A tábla adatainak kiíratása `product_images`
--

INSERT INTO `product_images` (`id`, `alt_text_de`, `alt_text_hu`, `alt_text_en`, `image_url`, `product_id`, `sort_id`) VALUES
(1, 'Aspirin 500mg Filmtabletten Packung', 'Aspirin 500mg filmtabletta doboz', 'Aspirin 500mg film-coated tablets box', '/assets/products/aspirin-500-main.jpg', 1, 1),
(2, 'Aspirin 500mg Tabletten Nahaufnahme', 'Aspirin 500mg tabletták közelképe', 'Aspirin 500mg tablets close-up', '/assets/products/aspirin-500-tablets.jpg', 1, 2),
(3, 'Aspirin 500mg Packungsrückseite, Dosierung', 'Aspirin 500mg doboz hátoldala, adagolás', 'Aspirin 500mg box back, dosage information', '/assets/products/aspirin-500-back.jpg', 1, 3),
(4, 'Omega-3 Fischöl 1000mg Kapselflasche', 'Omega-3 halolaj 1000mg kapszula doboz', 'Omega-3 fish oil 1000mg capsule bottle', '/assets/products/omega3-1000-main.jpg', 2, 1),
(5, 'Omega-3 Kapseln Nahaufnahme', 'Omega-3 kapszulák közelképe', 'Omega-3 capsules close-up', '/assets/products/omega3-1000-capsules.jpg', 2, 2),
(6, 'Omega-3 Inhaltsstoffe und Nährwertinfo', 'Omega-3 összetevők és táplálkozási info', 'Omega-3 ingredients and nutritional info', '/assets/products/omega3-1000-info.jpg', 2, 3),
(7, 'Magnesium B6 Tabletten Packung', 'Magnézium B6 tabletta doboz', 'Magnesium B6 tablet box', '/assets/products/magnesium-b6-main.jpg', 3, 1),
(8, 'Magnesium B6 Packung offen mit Tabletten', 'Magnézium B6 doboz nyitva tabletták', 'Magnesium B6 box open with tablets', '/assets/products/magnesium-b6-open.jpg', 3, 2),
(9, 'Magnesium B6 Produktetikett Nahaufnahme', 'Magnézium B6 termék címke közelkép', 'Magnesium B6 product label close-up', '/assets/products/magnesium-b6-label.jpg', 3, 3),
(10, 'Cetirizin 10mg Allergie Tabletten Packung', 'Cetirizin 10mg allergia tabletta doboz', 'Cetirizine 10mg allergy tablet box', '/assets/products/cetirizin-10-main.jpg', 4, 1),
(11, 'Cetirizin 10mg Blisterpackung', 'Cetirizin 10mg buborékcsomagolás', 'Cetirizine 10mg blister pack', '/assets/products/cetirizin-10-blister.jpg', 4, 2),
(12, 'Cetirizin 10mg Dosierungsanleitung', 'Cetirizin 10mg adagolási útmutató', 'Cetirizine 10mg dosage guide', '/assets/products/cetirizin-10-dose.jpg', 4, 3),
(13, 'Probiotika 10 Milliarden KBE Kapselflasche', 'Probiotikum 10 milliárd CFU kapszula doboz', 'Probiotic 10 billion CFU capsule bottle', '/assets/products/probiotikum-10b-main.jpg', 5, 1),
(14, 'Probiotika Kapseln Nahaufnahme', 'Probiotikum kapszulák közelkép', 'Probiotic capsules close-up', '/assets/products/probiotikum-10b-caps.jpg', 5, 2),
(15, 'Probiotika Stämme und Inhaltsstoffe', 'Probiotikum törzsek és összetevők', 'Probiotic strains and ingredients', '/assets/products/probiotikum-10b-info.jpg', 5, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reviews`
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
-- Tábla szerkezet ehhez a táblához `users`
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
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `email`, `created_at`, `sesstoken`, `passhash`, `sesstoken_expire`, `first_name`, `last_name`, `account_state`) VALUES
(77, 'bp.kaponyi@gmail.com', '2026-03-10 13:39:11', 'jyWrVjsbmJzNNejcqLESus', 'waajxlkYiW4JdiOOAn2w6Uv3IptLfHWVHYnBqaxaYg8=', '2026-03-17 13:39:11', 'kukukuku', 'kukukuku', 'admin'),
(78, 'kerepesi.aron@szechenyi.hu', '2026-03-10 14:12:10', 'zhOcUbUsGaJzWIdHiXwHBA', '7L6z2bdXVIb0e8BLlkzWtYZ9cMCX+g568nwo22mguMo=', '2026-03-17 14:12:36', 'first', 'last', 'verified');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `confirmations`
--
ALTER TABLE `confirmations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_confirmations_user` (`user_id`);

--
-- A tábla indexei `newsletter_recipients`
--
ALTER TABLE `newsletter_recipients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_newsletter_recipients_user` (`email`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_orders_tracking` (`tracking`),
  ADD UNIQUE KEY `uq_orders_token` (`token`),
  ADD KEY `fk_orders_user` (`user_id`);

--
-- A tábla indexei `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_items_order` (`order_id`),
  ADD KEY `fk_order_items_product` (`product_id`);

--
-- A tábla indexei `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `fk_posts_user` (`user_id`),
  ADD KEY `fk_posts_category` (`category_id`);

--
-- A tábla indexei `post_categories`
--
ALTER TABLE `post_categories`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `post_comments`
--
ALTER TABLE `post_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_post_comments_post` (`post_id`),
  ADD KEY `fk_post_comments_user` (`user_id`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `fk_products_category` (`category_id`);

--
-- A tábla indexei `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `image_url` (`image_url`),
  ADD KEY `fk_product_images_product` (`product_id`);

--
-- A tábla indexei `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reviews_product` (`product_id`),
  ADD KEY `fk_reviews_user` (`user_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `confirmations`
--
ALTER TABLE `confirmations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `newsletter_recipients`
--
ALTER TABLE `newsletter_recipients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `post_categories`
--
ALTER TABLE `post_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `post_comments`
--
ALTER TABLE `post_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `confirmations`
--
ALTER TABLE `confirmations`
  ADD CONSTRAINT `fk_confirmations_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_posts_category` FOREIGN KEY (`category_id`) REFERENCES `post_categories` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_posts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_posts_user_complete` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `post_comments`
--
ALTER TABLE `post_comments`
  ADD CONSTRAINT `fk_post_comments_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_post_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `fk_product_images_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_reviews_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reviews_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
