const express = require('express');
const MeliController = require('../infrastructure/controllers/meliController');
const { connectMongo } = require('../infrastructure/database/mongo');
//require('dotenv').config();

const app = express();
app.use(express.json());

const meliController = new MeliController();
app.post('/auth/token', (req, res) => meliController.getToken(req, res));
app.post('/redirect/auth', (req, res) => meliController.redirectAuth(req, res));


connectMongo();

module.exports = app;
