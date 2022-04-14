const express = require('express');
const router = express.Router();
const Carrito = require('../js/carrito');
const carrito = new Carrito();

router.post('/', (req, res) => {
    (async () => {
        const respuesta = await carrito.addCar();
        res.json(respuesta);
    })()
});

router.delete('/',(req, res) => {
    if(isNaN(req.body.id)){
        res.send('ERROR: Por favor ingrese un numero!!');
    }else{
        (async () => {
            const respuesta = await carrito.deleteCar(req.body.id);
            res.send(respuesta);
        })();
    }
});

router.get('/:id',(req, res) => {
    if(isNaN(req.params.id)){
        res.send('ERROR: Por favor ingrese un numero!!');
    }else{
        (async () => {
            const data = await carrito.getCar(req.params.id);
            res.send(data);
        })();
    }
});

router.post('/:idCar/:idProduct', (req, res) => {
    const idCar = parseInt(req.params.idCar);
    const idProduct = parseInt(req.params.idProduct);
    (async () => {
        const respuesta = await carrito.addProductCar(idCar,idProduct);
        res.send(respuesta);
    })()
});

router.delete('/:idCar/:idProduct', (req, res) => {
    const idCar = parseInt(req.params.idCar);
    const idProduct = parseInt(req.params.idProduct);
    (async () => {
        const respuesta = await carrito.deleteProductCar(idCar,idProduct);
        res.send(respuesta);
    })()
});

module.exports = router;