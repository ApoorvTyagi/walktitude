const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (_req, res) => {
    res.redirect('/login')
})

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) return next(err)
        res.redirect('/')
    })
})

module.exports = router