const db = require('../data/db-config')

const checkClassId = (req, res, next) => {
    return db('classes')
}

const validateClasses = (req, res, next) => {
    return db('classes')
}

module.exports = {
    checkClassId,
    validateClasses,
}