const express = require('express');
const router = express.Router();

const { add, list, update, remove, edit, store } = require('../controllers/categoriesController');

/* /categories*/
router
    .get('/add', add)
    .post('/add', store)
    .get('/list', list)
    .get('/edit/:id', edit)
    .put('/update/:id', update)
    .delete('/delete', remove)
    

module.exports = router;
