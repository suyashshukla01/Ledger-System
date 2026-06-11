const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./routes/auth.routes');
const accountRouter = require('./routes/account.routes');
const transactionRoutes = require('./routes/transaction.routes');

const app = express();

app.use(cookieParser());
app.use(express.json());

const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ledger-system-jade.vercel.app'
  ],
  credentials: true
}));

app.get("/", (req, res) => {
    res.send("Ledger Service is up and running");
});

app.use('/api/auth', authRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/transactions', transactionRoutes);

module.exports = app;