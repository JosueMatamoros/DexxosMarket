
INSERT INTO users (first_name, last_name1, last_name2, gender, email, password, role)
VALUES ('Root', 'User', '', 'Unknown', 'root@example.com', 'root', 'admin');


INSERT INTO cart (user_id, product_id, quantity)
VALUES
    ('google-oauth2|107418319556598660453', 1, 2),
    ('google-oauth2|107418319556598660453', 2, 3);

TRUNCATE TABLE cart RESTART IDENTITY;

SELECT * FROM cart WHERE user_id = 'google-oauth2|111876327150807114887';





