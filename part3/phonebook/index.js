//--> 3.10 phonebook backend step10
const express = require("express");
var morgan = require("morgan");
const cors = require("cors");
const app = express();

//Morgan middleware
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      `{"name":"${req.body.name}", "number":"${req.body.number}"}`,
    ].join(" ");
  })
);
app.use(express.json());
app.use(cors());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
    show: true,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
    show: true,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
    show: true,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
    show: true,
  },
  {
    name: "jim",
    number: "6",
    show: true,
    id: 5,
  },
];

app.get("/info", (req, res) => {
  res.send(
    `<h3>Phonebook has info for ${persons.length} people</h3>\n${new Date()}`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "The name or number is missing",
    });
  }

  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "The name already exists in the phonebook",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const matched = persons.some((person) => person.id === id);

  if (matched) {
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
