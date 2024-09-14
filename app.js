const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db = require('./dbConnect');
const cors = require('cors');

const port = 4000;
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to Blogs World");
});


// Get all posts
app.get('/posts', (req, res) => {
    const sql = 'SELECT * FROM Post';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get a single post by ID
app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Post WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(row);
    });
});

// Create a new post
app.post('/posts', (req, res) => {
    const { title, content } = req.body;

    // Validations

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    const sql = 'INSERT INTO Post (title, content) VALUES (?, ?)';
    db.run(sql, [title, content], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            id: this.lastID,
            title,
            content
        });
    });
});

// Delete a post by ID
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Post WHERE id = ?';
    db.run(sql, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(204).send();
    });
});

// Update a post by ID
app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    // Validations

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    const sql = 'UPDATE Post SET title = ?, content = ? WHERE id = ?';
    db.run(sql, [title, content, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post updated successfully' });
    });
});


app.listen(port, (error) => {
    if (error) {
        console.log("The server did not start: ", error);
        return;
    }
    else {
        console.log("The server is running on port", port);
    }
});
