const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

//Get all groups
router.get('/', groupsController.getAll);

//Get group by ID
router.get('/:id', groupsController.getSingle);

//Create a group
router.post('/', groupsController.createGroup);

//Update group based on ID
router.put('/:id', groupsController.updateGroup);

//Delete group by ID
router.delete('/:id', groupsController.deleteGroup);

module.exports = router;