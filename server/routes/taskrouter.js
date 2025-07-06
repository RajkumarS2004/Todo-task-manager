const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask, 
  shareTask,
  getTaskById 
} = require('../controllers/taskControllers');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// Task CRUD operations
router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

// Task sharing
router.post('/:id/share', shareTask);

module.exports = router;
