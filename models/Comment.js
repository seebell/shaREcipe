const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String, required: true, trim: true },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;