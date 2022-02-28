const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Todo", TodoSchema);
