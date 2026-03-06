const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '127.0.0.1';
const UPLOAD_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

let db = null;
let dbStatus = 'disabled';
const memoryStore = {
  contact: [],
  cv: [],
};

const ensureColumn = (tableName, columnName, columnType) => {
  const columns = db.prepare(`PRAGMA table_info(${tableName})`).all();
  const hasColumn = columns.some((column) => column.name === columnName);
  if (!hasColumn) {
    db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`);
  }
};

try {
  const Database = require('better-sqlite3');
  db = new Database('insightful_hires.db');
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
      cv_filename TEXT,
      cv_stored_name TEXT,
      cv_mime TEXT,
      cv_size INTEGER,
      cv_path TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  ensureColumn('cv_submissions', 'cv_filename', 'TEXT');
  ensureColumn('cv_submissions', 'cv_stored_name', 'TEXT');
  ensureColumn('cv_submissions', 'cv_mime', 'TEXT');
  ensureColumn('cv_submissions', 'cv_size', 'INTEGER');
  ensureColumn('cv_submissions', 'cv_path', 'TEXT');

  dbStatus = 'connected';
} catch (error) {
  console.warn('SQLite unavailable. Falling back to in-memory mode:', error.message);
  dbStatus = 'memory-fallback';
}

const uploadStorage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, UPLOAD_DIR);
  },
  filename: (_req, file, callback) => {
    const safeExt = path.extname(file.originalname).toLowerCase();
    const uniquePart = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, `${uniquePart}${safeExt}`);
  },
});

const upload = multer({
  storage: uploadStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return callback(new Error('Only PDF, DOC, and DOCX files are allowed.'));
    }
    callback(null, true);
  },
});

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
    if (db) {
      const stmt = db.prepare('INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)');
      stmt.run(name, email, message);
    } else {
      memoryStore.contact.push({ name, email, message, created_at: new Date().toISOString() });
    }
    res.json({ success: true, message: 'Message received successfully.' });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ success: false, message: 'Failed to save message.' });
  }
});

app.post('/api/submit-cv', upload.single('cv'), (req, res) => {
  const { firstName, lastName, email, department } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ success: false, message: 'Please upload a CV file.' });
  }

  try {
    if (db) {
      const stmt = db.prepare(`
        INSERT INTO cv_submissions
          (first_name, last_name, email, department, cv_filename, cv_stored_name, cv_mime, cv_size, cv_path)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        firstName,
        lastName,
        email,
        department,
        file.originalname,
        file.filename,
        file.mimetype,
        file.size,
        file.path
      );
    } else {
      memoryStore.cv.push({
        firstName,
        lastName,
        email,
        department,
        cv_filename: file.originalname,
        cv_stored_name: file.filename,
        cv_mime: file.mimetype,
        cv_size: file.size,
        cv_path: file.path,
        created_at: new Date().toISOString(),
      });
    }
    res.json({ success: true, message: 'CV submission received successfully.' });
  } catch (error) {
    console.error('CV submission error:', error);
    res.status(500).json({ success: false, message: 'Failed to save CV submission.' });
  }
});

app.get('/api/admin/cv-submissions', (_req, res) => {
  if (!db) {
    return res.status(503).json({ success: false, message: 'Database unavailable in memory-fallback mode.' });
  }

  try {
    const rows = db.prepare(`
      SELECT
        id,
        first_name,
        last_name,
        email,
        department,
        cv_filename,
        cv_size,
        created_at
      FROM cv_submissions
      ORDER BY id DESC
    `).all();

    const data = rows.map((row) => ({
      ...row,
      download_url: `/api/admin/cv-submissions/${row.id}/download`,
    }));

    res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('CV list error:', error);
    res.status(500).json({ success: false, message: 'Failed to load CV submissions.' });
  }
});

app.get('/api/admin/cv-submissions/:id/download', (req, res) => {
  if (!db) {
    return res.status(503).json({ success: false, message: 'Database unavailable in memory-fallback mode.' });
  }

  try {
    const row = db.prepare(`
      SELECT id, cv_filename, cv_path
      FROM cv_submissions
      WHERE id = ?
    `).get(req.params.id);

    if (!row || !row.cv_path || !fs.existsSync(row.cv_path)) {
      return res.status(404).json({ success: false, message: 'CV file not found.' });
    }

    res.download(row.cv_path, row.cv_filename || `cv-${row.id}`);
  } catch (error) {
    console.error('CV download error:', error);
    res.status(500).json({ success: false, message: 'Failed to download CV file.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: dbStatus });
});

app.use((error, _req, res, next) => {
  if (!error) return next();
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: error.message });
  }
  if (error.message === 'Only PDF, DOC, and DOCX files are allowed.') {
    return res.status(400).json({ success: false, message: error.message });
  }
  return next(error);
});

app.use((error, _req, res, _next) => {
  console.error('Unhandled server error:', error);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// Serve prebuilt frontend when available so local testing works without Vite.
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(path.join(distPath, 'index.html'))) {
  app.use(express.static(distPath));
  app.get('/{*any}', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, HOST, () => {
  console.log(`Dev backend running on http://${HOST}:${PORT}`);
  console.log(`Health endpoint: http://${HOST}:${PORT}/api/health`);
  console.log(`CV list endpoint: http://${HOST}:${PORT}/api/admin/cv-submissions`);
});
