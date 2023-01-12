

class ProductManager {
	constructor() {
		this.productos = []
	}
	getProductos = () => this.productos
	getProductosById = (code) => {
		return this.productos.find(producto => producto.code === code )
	}
	addProductos = (title, description, price, thumbnail, stock, code) => {
		const producto = {
			title,
			description,
			price,
			thumbnail,
			stock,
			code
		}
		if(this.productos.length === 0) {
			producto.code = 1
		} else {
			producto.code = this.productos [this.productos.length - 1].code + 1
		}
		this.productos.push(producto)
	}
}

const productManager = new ProductManager()

productManager.addProductos('Manzana','LoremIpsum', 500, 'Sin imagen', 3)
productManager.addProductos('Pera','LoremIpsum', 100, 'Sin imagen', 4)

console.log(productManager.getProductos());
console.log(productManager.getProductosById(1));

