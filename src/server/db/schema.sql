CREATE DATABASE questions;
\c questions
CREATE SCHEMA questions;
SET search_path TO questions;


DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS photos;

CREATE TABLE products (
  id int PRIMARY KEY,
  name varchar(300) NOT NULL,
  slogan varchar(300) NOT NULL,
  description varchar(500) NOT NULL,
  category varchar(50) NOT NULL,
  default_price int NOT NULL
);

CREATE TABLE questions (
  id int PRIMARY KEY,
  product_id int NOT NULL,
  body varchar(300) NOT NULL,
  date_written bigint NOT NULL,
  asker_name varchar(50) NOT NULL,
  asker_email varchar(50) NOT NULL,
  reported int NOT NULL,
  helpful int NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE answers (
  id int PRIMARY KEY,
  question_id int NOT NULL,
  body varchar(300) NOT NULL,
  date_written bigint NOT NULL,
  answerer_name varchar(50) NOT NULL,
  answerer_email varchar(50) NOT NULL,
  reported int NOT NULL,
  helpful int NOT NULL,
  FOREIGN KEY (question_id) REFERENCES questions (id)
);

CREATE TABLE photos (
  id int,
  answer_id int NOT NULL,
  url varchar(300) NOT NULL,
  FOREIGN KEY (answer_id) REFERENCES answers (id)
);

CREATE INDEX products_index_0 ON products (id);

COPY products
FROM '/Users/evan/sdc/atelier-questions-backend/dist/SDC_product.csv'
DELIMITER ','
CSV HEADER;

COPY questions
FROM '/Users/evan/sdc/atelier-questions-backend/dist/SDC_questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers
FROM '/Users/evan/sdc/atelier-questions-backend/dist/SDC_answers.csv'
DELIMITER ','
CSV HEADER;

COPY photos
FROM '/Users/evan/sdc/atelier-questions-backend/dist/SDC_answers_photos.csv'
DELIMITER ','
CSV HEADER;


/*  Execute this file from the command line by typing:
 *    psql -U rootname < src/server/db/schema.sql
 *  to create the database and the tables.*/
