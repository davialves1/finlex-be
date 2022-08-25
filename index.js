const express = require('express');
const app = express();
const cors = require('cors');

const data = [
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "regisration_date": "01/01/2019"
  },
  {
    "id": 2,
    "first_name": "Jane",
    "last_name": "Doe",
    "regisration_date": "01/01/2019"
  },
  {
    "id": 3,
    "first_name": "Davood",
    "last_name": "Majidi",
    "regisration_date": "02/08/2020"
  }
];

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello World")
});

app.get('/accounts', (req, res) => {
  res.send(data);
});

app.get('/accounts/:id', (req, res) => {
  const id = +req.params.id;
  const user = data.find((user) => user.id === id);
  res.send(user);
});

app.put('/accounts/:id', (req, res) => {
  const id = +req.params.id;
  const user = data.find((user) => user.id === id);

  if (!user) {
    res.send({message: 'User not found'});
    return;
  }
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  res.send(user);
});

app.post('/accounts/', (req, res) => {
  const date = new Date();
  const newUser = {
    id: data[data.length-1].id + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    regisration_date: date
  }
  data.push(newUser);
  res.send(newUser);
});

app.listen(8080, () => console.log('Server listening on port 8080'))
