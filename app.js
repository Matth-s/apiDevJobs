const express = require("express");
const data = require("./data.json");
const app = express();

//////////////////////////////////
// permettre l'accès à l'API (CORS)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token,Origin, X-Requested-With, Content, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).json(data);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;

  const foundItem = data.filter((item) => item.id === parseInt(id));

  if (foundItem.length > 0) {
    res.status(200).send(foundItem);
  } else {
    res.status(404).send({ message: "Object not found" });
  }
});


module.exports = app;
