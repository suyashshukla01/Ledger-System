# Ledger Management System

A full-stack digital ledger application built using the MERN stack.

## Features

* User Registration & Login
* JWT Authentication
* Account Creation & Management
* Balance Tracking using Ledger Entries
* Money Transfers Between Accounts
* Transaction History
* Email Notifications
* Responsive Dashboard UI

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Nodemailer

## Project Structure

```
Ledger-System/
│
├── FrontEnd/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── BackEnd/
│   ├── src/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/ledger-system.git
cd ledger-system
```

### Backend Setup

```bash
cd BackEnd
npm install
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Start Backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:3000
```

### Frontend Setup

```bash
cd FrontEnd
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

## API Endpoints

### Authentication

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/logout

### Accounts

* POST /api/accounts
* GET /api/accounts
* GET /api/accounts/balance/:accountId

### Transactions

* POST /api/transactions
* GET /api/transactions
* POST /api/transactions/system/initial-funds

## Screenshots

Add screenshots of:

* Login Page
* Dashboard
* Accounts Page
* Transactions Page

## Author

Suyash Shukla

## License

This project is for educational and portfolio purposes.
