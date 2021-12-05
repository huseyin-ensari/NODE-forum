const User = require('./src/models/User');
const Question = require('./src/models/Question');
const Answer = require('./src/models/Answer');
const fs = require('fs');
const CustomError = require('./src/helpers/errors/customError');

require('dotenv').config({ path: './src/configs/.env' });

const path = './src/dummy/';

const users = JSON.parse(fs.readFileSync(path + 'users.json'));
const questions = JSON.parse(fs.readFileSync(path + 'questions.json'));
const answers = JSON.parse(fs.readFileSync(path + 'answers.json'));

require('./src/configs/dbConnection');

const importAllData = async function () {
  try {
    await User.create(users);
    await Question.create(questions);
    await Answer.create(answers);
    console.log('Import Process Successful');
  } catch (err) {
    console.log(err);
    console.err('There is a problem with import process');
  } finally {
    process.exit();
  }
};

const deleteAllData = async function () {
  try {
    await User.deleteMany();
    await Question.deleteMany();
    await Answer.deleteMany();
    console.log('Delete Process Successful');
  } catch (err) {
    console.log(err);
    console.err('There is a problem with delete process');
  } finally {
    process.exit();
  }
};

if (process.argv[2] == '--import') {
  importAllData();
} else if (process.argv[2] == '--delete') {
  deleteAllData();
}
