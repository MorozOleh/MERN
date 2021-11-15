require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const picturesRoute = require('./routers/pictureRouter');
const authRoute = require('./routers/authRouter');
const inventoryRoute = require('./routers/inventoryRouter');
const exerciseRoute = require('./routers/exerciseRouter');
const postRoute = require('./routers/postsRouter');
const PORT = process.env.PORT || 8000;
const path = require('path');
const { connect } = require('./db/connection');

console.log(process.env.PORT);

connect();

app.use(cors());
app.use(express.json());
app.use('/api/inventory', inventoryRoute);
app.use('/api/exercise', exerciseRoute);
app.use('/api/pictures', picturesRoute);
app.use('/api/posts', postRoute);
app.use('/redirect', express.static('public'));
app.use('/api', authRoute);

app.get('/', (req, res) => {
  res.redirect('/redirect');
});

app.get('/redirect', (req, res) => {
  res.send('index.html');
});

// this is responsible from getting images from server;

app.get('/:id', (req, res) => {
  const { id } = req.params;

  const option = {
    root: path.join(__dirname),
  };

  const fileName = `images/${id}`;
  res.sendFile(fileName, option);
});

app.listen(PORT, () => {
  console.log(`port is ${PORT}`);
});
