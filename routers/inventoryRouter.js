const express = require('express');
const router = express.Router();
const InventoryModel = require('../models/InventoryModel');

router.get('/', async (req, res) => {
  const [inventories] = await InventoryModel.findAll();

  res.status(200).json(inventories);
});

router.post('/', async (req, res) => {
  const { name, description } = req.body;

  try {
    const inventory = new InventoryModel(name, description);
    await inventory.save();

    res.status(201).json({ message: 'success' });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

module.exports = router;
