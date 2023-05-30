// PACKAGE IMPORTS
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import router from './routers/index.routes.js';

// SERVER CONFIG
const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
dotenv.config();

// FUNCTIONS
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.bgGreen(`Running server on port ${port}!`));
});
