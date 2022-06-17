const express = require("express");
const cors = require("cors");

const app = express();
const logger = require("./loggerMiddleware");

app.use(cors());

app.use(express.json());

app.use(logger);

let info = [
  { Nombre: "Brayan", id: 1 },
  { Nombre: "Raul", id: 2 },
  { Nombre: "Erick", id: 3 },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/usuarios", (req, res) => {
  res.json(info);
});

app.get("/api/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = info.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(400).end();
  }
});

app.delete("/api/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  info = info.filter((user) => user.id !== id);
  res.status(204).end();
});

app.post("/api/usuarios", (req, res) => {
  const user = req.body;

  const ids = info.map((user) => user.id);
  const maxId = Math.max(...ids);

  const newUser = {
    id: maxId + 1,
    name: user.name,
  };

  info = [...info, newUser];
  res.status(201).json(newUser);
});

app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
