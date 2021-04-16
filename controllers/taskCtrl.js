const Tasks = require('../models/taskModel')
const jwt = require('jsonwebtoken')

const taskCtrl = {
    create: async (req, res) => {
        try {
            // jwt.verify(req.cookies.refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            //     if (err) return res.status(401).json({
            //       title: 'not authorized'
            //     });  
            //   })

            //   const {title, description, priority, duedate} = task

            //   const newTask = new Task({
            //     title, description, priority, duedate
            // })

            const {userId,title, description, priority, dueDate} = req.body

            const newTask = new Tasks({
                userId,title,description,isDone: false,priority, dueDate
            })
           
            await newTask.save()
            
            res.json({msg:"Create success"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getTask: async (req, res) => {
            // now we know token is valid
            try {
                const task = await Tasks.find({userId: req.headers.authorization})
          
                res.json(task)
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
    },
    updateTask: async (req, res) => {
        try {
            const { title, description, isDone, priority, dueDate} = req.body
            await Tasks.findOneAndUpdate({_id: req.body.id}, {
                title, description, isDone, priority, dueDate
            })
            

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteTask: async (req, res) => {
        try {
            await Tasks.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = taskCtrl