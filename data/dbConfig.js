const knex = require('knex');
const config = require('../knexfile.js');

const environment = process.env.DB_ENV || 'development';

 console.log('db env ', environment);

// NOTICE, difference with how we previously setup knex
// module.exports = knex(knexConfig.development);
//    !!! We assign based on environment(testing, dev, prod)
module.exports = knex(config[environment]);