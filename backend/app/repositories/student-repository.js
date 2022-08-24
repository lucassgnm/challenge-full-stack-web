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

  async selectOneByCpf(args) {
    return await models.student.findOne({
      where: {
        cpf: args
      }
    });
  }

  async selectOneByEmail(args) {
    return await models.student.findOne({
      where: {
        email: args
      }
    });
  }

  async insert(args) {
    return await models.student.create(args);
  }

  async delete(args) {
    return await models.student.destroy({
      where: {
        ra: args.ra
      }
    });
  }
}
  
  module.exports = studentRepository
  