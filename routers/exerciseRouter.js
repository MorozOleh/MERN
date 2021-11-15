const express = require('express');
const router = express.Router();
const ExercisesModel = require('../models/ExercisesModel');
const DoneExerciseModel = require('../models/DoneExerciseModel');

router.get('/', async (req, res) => {
  const { time, id } = req.query;

  try {
    const [row] = await ExercisesModel.findByDateAndId(time, id);
    const [done_exercises] = await DoneExerciseModel.findByPersonId(time, id);

    res.status(200).json({
      message: 'success',
      user: row[0],
      done_exercises,
    });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await ExercisesModel.findAll();

    res.json(rows);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.post('/', async (req, res) => {
  const { id } = req.body;

  try {
    const exercise = new ExercisesModel(id);

    if (!exercise.id) throw Error('id is missed');

    await exercise.save();

    res.status(201).json({ message: 'success' });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const exerciseDone = new DoneExerciseModel({ ...req.body });
    const [savedExercise] = await exerciseDone.save();

    const [[data]] = await DoneExerciseModel.findById(savedExercise.insertId);
    return res.status(201).json({ message: 'success', data });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

module.exports = router;
