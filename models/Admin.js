const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = Admin = mongoose.model("admin", AdminSchema, "admin");
