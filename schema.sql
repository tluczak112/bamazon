DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	
  id INT  NOT NULL,
  item_id INT NOT NULL,
  product_name VARCHAR (100) NOT NULL,
  department_name VARCHAR(100)  NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
  
);


