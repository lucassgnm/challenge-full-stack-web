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
}

module.exports = StudentController
