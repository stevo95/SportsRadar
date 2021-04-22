'use-strict'

//  \l - list databases
//  \c - connect to database
//  \dt - list tables
//  SELECT * FROM table_name;
//  TRUNCATE table_name; - delete all rows

const fs = require('fs');
const path = require('path')
const Sequelize = require('sequelize');

let reqPath = path.join(__dirname, '../database/database-schemas');

const config = {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port:process.env.DB_PORT
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DIALECT, process.env.DB_PASS, config);
db = {};

const files = fs.readdirSync(reqPath);


for (const file of files) {
  if (file !== 'index.js' && file.slice(-3) === '.js') {
    const model = require(path.join(reqPath, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
}

for (const model in db) {
  if (db[model].associate) db[model].associate(db);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;