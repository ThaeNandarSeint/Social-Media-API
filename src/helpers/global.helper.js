/* eslint-disable no-console */
const { ZodError } = require('zod');
const { envSchema } = require('../schemas/env.schema');
const mongoose = require('mongoose');
const { MONGODB_URL, DATABASE_NAME } = require('../constants/env.constant');

const validateEnvVariables = () => {
  try {
    const runTime = process.env;
    envSchema.parse(runTime);
    console.log('Env variables validation completed.');
  } catch (error) {
    console.log('Env variables validation failed.');
    if (error instanceof ZodError) {
      console.log('Missing/Invalid variables:');
      console.log('##########################');

      error.errors.forEach(({ path }, idx) =>
        console.log(`${idx + 1}. ${path[0]}`)
      );
    }
    process.exit(1);
  }
};

const connectDatabase = async () => {
  try {
    mongoose.set('strictQuery', false);

    await mongoose.connect(MONGODB_URL, {
      dbName: DATABASE_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB.');
  } catch (error) {
    console.log('Error while connecting to MongoDB');
    console.error(error);
  }
};

const createCustomId = ({ modelName, prefix, fieldName }) => {
  return async function () {
    if (!this.isNew) return;

    const [lastDoc] = await this.$model(modelName)
      .find()
      .sort({ _id: -1 })
      .limit(1);

    if (!lastDoc) {
      this[fieldName] = `${prefix}-001`;
      return;
    }
    const lastDocIdNumber = parseInt(lastDoc[fieldName].split('-')[1], 10);

    this[fieldName] = `${prefix}-${(lastDocIdNumber + 1)
      .toString()
      .padStart(3, '0')}`;
    return;
  };
};

module.exports = {
  validateEnvVariables,
  connectDatabase,
  createCustomId,
};
