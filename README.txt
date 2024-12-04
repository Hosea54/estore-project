# ProShop - E-commerce Application

## Description
ProShop is a complete e-commerce application that allows users to browse products, add items to a cart, and complete purchases. This project is built with a **React** frontend, a **Node.js/Express** backend, and a **MongoDB** database. It also supports PayPal payments.

---

## Table of Contents
- [Installation](#installation)
- [Features](#features)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Seed Data](#seed-data)
- [License](#license)

---

## Installation

### 1 Install dependencies

## - [Available Scripts]
npm install

## Running the application
npm start: Starts the backend server.
npm run server: Starts the backend server with nodemon.
npm run data:import: Imports seed data (products, users).
npm run data:destroy: Deletes all data in the
npm run dev: Starts both the frontend and backend servers concurrently.

## Environment Variables
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/proshop?retryWrites=true&w=majority
JWT_SECRET=yourjwtsecret
PAYPAL_CLIENT_ID=yourpaypalclientid

Go to the .env file
Replace <username> and <password> in the MONGO_URI with your MongoDB credentials.
Replace yourjwtsecret with a secure JWT secret.
Replace yourpaypalclientid with your PayPal client ID.

###Seed Data

Import Data:
Run the following command to import default users and products:
npm run data:import

Destroy Data:
To delete all data from the database:
npm run data:destroy

##Licence
Author
Created by Hosea