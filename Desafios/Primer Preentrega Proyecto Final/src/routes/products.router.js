const {promises: fs} = require('fs')

const { Router } = require('express')

// -------------------------------POSTMAN---------------------------------

const routes = Router()

const products = async () => {
    try {
        const productsFile = await fs.readFile('.src/products.json', 'utf8')
        const readFileProducts = JSON.parse(productsFile)
        return readFileProducts
    } catch (err) {
        console.log(err)
    }
}


// GET http://localhost:8080/api/products
routes.get('/', (req, res) => {
    res.status(200).send({ message: 'It`s OK'})
})

// POST http://localhost:8080/api/products
routes.post('/', (req, res) => {
    let newProduct = req.body
    if (!newProduct.thumbnail) {
        return newProduct.thumbnail = 'Not Found'
    }
    if (!newProduct.name || !newProduct.desc || !newProduct.price || !newProduct.stock) {
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