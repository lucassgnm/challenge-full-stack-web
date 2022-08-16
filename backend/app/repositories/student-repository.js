const models = require('../models');
const { Op, Sequelize } = require('sequelize');

class studentRepository {
  async selectAll() {
    return await models.student.findAll();
  }

  async selectOne(args) {
    return await models.student.findOne({
      where: {
        ra: args.ra
      }
    });
  }

  async insert(args) {
      return await models.student.create(args);
    }
  }
  
  module.exports = studentRepository
  