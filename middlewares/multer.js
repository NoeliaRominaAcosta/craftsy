const multer = require('multer');
const path = require('path');
/* MULTER */
const storage = multer.diskStorage({
    //diskstorage es un metodo de multer requerido arriba
    destination : (req,file,callback) => {
        //objeto literal
        callback(null,'public/images')
        // ruta donde se guarda la info que recibo. toma como referencia la raiz, por eso no lleva ./
    },
    filename : (req,file,callback) => {
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        
    }
})
const upload = multer({
    storage
    /*se hace cargo de lo que llega por formulario */
})

module.exports = upload;