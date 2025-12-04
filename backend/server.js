import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { connectDatabase } from './db/connectDb.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
await connectDatabase();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running');        
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})