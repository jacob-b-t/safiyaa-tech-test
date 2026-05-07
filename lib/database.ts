import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { config } from './config';

let db: Database | null = null;

export async function getDb(): Promise<Database> {
  if (db) {
    return db;
  }
  db = await open({
    filename: `./${config.dbName}.db`,
    driver: sqlite3.Database,
  });
  return db;
}
