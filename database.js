// const sqlite3 = require("sqlite3").verbose();

const { Client } = require("pg");

//   SQL-statement för tabell rooms, innehåller id & name.
const roomStatement = `
  CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    name TEXT)`;

const messageStatement = `
  CREATE TABLE IF NOT EXISTS message (
    id SERIAL PRIMARY KEY,
    value TEXT,
    room TEXT,
    name TEXT,
    date TEXT)`;

const db = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
  connectionString: process.env.DATABASE_URL,
  // Heroku lägger till ENV-variablen DATABASE_URL när du
  // lägger till Heroku Postgres som addon till din app
});

// Ansluter till databasen
db.connect();

// RUM:
db.query(roomStatement, (error) => {
  // Om tabellen redan finns så kommer det här felmeddelandet att köras:
  if (error) {
    console.error(error.message);
  } else {
    // Lägga till flera rum genom detta SQL-statementet
    const roomInsert = `INSERT INTO rooms (name) VALUES ($1)`;

    // Prövar att lägga till ett rum här:
    db.query(roomInsert, ["room 1"]);
    db.query(roomInsert, ["room 2"]);
  }
});

// MEDDELANDEN:
db.query(messageStatement, (error) => {
  // Om tabellen redan finns så kommer det här felmeddelandet att köras:
  if (error) {
    console.error(error.message);
  } else {
    // Lägga till meddelanden med detta SQL-statementet
    const messageInsert = `INSERT INTO message (value, room, name, date) VALUES ($1, $2, $3, $4)`;
    // Prövar att lägga till ett rum här:
    db.query(messageInsert, [
      "Welcome!",
      "default",
      "botronic",
      "2022-06-30 23:59:59",
    ]);
  }
});

// const db = new sqlite3.Database("./db.sqlite", (error) => {
//   if (error) {
//     console.error(error.message);
//     throw error;
//   }
//   console.log("ansluten");

// });
module.exports = db;
