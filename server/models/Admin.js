const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  f_userName: { type: String, required: true, unique: true },
  f_Pwd: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
