const db = require('../db/database')

const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const insertTodo = db.prepare(`INSERT INTO todos (user_id, title, done) VALUES (?, ?, ?)`)
router.post('/', auth, (req, res) => {
    insertTodo.run(req.user.user_id, req.body.title, 0)
    res.status(201).end()
})

const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
router.get('/', auth, (req, res) => {
    const todos = getTodos.all(req.user.user_id)
    res.json(todos)
})

const updateTodo = db.prepare(`UPDATE todos SET done = ? WHERE id = ? AND user_id = ?`)
router.patch('/:id', auth, (req, res) => {
    updateTodo.run(req.body.done ? 1 : 0, req.params.id, req.user.user_id)
    res.status(200).end()
})

const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`)
router.delete('/:id', auth, (req, res) => {
    deleteTodo.run(req.params.id, req.user.user_id)
    res.status(200).end()
})

module.exports = router
