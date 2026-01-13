const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email })
    if (userExists)
      return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    const token = jwt.sign(
      {id: user._id},
      process.env.JWT_SECRET,
      {expiresIn: '3d'}
    );

    res.status(201).json(
      {message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email
      }
      }
    );

  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
    }
    
    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    )

    res.json({ token,
      user: {
        id: user._id,
        email: user.email
      }
      }
    );

  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})



module.exports = router