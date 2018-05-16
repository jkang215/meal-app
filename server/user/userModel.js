const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  // Array of meal objects
  meals: { type: Array, default: [] },
});

userSchema.pre('save', function (next) {
  const user = this;
  user.password = bcrypt.hashSync(user.password, SALT_WORK_FACTOR);
  console.log('hashed user password', user.password);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  console.log('comparing', candidatePassword, this.password);
  return bcrypt.compareSync(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
