import { MongoClient } from "mongodb"
import {uri}  from './atlas_uri'
export const client = new MongoClient(uri);
export const connectToDB = async () => {
  try {
    await client.connect();
    console.log(`Connected to Sublime Nov database 📖🎶🎶`);
  } catch (err) {
    console.log("Error occured when connecting to DB: " + err);
  }
};

