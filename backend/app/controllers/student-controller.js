const util = require('../util/util');

const StudentRepository = require('../repositories/student-repository')
const studentRepository = new StudentRepository()

class StudentController {
  async get(req, res) {
    try {
      if (await util.isEmpty(req.query)) {
        res.json(await studentRepository.selectAll());
      } else {
        res.json(await studentRepository.selectOne(req.query));
      }
    } catch (err) {
      // Error response
      let code = err.code ? err.code : 500;
      return res.status(code).json({
        statusCode: res.statusCode,
        error: err.message
      });
    }
  }

  async post(req, res) {
    try {
      if (!await util.validateCpf(req.body.cpf)) {
        return res.status(400).json({
          statusCode: 400,
          error: 'CPF digitado é inválido.'
        });
      }

      if (await studentRepository.selectOneByCpf(req.body.cpf)) {
        return res.status(400).json({
          statusCode: 400,
          error: 'CPF já cadastrado no sistema.'
        });
      }

      if (!await util.validateEmail(req.body.email)) {
        return res.status(400).json({
          statusCode: 400,
          error: 'Email digitado é inválido.'
        });
      }

      if (await studentRepository.selectOneByEmail(req.body.email)) {
        return res.status(400).json({
          statusCode: 400,
          error: 'Email já cadastrado no sistema.'
        });
      }
      
      res.json(await studentRepository.insert(req.body));
    } catch (err) {
      // Error response
      let code = err.code ? err.code : 500;
      return res.status(code).json({
        statusCode: res.statusCode,
        error: err.message
      });
    }
  }

  async delete(req, res) {
    try {
      res.json(await studentRepository.delete(req.params));
    } catch (err) {
      // Error response
      let code = err.code ? err.code : 500;
      return res.status(code).json({
        statusCode: res.statusCode,
        error: err.message
      });
    }
  }
}

module.exports = StudentController
