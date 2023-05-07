const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
//const User = require('../models/User');
//const CommonUser = require('../models/CommonUser');

//const models = [User, CommonUser];

const sequelize = new Sequelize(databaseConfig);

module.exports = sequelize;


// models.forEach((model) => model.init(connection));
// models.forEach((model) => model.associate && model.associate(connection.models));
