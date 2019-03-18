CREATE TABLE products (
item_id INTEGER PRIMARY KEY AUTO_INCREMENT,
product_name VARCHAR(45) NOT NULL,
department_name VARCHAR(45) NOT NULL,
price INTEGER NOT NULL,
stock_quantity INTEGER NOT NULL
);

SELECT * FROM products;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Zail2sda';

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("zoom kobe 1", "basketball sneakers", 130, 50), ("zoom kobe 2", "basketball sneakers", 120, 50),
("zoom kobe 3", "basketball sneakers", 150, 50), ("zoom kobe 3", "basketball sneakers", 150, 50), 
("zoom kobe 5", "basketball sneakers", 180, 50), ("zoom kobe 6", "basketball sneakers", 170, 50), 
("zoom kobe 7", "basketball sneakers", 1800, 50), ("zoom kobe 8", "basketball sneakers", 200, 50), 
("zoom kobe 9", "basketball sneakers", 250, 50), ("zoom kobe 10", "basketball sneakers", 200, 50);


