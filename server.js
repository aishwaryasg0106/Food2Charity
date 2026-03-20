const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static frontend files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory arrays to store food donations and requests
let donations = [
    { id: 1, foodItem: "10 Boxes of Pizza", quantity: "10", location: "Downtown Bakery", timeMs: Date.now() - 3600000, status: 'pending' },
    { id: 2, foodItem: "50 Sandwiches", quantity: "50", location: "Corporate Event Center", timeMs: Date.now() - 7200000, status: 'pending' }
];

let requests = [
    { id: 101, receiverName: "Local Shelter", neededFood: "Meals for 20 people", location: "Westside Community Center", timeMs: Date.now() - 5000000, status: 'pending' }
];

// Valid Agents List
const validAgents = [
    { username: "agent", password: "password123" },
    { username: "admin", password: "admin" }
];

// Routes

// 1. POST /api/login - Dummy login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // Check credentials against the valid list
    const agent = validAgents.find(a => a.username === username && a.password === password);
    if (agent) {
        res.json({ success: true, message: `Welcome ${username}! Login successful.` });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials. Please provide valid Agent username and password." });
    }
});

// 2. POST /api/donate - Submit a new food donation
app.post('/api/donate', (req, res) => {
    const { foodItem, quantity, location } = req.body;

    if (!foodItem || !quantity || !location) {
        return res.status(400).json({ success: false, message: "Missing required fields: foodItem, quantity, location." });
    }

    const newDonation = {
        id: donations.length + 1,
        foodItem,
        quantity,
        location,
        timeMs: Date.now(),
        status: 'pending'
    };
    
    donations.push(newDonation);
    res.json({ success: true, message: "Donation received successfully!", donation: newDonation });
});

// 3. GET /api/food - Retrieve all available food donations
app.get('/api/food', (req, res) => {
    // Return all so dashboard can show accepted ones too
    res.json({ success: true, data: donations });
});

// 4. POST /api/request - Submit a food request from a receiver
app.post('/api/request', (req, res) => {
    const { receiverName, neededFood, location } = req.body;

    if (!receiverName || !neededFood || !location) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const newRequest = {
        id: requests.length + 101,
        receiverName,
        neededFood,
        location,
        timeMs: Date.now(),
        status: 'pending'
    };
    
    requests.push(newRequest);
    res.json({ success: true, message: "Request submitted successfully!", request: newRequest });
});

// 5. GET /api/requests - Retrieve all receiver requests
app.get('/api/requests', (req, res) => {
    res.json({ success: true, data: requests });
});

// 6. POST /api/donation/:id/status
app.post('/api/donation/:id/status', (req, res) => {
    const { status } = req.body;
    const donation = donations.find(d => d.id == req.params.id);
    if(donation && status) {
        donation.status = status;
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false });
    }
});

// 7. POST /api/request/:id/status
app.post('/api/request/:id/status', (req, res) => {
    const { status } = req.body;
    const request = requests.find(r => r.id == req.params.id);
    if(request && status) {
        request.status = status;
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false });
    }
});

// Route for specific pages if accessed directly without extension
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/donate', (req, res) => res.sendFile(path.join(__dirname, 'public', 'donate.html')));
app.get('/find-food', (req, res) => res.sendFile(path.join(__dirname, 'public', 'find-food.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
