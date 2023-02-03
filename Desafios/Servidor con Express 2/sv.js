//import express from 'express'
const express = require('express')

const app = express()
const PORT = 8080

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const users = [
    {id: '1', name: 'A', surname: 'apellido', gender: 'M'},
    {id: '2', name: 'B', surname: 'apellido', gender: 'F'},
    {id: '3', name: 'C', surname: 'apellido', gender: 'M'},
    {id: '4', name: 'D', surname: 'apellido', gender: 'F'},
    {id: '5', name: 'F', surname: 'apellido', gender: 'M'},
    {id: '6', name: 'G', surname: 'apellido', gender: 'F'},
    {id: '7', name: 'H', surname: 'apellido', gender: 'F'}
]

// http://localhost:8080/
app.get('/', (req, res) => {
    res.send('<h1 style="color:#4f4fff"> Welcome <h1>')
})

// http://localhost:8080/api/users
app.get('/api/users', (req, res) => {
    res.status(200).send(users)
})

// http://localhost:8080/users/:userId
app.get('/users/:userId', (req, res) => {
    const { userId } = req.params
    const user = users.find(user => user.id === userId)
    if (!user) return res.send(404)
    res.send(user)
})

// http://localhost:8080/query
app.get('/query', (req, res) => {
    console.log(req.query);
    const { gender } = req.query
    //consulta para cuando genero no esta definido o es indistinto de F o M
    if (!gender || gender != 'M' && gender != 'F'){ 
        return res.send(users)
    }

    let usersFiltered = users.filter(user => user.gender === gender)

    return res.send({
        usersFiltered
    })  
})

// http://localhost:8080/api/users
app.post('/api/users', (req, res) => {
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

// http://localhost:8080/api/users/:id
app.put('/api/users/:userId', (req, res) => {
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

app.delete('/api/users/:userId', (req, res) => {
    const { userId } = req.params
    let arraySize = users.length
    let newUsersArray = users.filter(user => user.id != userId)
    if (newUsersArray.length === arraySize) {
        res.status(404).send({ message: 'User not found' })
    }
    res.status(200).send({ message: 'User deleted successfully', newUsersArray })
})

app.listen(PORT, err => {
    if (err) console.log(err)
    console.log(`Listening on port ${PORT}`)
})