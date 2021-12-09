CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL PRIMARY KEY,
    user_name varchar(50),
    doc text,
    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);