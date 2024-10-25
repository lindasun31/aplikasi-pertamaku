import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(express.json());

// CORS Configuration: Specify allowed origins instead of '*'
const allowedOrigins = ['http://localhost:3000'];  // <-- Specify allowed origins
app.use(cors({
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
}));


const connection = new sqlite3.Database('./db/aplikasi.db')

app.get("/api/user/:id", (req, res) => {
  connection.get("SELECT * FROM users WHERE id = ?", [req.params.id], (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(result);
    }
  });
});


app.post('/api/user/:id/change-email', (req, res) => {
  const newEmail = req.body.email;
  const query = `UPDATE users SET email = '${newEmail}' WHERE id = ${req.params.id}`;

  connection.run(query, function (err) {
    if (err) throw err;
    if (this.changes === 0 ) res.status(404).send('User not found');
    else res.status(200).send('Email updated successfully');
  });

});

app.get('/api/file', (req, res) => {
  const __filename = fileURLToPath(import.meta.url); 
  const __dirname = path.dirname(__filename); 

  const filePath = path.join(__dirname, 'files', req.query.name);
  res.sendFile(filePath);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
