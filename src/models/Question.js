const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    unique: true,
  },
  content: {
    type: String,
    require: [true, 'Please provide a content'],
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'User',
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
  answers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Answer',
    },
  ],
});

QuestionSchema.pre('save', function (next) {
  if (!this.isModified('title')) {
    next();
  }

  this.slug = this.makeSlug();
  next();
});

QuestionSchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
