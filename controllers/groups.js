const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  // #swagger.description = 'Get a list of all groups'
  mongodb
    .getDb()
    .db()
    .collection('groups')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
  });
};

const getSingle = (req, res) => {
  // #swagger.description = 'Get a single group'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid group id to find a group.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('groups')
    .find({ _id: userId })
    .toArray((err, lists) =>{
      if (err) {
        res.status(400).json({ message: err });
      }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createGroup = async (req, res) => {
  // #swagger.description = 'Create a group'
  const group = {
    name: req.body.name,
    team1: req.body.team1,
    team2: req.body.team2,
    team3: req.body.team3,
    team4: req.body.team4
  };
  const response = await mongodb.getDb().db().collection('groups').insertOne(group);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the group.');
  }
};

const updateGroup = async (req, res) => {
  // #swagger.description = 'Update a group'
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const group = {
    name: req.body.name,
    team1: req.body.team1,
    team2: req.body.team2,
    team3: req.body.team3,
    team4: req.body.team4
  };;
  const response = await mongodb
    .getDb()
    .db()
    .collection('groups')
    .replaceOne({ _id: userId }, group);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the group.');
  }
};

const deleteGroup = async (req, res) => {
  // #swagger.description = 'Delete a group'
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('groups').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the group.');
  }
};

module.exports = { getAll, getSingle, createGroup, updateGroup, deleteGroup };