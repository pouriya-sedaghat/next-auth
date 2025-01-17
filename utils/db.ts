import mongoose from "mongoose";

async function connect(): Promise<void> {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");

    console.log("Connected.");
  } catch (err) {
    console.log(err);

    throw new Error("Faild To Connect.");
  }
}

const db = { connect };

export default db;
