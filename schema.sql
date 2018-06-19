DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	
  id INT  NOT NULL,
  item_id INT NOT NULL,
  product_name VARCHAR (100) NOT NULL,
  department_name VARCHAR(100)  NOT NULL,
  price DECIMAL (10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
  
);

INSERT INTO products (id, item_id, product_name, department_name, price, stock_quantity)
VALUES (1, 101, "Towel", "Home Goods", 5, 99),
(2, 102, "Bag", "Home Goods", 14, 47),
(3, 103, "Gum", "Food", 24.5, 1000),
(4, 104, "Windex", "Cleaning Supplies", 7, 250),
(5, 105, "Television", "Electronics", 499, 25),
(6, 106, "Belt", "Clothes", 12, 25),
(7, 107, "Glasses", "Acc ", 27, 34),
(8, 108, "Tissues", "Home Goods", 5, 126),
(9, 109, "Lawn Mower", "Equipment", 250, 61),
(10, 110, "Speaker", "Electronics", 75, 23);

DESCRIBE  products;

SELECT *FROM products


