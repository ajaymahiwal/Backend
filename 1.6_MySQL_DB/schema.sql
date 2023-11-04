

-- Our SQL Code To Manipulate Database

SHOW TABLES;

-- CREATE TABLE user(
--     id VARCHAR(50) PRIMARY KEY,
--     username VARCHAR(50) UNIQUE NOT NULL,
--     email VARCHAR(50) UNIQUE NOT NULL,
--     password VARCHAR(50) NOT NULL
-- );

-- ALTER TABLE user
-- ADD COLUMN daily_post int DEFAULT 0;

CREATE TABLE posts (
    post_id VARCHAR(50) NOT NULL PRIMARY KEY,
    user_id VARCHAR(50),
    FOREIGN KEY (user_id) references user(id),
    dpost INT,
    FOREIGN KEY (dpost) references user(daily_post),
    likes INT DEFAULT 0,
    comments INT DEFAULT 0,
    CONSTRAINT dailypostcount CHECK (dpost>1)
);