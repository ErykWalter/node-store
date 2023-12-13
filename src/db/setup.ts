import { Sequelize } from 'sequelize-typescript';

// import the .env file
import dotenv from 'dotenv';
dotenv.config();

// create a function which will retrun function to log messages by sequelize
function getLogging() {
  switch (process.env.NODE_ENV) {
    case 'dev':
      return (...msg: any[]) => console.log(msg);
    default:
      return console.log;
  }
}

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'postgres',
  logging: getLogging(),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});

// export the sequelize instance
export default sequelize;
