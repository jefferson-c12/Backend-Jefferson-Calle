const { Router } = require('express')

const routes = Router()

const products = [
    {id: 1, name: 'product1', price: '1'},
    {id: 2, name: 'product2', price: '2'},
    {id: 3, name: 'product3', price: '3'},
    {id: 4, name: 'product4', price: '4'},
    {id: 5, name: 'product5', price: '5'},
    {id: 6, name: 'product6', price: '6'},
    {id: 7, name: 'product7', price: '7'},
    {id: 8, name: 'product8', price: '8'},
    {id: 9, name: 'product9', price: '9'}
]

// GET http://localhost:8080/api/products
routes.get('/', (req, res) => {
    res.status(200).send({ message: 'It`s OK'})
})

// POST http://localhost:8080/api/products
routes.post('/', (req, res) => {
    let newProduct = req.body
    if (!newProduct.name || !newProduct.price) {
        return res.status(400).send({ message: 'Not defined values required' })
    }
    users.push(newProduct)
    res.status(201).send({
        newProduct,
        message: 'user added successfully'
    })
})

// PUT http://localhost:8080/api/product/:id
routes.put('/', (req, res) => {
    const { productId } = req.params
    const idx = products.findIndex(product => product.id === productId)
    if (idx === -1) {
        return res.status(404).send({ message: 'Product Not Found' })
    } 
    let newProduct = req.body
    if (!newProduct.name || !newProduct.price) {
        return res.status(400).send({ message: 'Not defined values required' })
    }
    users[idx] = newProduct
    res.status(201).send({
        newProduct,
        message: 'product modified successfully'
    })
})

// DELETE http://localhost:8080/api/products/:id
routes.delete('/', (req, res) => {
    const { productId } = req.params
    let arraySize = products.length
    let newProductsArray = products.filter(product => product.id != productId)
    if (newProductsArray.length === arraySize) {
        res.status(404).send({ message: 'Product not found' })
    }
    res.status(200).send({ message: 'Product deleted successfully', newProductsArray })
})

module.exports = routes