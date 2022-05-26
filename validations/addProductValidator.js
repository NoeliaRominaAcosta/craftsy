const { body} = require('express-validator')

module.exports =[
    body('name')
        .notEmpty()
        .withMessage('nombre es obligatorio')
        .isLength({ min : 3, max : 20})
        .withMessage('minimo 3 caracteres, maximo 20'),
    body('price')
        .notEmpty()
        .withMessage('precio es obligatorio'),
    body('category')
        .notEmpty()
        .withMessage('categoria es obligatoria'),
    body('origin')
        .notEmpty()
        .withMessage('origen es obligatorio'),
    body('state')
        .notEmpty()
        .withMessage('estado es obligatorio'),
]