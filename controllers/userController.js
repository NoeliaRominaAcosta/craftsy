const {validationResult} = require('express-validator')

module.exports = {
    register : (req,res) => res.render('register'),
    processRegister : (req,res) => {
        //return res.send(req.body) lo que viene por form
/* The above code is using the validationResult method to check if there are any errors in the request. */
    const resultValidation = validationResult(req)
        //resultValidation es un objeto literal en ruta
 
    if( resultValidation.errors.length > 0){
        return res.render('register', {
            errors : resultValidation.mapped()
            //mapped lo convierte en un objeto literal
        })
    }
    },
    login : (req,res) => res.render('login')
}