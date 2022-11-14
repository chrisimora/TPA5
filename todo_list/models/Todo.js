const mongoose = require("mongoose");

const toDoSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Judul tidak boleh kosong"],
  },
  description: {
    type: String,
    required: [true, "Deskripsi tidak boleh kosong"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", toDoSchema);
