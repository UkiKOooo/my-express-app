const express = require('express');
const app = express();
const port = 3000;

// Header style for all pages
const header = '<style>body{font-family:sans-serif; background:#f4f4f4; padding:50px; text-align:center;} .container{background:white; padding:30px; border-radius:10px; display:inline-block; border:1px solid #ddd;}</style>';

// Homepage
app.get('/', (req, res) => {
    res.send(`${header}<div class="container"><h1>Welcome to My Express App!</h1><p><a href="/about">About</a> | <a href="/contact">Contact</a></p></div>`);
});

// About Page
app.get('/about', (req, res) => {
    res.send(`${header}<div class="container"><h1>About Page</h1><p>This is a simple Express application for learning purposes.</p><p><a href="/">Back Home</a></p></div>`);
});

// Contact Page
app.get('/contact', (req, res) => {
    const { name, message } = req.query;
    if (name) {
        // Output format required by your assignment
        res.send(`${header}<div class="container"><h1>Success!</h1><p>Thank you, ${name}! We have received your message: ${message}.</p><p><a href="/contact">Back to Form</a></p></div>`);
    } else {
        res.send(`${header}<div class="container">
            <h1>Contact Page</h1>
            <form action="/contact" method="GET">
                <p>Name: <input type="text" name="name" required></p>
                <p>Email: <input type="email" name="email" required></p>
                <p>Message: <input type="text" name="message"></p>
                <button type="submit">Submit</button>
            </form>
            <p><a href="/">Back Home</a></p>
        </div>`);
    }
});

app.listen(port, () => {
    console.log(`Server started! View it here: http://localhost:${port}`);
});