import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import { protect } from './middleware/authMiddleware.js'
import taskRoutes from "./routes/taskRoutes.js";
import openaiRoutes from "./routes/groqRoutes.js";

connectDB()

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('NeuroDash API running')
})

app.get('/api/protected', protect, (req, res) => {
    res.json({ message: `Hello ${req.user.id}, you accessed a protected route!` })
  })

app.use('/api/auth', authRoutes)
app.use("/api/tasks", taskRoutes);
app.use("/api/openai", openaiRoutes);

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
