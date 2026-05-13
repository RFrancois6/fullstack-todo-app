const db = require('../db/database')

const express = require('express')
const router = express.Router()

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

const getUsers = db.prepare(`SELECT * FROM users`)
router.get('/', (req, res) => {
    res.send('GET ALL request on users')
    getUsers.run()
})

const getUserByEmail = db.prepare(`SELECT * FROM users WHERE email = ?`)
router.get('/:email', (req, res) => {
    res.send('GET ALL request on users')
    getUserByEmail.run(req.params[0])
})

module.exports = router