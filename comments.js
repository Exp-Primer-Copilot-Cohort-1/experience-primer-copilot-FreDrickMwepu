// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set public folder as root
app.use(express.static('public'));

// Provide access to node_modules
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Listen for HTTP traffic
app.listen(3000, () => {
  console.log('listening on http://localhost:3000/');
});

// Path: experience-primer-copilot-FreDrickMwepu/comments.js
// Create comments
app.post('/comments', (req, res) => {
  const { name, comment } = req.body;
  if (name && comment) {
    const data = `${name}: ${comment}\n`;
    fs.appendFile(path.join(__dirname, 'comments.txt'), data, (err) => {
      if (err) {
        res.status(500).send('There was a problem saving your comment.');
      } else {
        res.status(201).send('Your comment was saved successfully.');
      }
    });
  } else {
    res.status(400).send('Name and comment are required.');
  }
});

// Path: experience-primer-copilot-FreDrickMwepu/comments.js
// Get comments
app.get('/comments', (req, res) => {
  fs.readFile(path.join(__dirname, 'comments.txt'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('There was a problem fetching comments.');
    } else {
      res.status(200).send(data);
    }
  });
});