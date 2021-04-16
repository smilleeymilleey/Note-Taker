const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


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
    let newNote = req.body;
    newNote.id = uuidv4(); 
    notes.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  
    res.json(notes);

})

app.delete('/api/notes/:id', (req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json'));

    let id = req.params.id
    let deleteNote = notes.filter(function (obj) {
        return obj.id !== id;
    })
    fs.writeFileSync('./db/db.json', JSON.stringify(deleteNote));
    res.json(notes);
})


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });