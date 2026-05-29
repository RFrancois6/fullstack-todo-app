const db = require('../db/database')

const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const deleteAllUsers = db.prepare(`DELETE FROM users`);
router.delete('/', (req, res) => {
    res.send('DELETE request on users/delete')
    deleteAllUsers.run()

    db.exec(`
        DROP TABLE users;
        CREATE TABLE IF NOT EXISTS users (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            email     TEXT    NOT NULL UNIQUE,
            password  TEXT    NOT NULL               
        );
  `)
})

const getUsers = db.prepare(`SELECT id, email FROM users`)
router.get('/', auth, (req, res) => {
    const users = getUsers.all()
    res.json(users)
})

const getUserByEmail = db.prepare(`SELECT * FROM users WHERE email = ?`)
router.get('/:email', auth, (req, res) => {
    res.send('GET ALL request on users')
    getUserByEmail.run(req.params[0])
})

module.exports = router