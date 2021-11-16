const express = require('express')
const { checkClassId, validateClasses } = require('./middleware')
const router = express.Router()

const Classes = require('./model')

router.get('/', validateClasses, (req, res, next) => {
 return Classes
})

router.get('/:id', checkClassId, (req, res, next) => {
    
})

router.post('/', (req, res, next) => {
    
})

router.post('/:id', checkClassId, (req, res, next) => {
    
})

router.put('/', (req, res, next) => {
    
})

router.put('/:id', checkClassId, (req, res, next) => {
    
})

router.delete('/', (req, res, next) => {
    
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'something went wrong inside the  class routers',
        message: err.message,
        stack:err.stack,
    })
})

module.exports = router