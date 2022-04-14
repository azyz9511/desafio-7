const express = require('express');
const router = express.Router();
const Productos = require('../js/productos');
const productos = new Productos();

// cambiar a false para quitar permisos de admin a las peticiones y viceversa
const admin = true;

router.get('/', (req, res) => {
    (async () => {
        const data = await productos.listAll();
        res.send(data);
    })()
});

router.get('/:id',(req, res) => {
    if(isNaN(req.params.id)){
        res.send('ERROR: Por favor ingrese un numero!!');
    }else{
        (async () => {
            const data = await productos.listById(req.params.id);
            res.send(data);
        })();
    }
});

router.post('/',(req, res, next) => {
        if (admin === true){
            next();
        }else{
            res.send('Lo sentimos, no tienes permisos para la ruta /api/productos metodo "Agregar producto"');
        }
    },
    (req, res) => {
    (async () => {
        const respuesta = await productos.addProduct(req.body);
        res.send(respuesta);
    })()
});

router.put('/',(req, res, next) => {
        if (admin === true){
            next();
        }else{
            res.send('Lo sentimos, no tienes permisos para la ruta /api/productos metodo "Editar producto"');
        }
    },
    (req, res) => {
    (async () => {
        const respuesta = await productos.editProduct(req.body);
        res.send(respuesta);
    })()
});

router.delete('/',(req, res, next) => {
        if (admin === true){
            next();
        }else{
            res.send('Lo sentimos, no tienes permisos para la ruta /api/productos metodo "Eliminar producto"');
        }
    },
    (req, res) => {
    if(isNaN(req.body.id)){
        res.send('ERROR: Por favor ingrese un numero!!');
    }else{
        (async () => {
            const respuesta = await productos.deleteProduct(req.body.id);
            res.send(respuesta);
        })();
    }
});

module.exports = router;