const db = require('../db/database')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const insertUser = db.prepare(`INSERT INTO users (email, password) VALUES (?, ?)`)

router.post('/register', (req, res) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return res.status(500).end()
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.status(500).end()
            insertUser.run(req.body.email, hash)
            res.status(201).end()
        })
    })
})

const getUser = db.prepare(`SELECT * FROM users WHERE email = ?`)

router.post('/login', (req, res) => {
    const userData = getUser.get(req.body.email)
    if (userData === undefined) {
        return res.status(401).end()
    }
    bcrypt.compare(req.body.password, userData.password, (err, result) => {
        if (err || !result) {
            return res.status(401).end()
        }
        const token = jwt.sign(
            { user_id: userData.user_id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        )
        res.setHeader("Authorization", `Bearer ${token}`)
        res.json(token)
    })
})

module.exports = router