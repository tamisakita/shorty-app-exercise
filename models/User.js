const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  cpf: { type: String, require: true, unique: true },
  password: { type: String, require: true, minlenght: 6 },
  role: { type: String, require: true, enum: ['user', 'admin'], default: 'user' }
},
{
  timestamps: true,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
