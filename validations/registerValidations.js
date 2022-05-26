const { body } = require("express-validator")

module.exports = [
    body('name')
        .notEmpty()
        .withMessage('el nombre es obligatorio'),
    body('email')
        .notEmpty()
        .withMessage('el email es obligatorio'),
    body('password')
        .notEmpty()
        .withMessage('contraseña obligatoria'),
    body('pais')
        .notEmpty()
        .withMessage('el pais es obligatorio'),
]

