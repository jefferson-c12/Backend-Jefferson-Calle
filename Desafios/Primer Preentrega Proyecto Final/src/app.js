const express = require('express')
const usersRouter = require('./routes/users.router.js')
const productsRouter = require('./routes/products.router.js')
const cartRouter = require('./routes/cart.router.js')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/static', express.static(__dirname + 'public'))


// http://localhost:8080/api/users
app.use('/api/users', usersRouter)

// http://localhost:8080/api/products
app.use('/api/products', productsRouter)

app.use('/api/cart', cartRouter)


app.listen(PORT, err => {
    if (err) console.log(err)
    console.log(`Listening on port ${PORT}`)
})