const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const db = new sqlite3.Database(':memory:');

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize the database
db.serialize(() => {
  db.run("CREATE TABLE saved_rows (id INTEGER PRIMARY KEY AUTOINCREMENT, uid TEXT, data TEXT, action TEXT)");
});

// Endpoint to track row saves and deletions
app.post('/confirmation-row-saved/:uid?', (req, res) => {
  console.log("Received request body:", req.body); // Debugging log

  const { code, value, description, patches } = req.body;
  if (!code || !value) {
    return res.status(400).json({ error: "Invalid request format: 'code' and 'value' are required." });
  }

  const action = code === "1408" ? "saved" : code === "1402" ? "deleted" : null;
  if (!action) {
    return res.status(400).json({ error: "Invalid action code" });
  }

  const uid = req.params.uid || "defaultUser"; // Use UID from URL or default
  const data = JSON.stringify({ value, description, patches });

  const stmt = db.prepare("INSERT INTO saved_rows (uid, data, action) VALUES (?, ?, ?)");
  stmt.run(uid, data, action, function (err) {
    if (err) {
      console.error("Error saving row:", err);
      return res.status(500).json({ error: err.message });
    }

    console.log(`Row saved with ID: ${this.lastID}`);

    // Fetch all rows after saving to verify storage
    db.all("SELECT * FROM saved_rows", (err, rows) => {
      if (err) {
        console.error("Error fetching saved rows:", err);
      } else {
        console.log("All saved rows in DB:", rows);
      }
    });

    res.json({ id: this.lastID });
  });

  stmt.finalize();
});


app.get('/saved-rows/:uid', (req, res) => {
  const { uid } = req.params;
  
  console.log(`Fetching saved rows for UID: ${uid}`);
  
  db.all("SELECT * FROM saved_rows WHERE uid = ?", uid, (err, rows) => {
    if (err) {
      console.error("Error fetching saved rows:", err);
      return res.status(500).json({ error: err.message });
    }

    console.log("Returning saved rows:", rows); // Debugging log

    // Set JSON response header
    res.setHeader("Content-Type", "application/json");
    res.json(rows);
  });
});


// Serve a simple index.html for testing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
