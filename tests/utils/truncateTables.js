const sequelize = require('../../src/app/database/index');

module.exports = async () => {
  await sequelize.truncate({ cascade: true, restartIdentity: true });
};
