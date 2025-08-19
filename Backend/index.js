const express=require('express');
const cors =require('cors');
const dotenv=require('dotenv');
const connectDB = require('./config/db');
const EcoRoutes =require('./router/EcoRoutes');
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', EcoRoutes);

const PORT=process.env.PORT || 8000;
app.listen(PORT ,()=>{
  console.log(`Server running on Port ${PORT}`);
})
