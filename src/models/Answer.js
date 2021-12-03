const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
