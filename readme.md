# Tenant Management System (PERN Stack)

This is a **Tenant Management System** built with the **PERN stack (PostgreSQL, Express.js, React.js, Node.js)**.  
It helps **PG owners** manage tenant details, track rent payments, and perform CRUD operations.

## Features 🚀

- ✅ **Manage Tenant Details** – Add, update, delete tenant records.
- ✅ **Track Rent Payments** – Monitor rent status (Yes/No).
- ✅ **Search & Filter** – Quickly search tenants by **name, Aadhar, or room number**.
- ✅ **Interactive UI** – Built using **React and Tailwind CSS** for a smooth experience.

## Tech Stack 🛠️

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL

# THIS IS HOW THE PROJECT LOOKS AFTER RUNNING:  

## Screenshot 1  
![Screenshot 1](Images/Screenshot%20(1).png)  

## Screenshot 2  
![Screenshot 2](Images/Screenshot%20(2).png)  

## Screenshot 3  
![Screenshot 3](Images/Screenshot%20(3).png)  

## Screenshot 4  
![Screenshot 4](Images/Screenshot%20(4).png)  

## Screenshot 5  
![Screenshot 5](Images/Screenshot%20(5).png)  

## Screenshot 6  
![Screenshot 6](Images/Screenshot%20(6).png)  

## Screenshot 7  
![Screenshot 7](Images/Screenshot%20(7).png)  

## Screenshot 8  
![Screenshot 8](Images/Screenshot%20(8).png)  

## Screenshot 9  
![Screenshot 9](Images/Screenshot%20(9).png)  

## Screenshot 10  
![Screenshot 10](Images/Screenshot%20(10).png)  

## Screenshot 11  
![Screenshot 11](Images/Screenshot%20(11).png)  

## Screenshot 12  
![Screenshot 12](Images/Screenshot%20(12).png)  

## Screenshot 13  
![Screenshot 13](Images/Screenshot%20(13).png)  

## Screenshot 14  
![Screenshot 14](Images/Screenshot%20(14).png)  

## Screenshot 15  
![Screenshot 15](Images/Screenshot%20(15).png)  

## Getting Started  

### Setup Instructions  

**Clone the repository:**  
   ```bash
   git clone https://github.com/Mahi014/TENANT-MANAGEMENT-SYSTEM.git
   cd TENANT-MANAGEMENT-SYSTEM
   ```
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```
Create a .env file in the server directory with your database configuration:
```bash
PG_USER=Your_PostgreSQL_UserName
PG_HOST=localhost
PG_PASSWORD=Your_PostgreSQL_password
PG_DATABASE=tenant_management_db
PG_PORT=5432
PORT=5000
```
Start the backend server:
```bash
nodemon server.js
```
Navigate to the client directory and install dependencies:
```bash
cd ../client
npm install
```
Start the client:
```bash
npm start
```
Database Setup:
To set up the database, refer to the SQL schema in server/database.sql.

Developed By
Mahender Singh
