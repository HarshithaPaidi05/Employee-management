const express = require('express');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { f_userName, f_Pwd } = req.body;

  try {
    const admin = await Admin.findOne({ f_userName, f_Pwd });
    if (!admin) return res.status(400).json({ msg: 'Invalid login credentials' });

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
