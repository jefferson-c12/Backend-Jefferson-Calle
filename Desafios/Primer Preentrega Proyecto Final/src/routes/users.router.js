const { Router } = require('express')

const routes = Router()

const users = [
    {id: '1', name: 'A', surname: 'apellido', gender: 'M'},
    {id: '2', name: 'B', surname: 'apellido', gender: 'F'},
    {id: '3', name: 'C', surname: 'apellido', gender: 'M'},
    {id: '4', name: 'D', surname: 'apellido', gender: 'F'},
    {id: '5', name: 'F', surname: 'apellido', gender: 'M'},
    {id: '6', name: 'G', surname: 'apellido', gender: 'F'},
    {id: '7', name: 'H', surname: 'apellido', gender: 'F'}
]

// GET http://localhost:8080/api/users
routes.get('/',(req, res) => {
    res.status(200).send(users)
})

// POST http://localhost:8080/api/users
routes.post('/', (req, res) => {
    // manda el cliente request
    let newUser = req.body
    if (!newUser.name || !newUser.surname || !newUser.gender) {
        return res.status(400).send({ message: 'Not defined values required' })
    }
    console.log(newUser)
    users.push(newUser)
    res.status(201).send({
        newUser,
        message: 'user created'
    })
})

// PUT http://localhost:8080/api/users/:id
routes.put('/', (req, res) => {
    const { userId } = req.params
    const idx = users.findIndex(user => user.id === userId)
    if (idx === -1) {
        return res.status(404).send({ message: 'User Not Found' })
    } 
    let newUser = req.body
    if (!newUser.name || !newUser.surname || !newUser.gender) {
        return res.status(400).send({ message: 'Not defined values required' })
    }
    users[idx] = newUser
    res.status(201).send({
        newUser,
        message: 'user modified successfully'
    })
})

// DELETE http://localhost:8080/api/users/:id
routes.delete('/', (req, res) => {
    const { userId } = req.params
    let arraySize = users.length
    let newUsersArray = users.filter(user => user.id != userId)
    if (newUsersArray.length === arraySize) {
        res.status(404).send({ message: 'User not found' })
    }
    res.status(200).send({ message: 'User deleted successfully', newUsersArray })
})

module.exports = routes