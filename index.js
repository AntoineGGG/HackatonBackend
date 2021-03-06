const express = require('express');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 5000;
let producerList = require('./data/producer');
const users = require('./data/users');
const cors = require('cors');
const e = require('express');

const app = express();

app.use(express.json());
app.use(cors());

const secretCode = 'secret';

app.get('/test', (req, res) => {
  res.sendStatus(200);
});

app.post('/signup', (req, res) => {
  const {
    username,
    email,
    password,
    confirmPassword,
    checkSecretCode,
    city,
    isProducer,
  } = req.body;

  let checkUsers = users.filter(
    (user) => user.username === username || user.email === email
  );

  if (checkSecretCode !== secretCode) {
    res.status(403).send({
      message: 'Wrong secret code',
    });
  } else if (checkUsers.length > 0) {
    res.status(403).send({
      message: 'This user is already registered',
    });
  } else if (password !== confirmPassword) {
    res.status(403).send({
      message: 'Password and confirm password do not match',
    });
  } else if (!username) {
    res.status(403).send({
      message: 'Please provide a valid username',
    });
  } else if (!email) {
    res.status(403).send({
      message: 'Please provide a valid email',
    });
  } else if (!city) {
    res.status(403).send({
      message: 'Please provide a city',
    });
  } else {
    users.push({ id: uuidv4(), username, email, password, city, isProducer });
    console.log(users);

    res.json({
      username,
      email,
      city,
    });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  let checkLogin = users.filter(
    (user) => user.username === username && user.password === password
  );

  console.log(checkLogin);
  if (checkLogin.length > 0) {
    let userData = {
      username: checkLogin[0].username,
      email: checkLogin[0].email,
      email: checkLogin[0].email,
      city: checkLogin[0].city,
      isProducer: checkLogin[0].isProducer,
      orders: checkLogin[0].orders,
      litiges: checkLogin[0].litiges,
      feedbacks: checkLogin[0].feedbacks,
    };

    res.json(userData);
  } else {
    res.sendStatus(403);
  }
});

// Trying to modify the quantity from a post request...but it's so fucking late....
app.post('/producer', (req, res) => {
  const { id, stock } = req.query;
  let alcoholToModify = producerList.filter(
    (product) => product.id === parseInt(id)
  );
  alcoholToModify[0].stock = parseInt(stock);
  console.log(producerList);
  res.sendStatus(200);
});

app.get('/producerList', (req, res) => {
  res.status(200).json(producerList);
});

app.get('/search', (req, res) => {
  const { alcohol } = req.query;
  let filteredAlcohol = producerList.filter(
    (e) => e.alcohol.toLowerCase() === alcohol.toLowerCase()
  );
  if (filteredAlcohol.length > 0) {
    res.status(200).send(filteredAlcohol);
  } else {
    res.status(404).send('No result');
  }
});
app.get('/search', (req, res) => {
  const { location } = req.query;
  let filteredLocation = producerList.filter(
    (e) => e.location.toLowerCase() === location.toLowerCase()
  );
  if (filteredLocation.length > 0) {
    res.status(200).send(filteredLocation);
  } else {
    res.send(404).send('No result');
  }
});

app.listen(PORT, (err) => {
  if (err) console.error(err);
  else console.log(`listening on port: ${PORT}`);
});
