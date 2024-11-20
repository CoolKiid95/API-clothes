const express = require('express')
const router = express.Router()
//**** Ruta de los productos
const productsController = require('../controllers/products.controller')
router.get('/products', productsController.getProducts)
router.get('/product/:id', productsController.getOneProduct)
router.post('/addproduct', productsController.addProduct)
router.delete('/deleteproduct/:id',productsController.deleteProduct)


//********* Ruta de los usuarios
const userController = require('../controllers/users.controller')
router.get('/users', userController.getusers)
router.get('/user/:id', userController.getOneuser)
router.post('/adduser', userController.addUser)
router.delete('/deleteuser/:id', userController.deleteUser)

//********* Inicio de sesion
const loginController = require ('../controllers/login.controller')
router.post('/validacion', loginController.login)



module.exports = router