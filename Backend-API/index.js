const express = require('express');
const cors = require('cors');
const path = require('path'); // Import path module for serving static files
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db');

app.use(express.json());
app.use(cors()); // Use cors middleware

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Placeholder route
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Get all questions
app.get('/questions', (req, res) => {
  db.query('SELECT * FROM queryanswer', (err, results) => {
    if (err) {
      console.error('Error fetching questions:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Get a specific question by ID
app.get('/questions/:id', (req, res) => {
  const questionId = req.params.id;
  db.query('SELECT * FROM queryanswer WHERE id = ?', [questionId], (err, results) => {
    if (err) {
      console.error('Error fetching question:', err);
      res.status(500).send('Server error');
      return;
    }
    if (results.length === 0) {
      return res.status(404).send('Question not found');
    }
    res.json(results[0]);
  });
});

// Add a new question
app.post('/admin/questions', (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).send('Question and answer are required');
  }

  db.query('INSERT INTO queryanswer (question, answer) VALUES (?, ?)', [question, answer], (err, results) => {
    if (err) {
      console.error('Error adding question:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(201).send('Question added');
  });
});

// Delete a question by ID
app.delete('/admin/questions/:id', (req, res) => {
  const questionId = req.params.id;
  db.query('DELETE FROM queryanswer WHERE id = ?', [questionId], (err, results) => {
    if (err) {
      console.error('Error deleting question:', err);
      res.status(500).send('Server error');
      return;
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Question not found');
    }
    res.send('Question deleted');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
