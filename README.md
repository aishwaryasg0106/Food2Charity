# Food2Charity

Food2Charity is a web platform connecting surplus food from donors (like event managers and bakeries) with people who need it most, such as local shelters and individuals. It empowers NGO agents to track and fulfill food deliveries efficiently.

## Features

1. **Donate Food**: Donors can easily submit surplus food with details and pickup locations.
2. **Find & Request Food**: Receivers can view available food nearby or submit custom food requests if they can't find what they need.
3. **Agent Dashboard**: A secure portal for NGO agents to manage the logistics of food distribution.
4. **End-to-End Delivery Tracking**:
   - `Pending`: Waiting to be assigned.
   - `Assigned`: An agent accepted the task.
   - `Collected`: The agent physically picked up the food from the donor.
   - `Delivered / Fulfilled`: The food successfully reached the receivers.
5. **Simulated GPS Tracking**: Agents are prompted for GPS coordinates while moving food, ensuring traceability during transit.

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
