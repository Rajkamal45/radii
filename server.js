const express = require('express');
const mysql = require('mysql2');
const app = express();
const path = require('path');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'DESKTOP-NUJ8Q10',
    user: 'root',
    password: '979385@Qwe',
    database: 'site'
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Set up route to fetch and display data
app.get('/display-data', (req, res) => {
    connection.query('SELECT * FROM form_data', (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }

        // Send the data as JSON
        res.json(results);
    });
});
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
