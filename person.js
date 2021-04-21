const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/personApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});

personSchema.virtual("fullName").set(function (val) {
  this.first = val.split(" ")[0];
  this.last = val.split(" ")[1];
});

personSchema.pre("save", function () {
  this.first = "KIRYU";
  this.last = "CHAAANNNN";
  console.log("Before save...");
});

personSchema.post("save", function () {
  console.log("After save!");
});

const Person = mongoose.model("Person", personSchema);
