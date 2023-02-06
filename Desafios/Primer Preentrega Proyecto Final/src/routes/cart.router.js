const {promises: fs} = require('fs')

const { Router } = require('express')

const routes =  Router()

const products = async () => {
    try {
        const productsFile = await fs.readFile('.src/products.json', 'utf8')
        const readFileProducts = JSON.parse(productsFile)
        return readFileProducts
    } catch (err) {
        console.log(err)
    }
}

// POST http://localhost:8080/api/cart/:productId

routes.post('/', (req, res) => {
    const { productId } = req.params
    let cart = []
    const idx = products.findIndex(product => product.id === productId)
    if (idx != products.length - 1) {
        return res.status(404).send({ message: 'Product not found' })
    }
    idx.push(cart)
    res.status(201).send({
        cart, 
        message: 'Added to Cart' 
    })
})

module.exports = routes




