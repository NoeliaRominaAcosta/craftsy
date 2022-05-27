const { body } = require("express-validator")

module.exports = [
    body('name')
        .isLength({min : 5, max : 20}).withMessage('entre 5 y 20 caracteres').bail(),
    body('email')
        .isEmail().withMessage('email no válido').bail(),
    body('password')
        .isLength({min : 6, max : 10}).withMessage('entre 6 y 10 caracteres'),
    body('pais')
        .notEmpty().withMessage('el pais es obligatorio').bail()
        .isAlpha().withMessage('pais no válido'),
    body('password2')
        .custom((value,{req})=> {
            if(value !== req.body.password){
//si el valor de password 2 es diferente al password de arriba
                return false //no pasa la validacion
            }
            return true
        }).withMessage('contraseñas no coinciden'),
    body('checkbox')
        .isString('on')
        .withMessage('acepta terminos y condiciones')
]

