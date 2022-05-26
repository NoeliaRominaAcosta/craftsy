const categories = require('../data/categories.json')

module.exports = {
    add : (req,res) => {
        res.render('categoriesAdd')
    },
    list : (req,res) => {
       return res.render('./admin/adminCategories',{
           categories : categories_db
       })
},
    edit : (req,res) =>{
         res.render('categoriesEdit')
    },
    update : (req,res) => {
       
    },
    remove : (req,res) => {
       
    },
    store : (req,res) => {
        
    }

}