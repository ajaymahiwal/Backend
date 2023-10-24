
CREATE DATABASE instagram;



USE instagram;

CREATE TABLE user (
    username VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY (username),
    marks TINYINT NOT NULL,
    email VARCHAR(50) UNIQUE
);

CREATE TABLE posts (
    userID VARCHAR(30),
    FOREIGN KEY (userID)
        REFERENCES user (username),
    postID VARCHAR(50) UNIQUE
);

DROP table posts;


INSERT INTO user(username,marks,email)
VALUES
("ajaymahi-1",100,"ajaymhi@gmail.com"),
("radha-1",90,"rahdahi@gmail.com"),
("gargi-1",70,"gargiid@gmail.com"),
("kirsana-1",80,"hdsfkasj@gmail.com"),
("radha",50,"sghlui@gmail.com"),
("gargi",70,"sifherbajaymhi@gmail.com"),
("kirsana",80,"aliugfbaajaymhi@gmail.com"),
("raj",83,"ailsiaurajaymhi@gmail.com");


SELECT  avg(marks)
FROM user;

SELECT username,email
FROM user
WHERE marks > 80
ORDER BY marks DESC;


SELECT * FROM user;