import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'; // Import the path module for handling and transforming file paths
import sendMail from './Emailer.js';

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

// Serve static files from the "build" directory
app.use(express.static(path.join(path.resolve(), 'build')));

const FormController = async (req, res) => {
    try {
        console.log(req.body);
        const newEmail = await sendMail(req.body.email, req.body.FirstName, req.body.LastName, req.body.message, req.body.phone);
        res.json({ message: "Email Sent Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to send email" });
    }
};

const FormRouter = express.Router();
FormRouter.post('/', FormController);
app.use('/api/form', FormRouter);



// Serve the main HTML file for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'build', 'index.html'));
});

const PORT = process.env.Port || 3000; // Ensure a default port if not provided in the .env file
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
