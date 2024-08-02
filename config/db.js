Knex = require('knex');
const knexConfig = require('../../knexfile'); 
const db = Knex(knexConfig.development); 
console.log(db)

module.exports = db;