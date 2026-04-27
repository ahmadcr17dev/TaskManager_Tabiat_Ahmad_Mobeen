const express = require('express');
const router = express.Router();
const { getTasks, getTasksByID, createTask, UpdateTask, deleteTask } = require('../controllers/TaskController');
const apiKeyAuth = require('../middleware/apiKeyAuth');

// Apply API key auth to all routes in this router
router.use(apiKeyAuth);

// Task Routes
router.get('/', getTasks);  // GET TASKS
router.get('/:id', getTasksByID);  // GET TASK BY ID
router.post('/', createTask);  // POST TASKS
router.patch('/:id', UpdateTask);  // PATCH/UPDATE TASKS BY ID
router.delete('/:id', deleteTask);  // DELETE TASKS BY ID

module.exports = router;