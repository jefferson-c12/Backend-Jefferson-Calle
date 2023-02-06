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





