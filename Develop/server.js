const express = require("express");
const path = require("path");
const fs = require("fs");
const { rsort } = require("semver");

const app = express();
const port = process.env.PORT || "8000";

app.use(express.urlencoded({ extended: true}));
app.use(express.json());




app.use(express.static('public'))
app.get("/", (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => {
    let notes = fs.readFileSync('./db/db.json');
    let notesJson = JSON.parse(notes);
    res.json(notesJson)
})

app.post('/api/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json'));
    notes.push(req.body)
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  
    res.json(notes);


})


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });