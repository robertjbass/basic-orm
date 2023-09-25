import mysql from "mysql2";
const mysqlPromise = require("mysql-promise");
const db = mysqlPromise();

// 🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌

const databaseName = "test";

type Options = {
  host: string;
  user: string;
  password?: string;
  database?: string;
};

type Table = string;
type Query = {
  select: string[];
  from: Table;
  where?: string;
};

const opts: Options = {
  host: "localhost",
  user: "root",
};

db.configure(opts, mysql);

let result;
try {
  result = await db.query(`SHOW TABLES IN ${databaseName}`);
  console.log(result);
} catch {
  result = await db.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
  console.log(result);
}

const isIn = (values: any[]) => {
  const valueString = values.map((v) => `'${v}'`).join(",");
  return `IN (${valueString})`;
};

const isNotIn = (values: any[]) => {
  const valueString = values.map((v) => `'${v}'`).join(",");
  return `NOT IN (${valueString})`;
};

const like = (value: string) => {
  return `LIKE '%${value}%'`;
};

const is = (value: any) => {
  return `= '${value}'`;
};

const isNot = (value: any) => {
  if (typeof value === "string") {
    return `<> '${value}'`;
  }
  return `<> ${value}`;
};
