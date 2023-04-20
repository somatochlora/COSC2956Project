const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('db/database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

db.run(`CREATE TABLE User (
    username TEXT PRIMARY KEY,
    password TEXT,
    salt TEXT,
    email TEXT,
    name TEXT
    )`, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Created the User table.');
});

db.run(`CREATE TABLE Site (
    site_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT
    )`, (err) => {
        if (err) {
            console.error(err.message);
    }
    console.log('Created the Site table.');
});

db.run(`CREATE TABLE Bookings (
    booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    start_date TEXT,
    end_date TEXT,
    site_id INTEGER,
    FOREIGN KEY (site_id) REFERENCES Site(site_id),
    FOREIGN KEY (username) REFERENCES User(username)
    )`, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Created the Bookings table.');
});