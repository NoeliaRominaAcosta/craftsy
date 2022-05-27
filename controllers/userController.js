const {validationResult} = require('express-validator')
const fs = require('fs')
const path = require('path')
const usuarios = require('../data/users.json')
module.exports = {
    register : (req,res) => res.render('register'),
    processRegister : (req,res) => {
        //return res.send(req.body) lo que viene por form
        const errors = validationResult(req)
        if(errors.isEmpty()){
            let {name, password, email, pais} = req.body; 

            let lastID = usuarios.length !== 0 ? usuarios[usuarios.length - 1].id : 0;
            //si hay usuarios en el array, traeme el ultimo id. si no, el id será 0
          
            let newUser=  {
                id: +lastID + 1,
                name : name.trim(),
                email,
                password,
                pais : pais.trim()
            }
    
            usuarios.push(newUser);
    
            fs.writeFileSync(path.resolve(__dirname,'..','data','users.json'),JSON.stringify(usuarios,null,3),'utf-8')
    
            return res.redirect('/')
           
            
        }else{
            return res.render('register',{
                old : req.body,
                errors : errors.mapped()
            })
        }
       

    },
    login : (req,res) => res.render('login')
}