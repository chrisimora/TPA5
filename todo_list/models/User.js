const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama tidak boleh kosong"],
  },
  email: {
    type: String,
    required: [true, "Email tidak boleh kosong"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password tidak boleh kosong"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", userSchema);
