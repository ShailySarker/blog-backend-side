const sqlite3 = require('sqlite3');
const sql3 = sqlite3.verbose();

const db = new sql3.Database('./blogs.db', (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

let sql = `CREATE TABLE IF NOT EXISTS Post (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL
    )`;

db.run(sql, [], (error) => {
    if (error) {
        console.log("error creating post table");
        return;
    } else {
        console.log("Table create successfully!")
    }
});

module.exports = db;