 CREATE DATABASE tenant_management_system;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    google_id VARCHAR(200) UNIQUE NOT NULL,
);


CREATE TABLE tenant (
    Aadhar CHAR(12),
    Name VARCHAR(50),
    gender VARCHAR(10),
    phone_num VARCHAR(15),
    address VARCHAR(200),
    room_no INTEGER,
    rent INTEGER,
    rent_paid CHAR(3),
    owner_id INTEGER REFERENCES users(user_id),
    PRIMARY KEY (Aadhar, owner_id)  
);