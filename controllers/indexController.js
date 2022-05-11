const fs = require('fs');
const path = require('path')
const tutorials = require('../data/tutorials');
const products = require('../data/products.json')
module.exports = {
    index: (req, res) => {

        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','products.json')));
 /* está requerido el json pero siempre traerá la versión vieja y no se va a actualizar en la vista Vamos a requerir fs y colocar una
      nueva variable products con el fs de readFileSync. Cada vez que se ejecute el método index, leerá el archivo json */
     
        const celulares = products.filter(product => product.category === 1);
        const tablets = products.filter(product => product.category === 2);
        const computadoras = products.filter(product => product.category === 3);

        return res.render('index', {
            celulares,
            tablets,
            computadoras,
            tutorials
        })
        /**esto hace que en el home muestre las card con el nombre de cada producto y muestre
             * tambien las categorias. render lo manda al navegador
             */
    }
}

/* res.locals */