const express = require("express");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');



const apiRoutes = require("./routes/apiRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/notes", apiRoutes);


app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);