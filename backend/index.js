const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes');
const { connectToPostgres, disconnectFromPostgres } = require('./db');

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

connectToPostgres();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Gracefully disconnect from PostgreSQL when the server is stopped
process.on('SIGINT', async () => {
  await disconnectFromPostgres();
  process.exit();
});
