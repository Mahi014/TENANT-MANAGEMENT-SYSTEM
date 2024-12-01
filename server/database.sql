 CREATE DATABASE tenant_management_system;

 ----\c perenstack_todo tenant_management_system;

 CREATE TABLE login(
    login_id SERIAL PRIMARY KEY,
    userName VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE tenant (
    Aadhar CHAR(12) PRIMARY KEY,
    Name VARCHAR(50),
	gender VARCHAR(10),
	phone_num VARCHAR(15),
	address VARCHAR(200),
    room_no INTEGER,
	rent Integer,
    rent_paid CHAR(3)
);