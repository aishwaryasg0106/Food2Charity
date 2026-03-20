document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Logic for Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const msgBox = document.getElementById('loginMessage');

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();
                msgBox.className = 'message ' + (data.success ? 'success' : 'error');
                msgBox.textContent = data.message;
                
                if(data.success) {
                    setTimeout(() => window.location.href = '/dashboard', 1500);
                }
            } catch (err) {
                msgBox.className = 'message error';
                msgBox.textContent = 'Server connection failed.';
            }
        });
    }

    // Logic for Donate Form
    const donateForm = document.getElementById('donateForm');
    if (donateForm) {
        donateForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const foodItem = document.getElementById('foodItem').value;
            const quantity = document.getElementById('quantity').value;
            const location = document.getElementById('location').value;
            const msgBox = document.getElementById('donateMessage');

            try {
                const response = await fetch('/api/donate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ foodItem, quantity, location })
                });

                const data = await response.json();
                msgBox.className = 'message ' + (data.success ? 'success' : 'error');
                msgBox.textContent = data.message;
                
                if (data.success) donateForm.reset();
            } catch (err) {
                msgBox.className = 'message error';
                msgBox.textContent = 'Server connection failed.';
            }
        });
    }

    // Logic for Find Food Page
    const foodListContainer = document.getElementById('foodList');
    if (foodListContainer) {
        const fetchFood = async () => {
            try {
                const response = await fetch('/api/food');
                const data = await response.json();

                if (data.success) {
                    const donations = data.data.filter(d => d.status !== 'accepted');
                    foodListContainer.innerHTML = ''; // clear loading text
                    
                    if(donations.length === 0) {
                        foodListContainer.innerHTML = '<p style="text-align:center;grid-column: 1 / -1;">No food donations available at the moment.</p>';
                        return;
                    }

                    donations.sort((a,b) => b.timeMs - a.timeMs).forEach(item => {
                        const card = document.createElement('div');
                        card.className = 'food-card fade-in';
                        
                        // Calculate time ago
                        const diffMins = Math.floor((Date.now() - item.timeMs) / 60000);
                        const timeStr = diffMins < 60 ? `${diffMins} mins ago` : `${Math.floor(diffMins/60)} hrs ago`;

                        card.innerHTML = `
                            <h4>${item.foodItem}</h4>
                            <span class="badge">Qty: ${item.quantity}</span>
                            <p><strong>📍 Location:</strong> &nbsp;${item.location}</p>
                            <p style="font-size: 0.8rem; margin-top: 10px;">${timeStr}</p>
                            <button class="btn btn-orange" style="width:100%; margin-top:10px; padding: 0.5rem;" onclick="alert('Pickup requested for ${item.foodItem}!')">Request Pickup</button>
                        `;
                        foodListContainer.appendChild(card);
                    });
                } else {
                    foodListContainer.innerHTML = '<p style="color:red;text-align:center;">Failed to load data.</p>';
                }
            } catch (err) {
                foodListContainer.innerHTML = '<p style="color:red;text-align:center;">Server connection failed.</p>';
            }
        };

        fetchFood();
    }

    // Logic for Request Food Form (Receivers)
    const requestForm = document.getElementById('requestForm');
    if (requestForm) {
        requestForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const receiverName = document.getElementById('receiverName').value;
            const neededFood = document.getElementById('neededFood').value;
            const location = document.getElementById('reqLocation').value;
            const msgBox = document.getElementById('requestMessage');

            try {
                const response = await fetch('/api/request', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ receiverName, neededFood, location })
                });

                const data = await response.json();
                msgBox.className = 'message ' + (data.success ? 'success' : 'error');
                msgBox.textContent = data.message;
                
                if (data.success) requestForm.reset();
            } catch (err) {
                msgBox.className = 'message error';
                msgBox.textContent = 'Server connection failed.';
            }
        });
    }
});