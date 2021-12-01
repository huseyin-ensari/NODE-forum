const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({

    title : {
        type : String,
        required : [true, "Please provide a title"],
        unique : true
    },
    content : {
        type : String,
        require : [true, "Please provide a content"]
    },
    slug : String,
    createdAt = {
        type : Date,
        default : Date.now
    },
    user : {
      type : mongoose.Types.ObjectId,
      require : true,
      ref : "User"
    }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;