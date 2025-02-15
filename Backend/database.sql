NB some bacsic commands: 
----- To list all databases
 \l 
----- To create a database
 CREATE DATABASE perntodo; 
----- To connect to a database
 \c perntodo 
----- To list all tables
 \dt 
----- To describe a table
 \d table_name 
----- To describe all tables
 \d+ table_name 
--To create a table
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);
---To show all the data in a table
SELECT * FROM todo;