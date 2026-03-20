# 🍱 Food2Charity

Food2Charity is a full-stack web platform designed to reduce food waste by connecting surplus food from donors—such as event organizers, restaurants, and bakeries—with those who need it most, including NGOs, shelters, and individuals.

The platform enables seamless coordination between donors, receivers, and NGO agents, ensuring efficient collection and delivery of food through a structured tracking system. With real-time status updates and simulated GPS tracking, Food2Charity brings transparency and accountability to the entire food redistribution process.

---

## 💡 Key Highlights

- 🌍 Bridges the gap between food surplus and food scarcity  
- 🚚 End-to-end delivery lifecycle tracking  
- 🧑‍💼 Dedicated NGO agent dashboard for logistics management  
- 📍 Simulated GPS tracking for transparency in food transport  
- ⚡ Built for real-world impact with a simple and intuitive UI  

---

## Features

1. **Donate Food**: Donors can easily submit surplus food with details and pickup locations.
2. **Find & Request Food**: Receivers can view available food nearby or submit custom food requests if they can't find what they need.
3. **Agent Dashboard**: A secure portal for authorized NGO agents to manage the logistics of food distribution.
4. **End-to-End Delivery Tracking**:
   - `Pending`: Waiting to be assigned.
   - `Assigned`: An agent accepted the task.
   - `Collected`: The agent physically picked up the food from the donor.
   - `Delivered / Fulfilled`: The food successfully reached the receivers.

## Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript, CSS3 (Modern responsive UI with hover effects and glassmorphism styling).
- **Backend**: Node.js with Express.js.
- **Data Storage**: Local in-memory JavaScript objects (suitable for local demonstration and testing).

## Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Running Locally

1. Clone or download the repository to your local machine.
2. Open a terminal in the project directory (`Food2Charity`).
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Start the Express server:
   ```bash
   node server.js
   ```
5. Open your web browser and navigate to:
   **[http://localhost:3000](http://localhost:3000)**

### Demo Credentials for Agent Login
To test the Agent Dashboard, use the following credentials on the `/login` page:
- **Username:** `agent`
- **Password:** `password123`

## Directory Structure
```
Food2Charity/
│
├── package.json          # Node.js dependencies (express, cors, body-parser)
├── server.js             # Main Express API and backend state logic
│
└── public/               # Frontend directory (served locally)
    ├── index.html        # Landing Home page
    ├── login.html        # Secure agent login page
    ├── donate.html       # Submission form for donors
    ├── find-food.html    # Public list of pending food and request form
    ├── dashboard.html    # Restricted dashboard for managing the delivery lifecycle
    ├── style.css         # Main stylesheet for the application
    └── script.js         # Client-side JavaScript logic for API integration
```
