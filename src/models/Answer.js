const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require('./Question');

const AnswerSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Please provide a content'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  question: {
    type: mongoose.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
});

AnswerSchema.pre('save', async function (next) {
  if (!this.isModified('user')) return next();

  try {
    const question = await Question.findById(this.question);

    question.answers.push(this._id);
    await question.save();

    next();
  } catch (err) {
    return next(err);
  }
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
