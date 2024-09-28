const mongoose = require('mongoose');
//require('dotenv').config();

// Configuración para evitar el warning de Mongoose 7
mongoose.set('strictQuery', true);

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

module.exports = { connectMongo };
