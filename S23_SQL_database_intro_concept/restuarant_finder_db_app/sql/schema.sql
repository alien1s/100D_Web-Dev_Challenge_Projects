CREATE DATABASE IF NOT EXISTS restaurant_finder;
USE restaurant_finder;


DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS types;

-- ==========================================
-- CREATE TABLES
-- ==========================================

CREATE TABLE types (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(225) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE addresses (
    id INT NOT NULL AUTO_INCREMENT,
    street VARCHAR(225) NOT NULL,
    street_number VARCHAR(45) NOT NULL,
    city VARCHAR(225) NOT NULL,
    postal_code VARCHAR(45) NOT NULL,
    country VARCHAR(225) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE restaurants (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(225) NOT NULL,
    address_id INT NOT NULL,
    type_id INT NOT NULL
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reviewer_name VARCHAR(225) NOT NULL,
    rating INT NOT NULL,
    text TEXT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    restaurant_id INT NOT NULL
);
