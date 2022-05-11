const res = require('express/lib/response');
const fs = require('fs');
const path = require('path');

const categories = require('../data/categories');
const products = require('../data/products.json');

module.exports = {
    add : (req,res) => {
        return res.render('productAdd',{
            categories
        })
    },
    store : (req,res) => {
        /**req.body devuelve un objeto con las claves y valor del formulario */
        let {name,price,category,state,origin} = req.body;
        let lastID = products[products.length - 1].id;
        /**Para que lo que agregue no sea diferente al formato que ya existe de array de objetos
         *  en data Vamos a usar el último id del array de productos en su propiedad length y se coloca
         *  length -1 para localizar la longitud total menos uno y el id es lo que necesito buscar */
      
        let newProduct =  {
            id: +lastID + 1,
            name : name.trim(),
            price: +price,
            category: +category,
            img: req.file ? req.file.filename : "noimage.jpeg",
            features : [origin,state]
        }

        products.push(newProduct);

        fs.writeFileSync(path.resolve(__dirname,'..','data','products.json'),JSON.stringify(products,null,3),'utf-8')

        return res.redirect('/')
          /* le asigno las propiedades que tendrá, siguiendo las mismas claves que el json 
        Recordar que todo lo que viene por req.body viene como string, viaja como json POR ESO lo parseamos con +*/
       /* usamos JSON.stringify y pasamos el products, un null y un 3 para darle una identación . Voy a aclarar la ruta con path,
         el __dirname que es el directorio actual , el ‘..’ para salir de allí y entrar a la carpeta data y allí el archivo products.json */
       
    },
    edit : (req,res) => {

        const {id} = req.params;  /* es un formulario, por eso llego con req.body */
        const product = products.find(product => product.id === +id);

        return res.render('productEdit',{
            categories,
            product
        })
    },
    update : (req,res) => {

        const {id} = req.params;
        let {name, price, category,state,origin} = req.body;

        const productsModify = products.map(product => {
            if(product.id === +id){
                let productModify = {
                    ...product,
                    name,
                    price : +price,
                    category : +category,
                    features: [origin,state],
                    img : req.file ? req.file.filename : product.img,
                }
                if(req.file){
                    if(fs.existsSync(path.resolve(__dirname,'..','public','images',product.img)) && product.img !== "noimage.jpeg"){
                        fs.unlinkSync(path.resolve(__dirname,'..','public','images',product.img))
                    }
                }
                return productModify
            }
            return product
        });

        fs.writeFileSync(path.resolve(__dirname,'..','data','products.json'),JSON.stringify(productsModify,null,3),'utf-8')

        return res.redirect('/')
    },
    detail : (req,res) => {
        /**si el idProduct que viene de la ruta product.js y es parametro de detail que esta en
         * index.ejs  <a href="/products/detail/1"> coincide con el id que tiene product en el 
         * array de productos requerido de data, va a renderizar la vista productDetail y va a mandar
         * el producto en la tabla
         */
        const {id} = req.params;
        const product = products.find(product => product.id === +id);
        
        return res.render('productDetail',{
            product
        })
    },
    cart : (req,res) => res.render('productCart'),
    getByCategory : (req,res) => {

        const {idCategory} = req.params;

        const {name, products} = categories.find(category => category.id === +idCategory);

        return res.render('categories',{
            name,
            products
        })
         /**esto hace que en el home muestre las card con el nombre de cada producto y muestre
             * tambien el producto. render lo manda al navegador
             */
    },
    search : (req,res) => {
        
        const {keyword} = req.query;
        /*recibo por req.query si se incluye en el nombre */
        const result = products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));
 /*     si se busca una marca "name" que no existe, devuelve un array vacío porque filter
         siempre devuelve un array */

        let namesCategories = categories.map(category => {
       /**map va a modificar el array, el id se reemplazará y también el nombre */

            return {
                id : category.id,
                name : category.name
            }
 /**segun el numero de categoria traigo el nombre de la categoria y lo mando a la vista */

        });

        return res.render('result',{
            products : result,
            keyword,
            namesCategories
        })
    },
    remove : (req,res) => {
        const {id} = req.params;

        const productFilter = products.filter(product => product.id !== +id);

        fs.writeFileSync(path.resolve(__dirname,'..','data','products.json'),JSON.stringify(productFilter,null,3),'utf-8')

        return res.redirect('/')

    }
}