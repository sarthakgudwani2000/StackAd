const express = require('express');
const connectToDatabase = require('./connectToDatabase');
const { getData, insertData } = require('./database');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/items', async (req, res) => {
  try {
    const data = await getData();
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const { data } = req.body;
    await insertData(data);
    res.json({ message: 'Data inserted successfully!' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to insert data' });
  }
});

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  await connectToDatabase();
});
