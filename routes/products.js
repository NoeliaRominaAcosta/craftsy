const upload = require('../middlewares/multer')
const express = require('express');
const router = express.Router();
const validationProducts = require('../validations/addProductValidator')

//const controlador = require('../controllers/productController')
const {cart,detail,getByCategory, search, add, store,edit, update,remove, list} = require('../controllers/productController');

/* /products */
router
    .get('/add',add)
    .post('/add',upload.single('image'),validationProducts,store)
    .get('/edit/:id',edit)
    .put('/update/:id',upload.single('image'),validationProducts,update)
    //upload llega como middleware. single hace referencia a un solo archivo. image es el name del input. multer ataja lo que viene en paralelo al formato texto
    .get('/cart', cart)
    .get('/detail/:id', detail)
    .get('/category/:idCategory/:idProduct?',getByCategory)
    .get('/search',search)
    .delete('/remove/:id',remove)
    .get('/list', list)

module.exports = router;
