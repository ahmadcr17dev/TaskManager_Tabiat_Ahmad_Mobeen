const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        default: '',
        maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    status: {
        type: String,
        enum: {
            values: ['todo', 'in-progress', 'done'],
            message: 'status must be todo, in-progress, or done',
        },
        default: 'todo',
    },
    priority: {
        type: String,
        enum: {
            values: ['low', 'medium', 'high'],
            message: 'Priority must be low, medium, or high'
        },
        default: 'medium'
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Task', TaskSchema);