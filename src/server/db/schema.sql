CREATE DATABASE questions;
\c questions
CREATE SCHEMA questions;
SET search_path TO questions;

DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS photos;

CREATE TABLE questions (
  question_id int PRIMARY KEY,
  product_id int NOT NULL,
  question_body varchar(300) NOT NULL,
  question_date bigint NOT NULL,
  asker_name varchar(50) NOT NULL,
  asker_email varchar(50) NOT NULL,
  reported int NOT NULL,
  question_helpfulness int NOT NULL
);

CREATE TABLE answers (
  id int PRIMARY KEY,
  question_id int NOT NULL,
  body varchar(300) NOT NULL,
  date bigint NOT NULL,
  answerer_name varchar(50) NOT NULL,
  answerer_email varchar(50) NOT NULL,
  reported int NOT NULL,
  helpfulness int NOT NULL,
  FOREIGN KEY (question_id) REFERENCES questions (question_id)
);

CREATE TABLE photos (
  photo_id int,
  answer_id int NOT NULL,
  url varchar(300) NOT NULL,
  FOREIGN KEY (answer_id) REFERENCES answers (id)
);

CREATE INDEX questions_index_0 ON questions (question_id);

COPY questions (question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
FROM '/Users/evan/sdc/atelier-questions-backend/dist/SDC_questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers (id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness)
FROM '/Users/evan/sdc/atelier-questions-backend/dist/SDC_answers.csv'
DELIMITER ','
CSV HEADER;

COPY photos (photo_id, answer_id, url)
FROM '/Users/evan/sdc/atelier-questions-backend/dist/SDC_answers_photos.csv'
DELIMITER ','
CSV HEADER;

/*  Execute this file from the command line by typing:
 *    psql -U rootname < src/server/db/schema.sql
 *  to create the database and the tables.*/
