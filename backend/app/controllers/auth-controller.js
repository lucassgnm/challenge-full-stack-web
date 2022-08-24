const config = require('../config')
const jwt = require('jsonwebtoken');

const AuthRepository = require('../repositories/auth-repository')
const authRepository = new AuthRepository()

//config.dataBase.password
class AuthController {
  async validateToken(req, res, next) {
    try {
      // We can obtain the session token from the requests cookies, which come with every request
      let token = '';

      for (let index = 0; index < req.rawHeaders.length; index++) {
        const element = req.rawHeaders[index];
        if (element == 'Authorization') {
          token = req.rawHeaders[index+1].split(' ')[1];
        }
      }

      // if the cookie is not set, return an unauthorized error
      if (!token) {
        return res.status(401).end();
      }
    
      let payload;
      try {
        // Parse the JWT string and store the result in `payload`.
        // Note that we are passing the key in this method as well. This method will throw an error
        // if the token is invalid (if it has expired according to the expiry time we set on sign in),
        // or if the signature does not match
        payload = jwt.verify(token, process.env.SECRET);
      } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
          console.log(e);
          // if the error thrown is because the JWT is unauthorized, return a 401 error
          return res.status(401).end();
        }
        // otherwise, return a bad request error
        return res.status(400).end();
      }

      // Finally, return the welcome message to the user, along with their
	    // username given in the token
      req.payload = payload;
      next();
    } catch (err) {
      // Error response
      return res.status(code).json({
        statusCode: res.statusCode,
        error: err.message
      });
    }
  }

  async login(req, res) {
    try {
      if (req.body.username && req.body.password) {
        const result = await authRepository.selectOne(req.body);
        if (result) {
          result.dataValues.token = jwt.sign(result.dataValues, process.env.SECRET, {
            expiresIn: process.env.EXPIRESIN // expires in 5min
          });
          res.json(result);
        } else {
          return res.status(400).json({
            statusCode: 400,
            error: 'Dados inválidos'
          });
        }
      } else {
        return res.status(400).json({
          statusCode: 400,
          error: 'Dados inválidos'
        });
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
}

module.exports = AuthController;