const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { createCustomId } = require('../helpers/global.helper');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      required: true,
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    avatar: {
      url: String,
      key: String,
      filename: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

userSchema.pre(
  'validate',
  createCustomId({
    modelName: 'User',
    prefix: 'U',
    fieldName: 'userId',
  })
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  if (!this.getUpdate().password) return next();

  this.getUpdate().password = await bcrypt.hash(this.getUpdate().password, 12);
  next();
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
