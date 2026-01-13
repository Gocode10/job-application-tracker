const express = require('express');
const Job = require('../models/job');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// GET jobs
router.get('/', authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
});

// CREATEjob
router.post('/', authMiddleware, async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      userId: req.user
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create job' });
  }
});

// UPDATE job
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update job' });
  }
});

// DELETE job
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      userId: req.user
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete job' });
  }
});

module.exports = router;
