 CREATE DATABASE tenant_management_system;

 ----\c perenstack_todo tenant_management_system;

 CREATE TABLE login(
    login_id SERIAL PRIMARY KEY,
    userName VARCHAR(100),
    password VARCHAR(100)
);