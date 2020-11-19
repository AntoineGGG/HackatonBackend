const express = require('express');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 5000;
const producerList = require('./data/producer');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

let users = [
  {
    id: 0,
    username: 'test',
    email: 'test@test.com',
    password: '12345',
    city: 'Chicago',
    isProducer: false,
  },
];

const secretCode = 'secret';

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
    res.send(404);
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
    res.send(404);
  }
});

app.listen(PORT, (err) => {
  if (err) console.error(err);
  else console.log(`listening on port: ${PORT}`);
});
