const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @desc     Create new user
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please enter all fields')
  }

  const doesUserExist = await User.findOne({ email })

  if (doesUserExist) {
    res.status(400)
    throw new Error('User exists')
  }

  const hashSalt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, hashSalt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc     Auth user
// @route    POST /api/users/login
// @access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// @desc     Get user data
// @route    GET /api/users/me
// @access   Private
const getUserData = asyncHandler(async (req, res) => {
  res.json(req.user)
})

module.exports = {
  registerUser,
  loginUser,
  getUserData
}
