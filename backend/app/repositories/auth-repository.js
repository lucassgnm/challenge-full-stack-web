const models = require('../models');
const { Op, Sequelize } = require('sequelize');
const crypto = require("crypto");

class authRepository {
  async selectOne(args) {
    return await models.auth.findOne({
      where: {
        username: args.username,
        password: crypto.createHash('sha256').update(args.password).digest('hex')
        }
    });
  }
}
  
  module.exports = authRepository
  