import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import { connectDB } from './db/mongo.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("Student DB Server ready.")
})

app.use('/api/auth', authRoutes)


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
    connectDB();
})