const mongoose = require('mongoose');

const { createCustomId } = require('../helpers/global.helper');
const { CONNECTION_STATUSES } = require('../constants/connection.constant');

const Schema = mongoose.Schema;

const connectionSchema = new Schema(
  {
    connectionId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    friend: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: [...Object.values(CONNECTION_STATUSES)],
      default: CONNECTION_STATUSES.PENDING,
    },
    accepted_at: {
      type: Date,
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

connectionSchema.pre(
  'validate',
  createCustomId({
    modelName: 'Connection',
    prefix: 'Connection',
    fieldName: 'connectionId',
  })
);

const Connection = mongoose.model(
  'Connection',
  connectionSchema,
  'connections'
);

module.exports = Connection;
