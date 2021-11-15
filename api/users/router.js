const express = require('express')
const { checkUserId, validateUsers } = require('./middleware')
const router = express.Router()

const User = require('./model')

router.get('/', validateUsers, (req, res, next) => {
 return User
})

router.get('/:id', checkUserId, (req, res, next) => {
    
})

router.post('/', (req, res, next) => {
    
})

router.post('/:id', checkUserId, (req, res, next) => {
    
})

router.put('/', (req, res, next) => {
    
})

router.put('/:id', checkUserId, (req, res, next) => {
    
})

router.delete('/', (req, res, next) => {
    
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'something went wrong inside the routers',
        message: err.message,
        stack:err.stack,
    })
})

module.exports = router