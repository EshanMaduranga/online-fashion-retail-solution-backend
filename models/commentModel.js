const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  pid: String,
  uid: String,
  orderId: String,
  comment: String,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
