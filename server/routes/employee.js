const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') cb(null, true);
    else cb(new Error('Only jpg/png files are allowed'), false);
  },
});

router.post('/create', upload.single('f_Image'), async (req, res) => {
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
  const newEmployee = new Employee({
    f_Name,
    f_Email,
    f_Mobile,
    f_Designation,
    f_gender,
    f_Course: f_Course.split(','),
    f_Image: req.file.filename,
  });

  try {
    await newEmployee.save();
    res.json({ msg: 'Employee created successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
