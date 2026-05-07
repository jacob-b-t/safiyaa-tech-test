import sqlite3 from 'sqlite3';
import { config } from './lib/config';

const db = new sqlite3.Database(
  `./${config.dbName}.db`,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
  },
);

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS ${config.tableName} (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        score INTEGER NOT NULL
        )`,
    (err: Error) => {
      if (err) {
        return console.error(err.message);
      }
    },
    console.log(`Created ${config.tableName} table.`),
  );
});
