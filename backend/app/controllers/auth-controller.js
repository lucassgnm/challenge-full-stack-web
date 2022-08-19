const config = require('../config')
const jwt = require('jsonwebtoken');

const AuthRepository = require('../repositories/auth-repository')
const authRepository = new AuthRepository()

//config.dataBase.password
class AuthController {
  async validateToken(req, res, next) {
    try {

      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 6000 // expires in 5min
      });
      console.log(token);

      //authentication
      // app.post('/login', (req, res, next) => {
      //   //esse teste abaixo deve ser feito no seu banco de dados
      //   if(req.body.user === 'luiz' && req.body.password === '123'){
      //     //auth ok
      //     const id = 1; //esse id viria do banco de dados
      //     const token = jwt.sign({ id }, process.env.SECRET, {
      //       expiresIn: 300 // expires in 5min
      //     });
      //     return res.json({ auth: true, token: token });
      //   }
        
      //   res.status(500).json({message: 'Login inválido!'});
      // })

    } catch (err) {
      return res.status(code).json({
        statusCode: res.statusCode,
        error: err.message
      });
    }
  }

  async login(req, res) {
    try {
      if (req.body.username && req.body.password) {
        res.json(await authRepository.selectOne(req.body));
      } else {
        return res.status(400).json({
          statusCode: 400,
          error: 'Dados inválidos'
        });
      }

   

      //authentication
      // app.post('/login', (req, res, next) => {
      //   //esse teste abaixo deve ser feito no seu banco de dados
      //   if(req.body.user === 'luiz' && req.body.password === '123'){
      //     //auth ok
      //     const id = 1; //esse id viria do banco de dados
      //     const token = jwt.sign({ id }, process.env.SECRET, {
      //       expiresIn: 300 // expires in 5min
      //     });
      //     return res.json({ auth: true, token: token });
      //   }
        
      //   res.status(500).json({message: 'Login inválido!'});
      // })

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

module.exports = AuthController;