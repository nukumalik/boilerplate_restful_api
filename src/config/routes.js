const router = require('express').Router()

router.use('/users', require('../routes/users')).use('/profiles', require('../routes/profiles'))

module.exports = router
