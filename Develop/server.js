const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || "8000";

app.use(express.urlencoded({ extended: true}));
app.use(express.json());





app.get("/", (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });