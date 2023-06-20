const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://gudwanisarthak2000:sarthakgudwani@cluster0.ewmpxw5.mongodb.net/StackAd?retryWrites=true&w=majority';

async function connectToDatabase() {
  try {
    const connection = await mongoose.createConnection(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database!');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = connectToDatabase;
