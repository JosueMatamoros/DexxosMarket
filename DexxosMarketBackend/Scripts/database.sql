create database dexxos;
drop database dexxos;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name1 VARCHAR(50),
    last_name2 VARCHAR(50),
    gender VARCHAR(10),
    email VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2),
    code VARCHAR(50)
);


CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT,
    barcode VARCHAR(50),
    total_price DECIMAL(10, 2),
    shipping_price DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE order_details (
    product_id INT,
    order_id INT,
    PRIMARY KEY (product_id, order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

CREATE TABLE cart (
    cart_item_id SERIAL PRIMARY KEY,
    user_id varchar,
    product_id INT,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE product_images (
    image_id SERIAL PRIMARY KEY,
    product_id INT,
    image_url VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);



