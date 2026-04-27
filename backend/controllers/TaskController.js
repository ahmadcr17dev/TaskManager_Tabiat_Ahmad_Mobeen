const TaskSchema = require('../models/TaskModel');

// GET / TASKS
// This section of code will get all tasks with optional filtering by status and priority

const getTasks = async (req, res, next) => {
    try {
        const filters = {};

        // Add filters only if query params exists
        if (req.query.status) {
            filters.status = req.query.status;
        }
        if (req.query.priority) {
            filters.priority = req.query.priority;
        }

        // sort by newest first
        const tasks = await TaskSchema.find(filters).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
        });
    } catch (error) {
        next(error);
    }
}

// GET / tasks/:id
// This section of code will be used to reterive tasks by its ID

const getTasksByID = async (req, res, next) => {
    try {
        const task = await TaskSchema.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Not Found',
                message: 'Task Not Found',
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
}

// POST / Tasks
// This section of code will be used to post tasks to database

const createTask = async (req, res, next) => {
    try {
        const { title, description, status, priority } = req.body;

        // manual check for required title field
        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'Title is required'
            })
        }

        const task = new TaskSchema({ title, description, status, priority });
        const saved = await task.save();

        res.status(201).json({
            success: true,
            message: 'Task Created Successfully',
            data: saved,
        })
    } catch (error) {
        next(error)
    }
}

// PATCH / tasks/:id
// update one or more fields of an existing field
const UpdateTask = async (req, res, next) => {
    try {
        const { title, description, status, priority } = req.body

        const allowedUpdate = {}
        if (title !== undefined) allowedUpdate.title = title
        if (description !== undefined) allowedUpdate.description = description
        if (status !== undefined) allowedUpdate.status = status
        if (priority !== undefined) allowedUpdate.priority = priority

        if (Object.keys(allowedUpdate).length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'No valid fields provided to update',
            })
        }

        // Use Task not TaskSchema
        const task = await TaskSchema.findByIdAndUpdate(
            req.params.id,
            allowedUpdate,
            { new: true, runValidators: true }
        )

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Not Found',
                message: 'Task not found',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: task,
        })
    } catch (err) {
        console.error('Update error:', err.message)
        next(err)
    }
}

// DELETE / tasks/:id - Delete a task by ID
const deleteTask = async (req, res, next) => {
    try {
        // Log the id we're trying to delete
        console.log('Deleting task with id:', req.params.id)
        const task = await TaskSchema.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Not Found',
                message: 'Task Not Found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task Deleted Successfully',
        });
    } catch (error) {
        console.error('Delete error:', err.message);
        next(error);
    }
}

module.exports = { getTasks, getTasksByID, createTask, UpdateTask, deleteTask };