const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database('insightful_hires.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS cv_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    department TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const app = express();
const PORT = 3000;

app.use(express.json());

// Simple CORS for Vite dev server
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)');
    stmt.run(name, email, message);
    res.json({ success: true, message: 'Message received successfully.' });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ success: false, message: 'Failed to save message.' });
  }
});

app.post('/api/submit-cv', (req, res) => {
  const { firstName, lastName, email, department } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO cv_submissions (first_name, last_name, email, department) VALUES (?, ?, ?, ?)');
    stmt.run(firstName, lastName, email, department);
    res.json({ success: true, message: 'CV submission received successfully.' });
  } catch (error) {
    console.error('CV submission error:', error);
    res.status(500).json({ success: false, message: 'Failed to save CV submission.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'connected' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Dev backend running on http://localhost:${PORT}`);
});
