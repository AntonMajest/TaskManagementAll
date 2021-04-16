const mongoose = require('mongoose')


const taskShema = new mongoose.Schema({
    userId: {
        type: String,
        trim:true,
    },
    title: {
        type: String,
        required: [true, "Please enter the title!"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter the description!"],
        trim: true,
    },
    isDone: {
        type: Boolean,
        trim: true,
    },
    priority: {
        type: Number,
        required: [true, "Please enter the priority!"],
        trim: true,
    },
    dueDate: {
        type: Date,
        required: [true, "Please enter the date!"],
        trim: true,
    },
}, {
    timestamps: true
})

const Task = mongoose.model('Tasks', taskShema);
module.exports = Task;