const express = require('express');
const routes = express.Router();

const AuthController = require('../controllers/auth-controller');
const authController = new AuthController()

const StudentController = require('../controllers/student-controller');
const studentController = new StudentController();

routes.get('/student', authController.validateToken, studentController.get);
routes.post('/student', authController.validateToken, studentController.post);
routes.delete('/student/:ra', authController.validateToken, studentController.delete);

module.exports = routes;