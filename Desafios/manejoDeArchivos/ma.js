const {promises: fs} = require('fs')

class ProductManager {

    constructor() {
        this.products = []
    }

    getAll = async () => {
        try {
            const products = () => this.products
            const data = products()
            return data
        } catch(err) {
            console.log(err)
        } 
    }
        
    getById = async (id) => {
        try {
            const product = this.products.find(product => product.id === id)
            return product
        } catch(err) {
            console.log(err)
        }
    }
       
    addProducts = async (title, description, price, thumbnail, stock, id) => {
        try {
            const product = {
                title,
                description,
                price,
                thumbnail,
                stock,
                id
            }
            if(this.products.length === 0) {
                product.id = 1
            } else {
                product.id = this.products[this.products.length - 1].id +1
            }
            this.products.push(product)
            fs.appendFile('./products.json', JSON.stringify(product, null, 2))
        } catch (err) {
            console.log(err);
        }    
    }
    
    createFile = async () => {
        try {
            const fileContent = this.products
            const products = JSON.stringify(fileContent, null, 2)
            const data = await fs.writeFile('./products.json', `${products}`,'utf8')
            return data
        } catch (err) {
            console.log(err)
        }
    }

    deleteAll = async () => {
        try {
            fs.unlink('./products.json', err => {
                if(err) {
                    console.log(err)
                } else {
                    console.log('File deleted')
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

}

const productManager = new ProductManager()

productManager.addProducts('Manzana','LoremIpsum', 500, 'NotFound', 3)
productManager.addProducts('Pera','LoremIpsum', 200, 'NotFound', 6)
productManager.addProducts('Naranja','LoremIpsum', 350, 'NotFound', 9)
productManager.addProducts('Sandia','LoremIpsum', 400,'NotFound', 2)

// console.log(productManager.getAll())
// console.log(productManager.getById(1))
// productManager.createFile()
console.log(productManager.deleteAll())











