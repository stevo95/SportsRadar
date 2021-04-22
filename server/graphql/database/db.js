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
  host: 'localhost',
  dialect: 'postgres',
  port:'3000'
}

const sequelize = new Sequelize('sport_social', 'postgres', '123456', config);
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