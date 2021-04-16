const router = require('express').Router()
const auth = require('../middleware/auth')
const taskCtrl = require('../controllers/taskCtrl')

router.post('/create', taskCtrl.create)

router.get('/all_tasks', taskCtrl.getTask)

router.patch('/update', auth, taskCtrl.updateTask)

router.delete('/delete/:id', auth, taskCtrl.deleteTask)

module.exports = router