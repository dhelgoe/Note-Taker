const fb = require('express').Router();
const fs = require("fs");
const util = require('util')

const readAsync = util.promisify( fs.readFile)
const writeAsync = util.promisify(fs.writeFile)
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeAsync(file, JSON.stringify(parsedData));
    }

  });
};

fb.get('/', (req, res) =>
  readAsync('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

fb.post('/', (req, res) => {
    const { title, text } = req.body;
    console.log(req.body)

if (title && text) {
    const newNote = {
        title,
        text,
    }
    readAndAppend(newNote, './db/db.json');

    const response = {
        status: 'success',
        body: newNote,
      };

      res.json(response);
    } else {
      res.json('Error in posting note');
    }
});

module.exports = fb








module.exports = fb;