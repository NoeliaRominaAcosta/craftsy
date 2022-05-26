const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')
const validations = require('../validations/registerValidations')
const {register,login, processRegister} = require('../controllers/userController');


/* /users */
router
    /* A route handler. It is a function that is called when the user visits the `/register` route. */
    .get('/register', register)
    .post('/register',upload.single('image'),validations, processRegister)
    .get('/login', login)

module.exports = router;
