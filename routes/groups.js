const express = require('express');
const router = express.Router();
const {
    auth,
    requiresAuth
} = require('express-openid-connect');



const groupsController = require('../controllers/groups');
const validation = require('../middleware/validate');

router.use(
    auth({
        authRequired: false,
    })
);

//Get all groups
router.get('/', groupsController.getAll);

//Get group by ID
router.get('/:id', groupsController.getSingle);

//Create a group
router.post('/', requiresAuth(), (req, res) =>
    validation.saveGroup, groupsController.createGroup);

//Update group based on ID
router.put('/:id', validation.saveGroup, groupsController.updateGroup);

//Delete group by ID
router.delete('/:id', groupsController.deleteGroup);

module.exports = router;