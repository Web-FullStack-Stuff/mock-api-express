import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  testId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  }
});

const Test = mongoose.model("Test", TestSchema);

export default Test;