const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
// require('dotenv').config(); // Uncomment if using dotenv

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

const secret = process.env.CHATBOT_IDENTITY_SECRET || 'your_fallback_secret_for_testing'; // Set CHATBOT_IDENTITY_SECRET in your environment

// Mock function - Replace with your actual user session logic
async function getSignedInUser() {
    return {
        id: "user_123",
        email: "user@example.com",
        stripe_accounts: []
    };
}

app.get('/get-chatbot-token', async (req, res) => {
    try {
        const user = await getSignedInUser(); // Get the current user signed in to your site

        if (!user || !secret) {
            return res.status(500).json({ error: "Missing user or secret" });
        }

        const token = jwt.sign(
            {
                user_id: user.id,
                email: user.email,
                stripe_accounts: user.stripe_accounts,
            },
            secret,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
