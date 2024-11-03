CREATE DATABASE perntodo;

NB: 
using \l CREATE DATABASE perntodo;
using \c perntodo





CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);