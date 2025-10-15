const express = require('express');
const app = express();
const userRoutes = require('./routes/user'); // Import routes

app.use(express.json()); // Parse JSON body
app.use('/users', userRoutes); // Mount user routes tại /users

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));