const db = require('../data/db-config')

const checkUserId = (req, res, next) => {
    return db('users')
}

const validateUsers = (req, res, next) => {
    return db('users')
}

module.exports = {
    checkUserId,
    validateUsers,
}