const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    completed: { type: Boolean },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Todo", TodoSchema);
