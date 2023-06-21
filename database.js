const connectToDatabase = require('./connectToDatabase');
const mongoose = require('mongoose'); 
const { Types } = require('mongoose');

async function getData() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error('Failed to connect to the database');
    }
    const itemsCollection = db.collection('items') || db.model('items');
    if (!itemsCollection) {
      throw new Error('Collection "items" not found');
    }
    const data = await itemsCollection.find().toArray();
    return data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
}

async function insertData(data) {
  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error('Failed to connect to the database');
    }
    const itemsCollection = db.collection('items') || db.model('items');
    if (!itemsCollection) {
      throw new Error('Collection "items" not found');
    }

    const newData = { ...data, _id: Types.ObjectId() };

    await itemsCollection.insertOne(newData);
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
}

module.exports = { getData, insertData };
