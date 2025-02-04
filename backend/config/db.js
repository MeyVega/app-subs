const mongoose = require("mongoose");
require("dotenv").config(); // Cargar variables de entorno desde .env

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión a MongoDB: ${error.message}`);
    process.exit(1); // Detiene la aplicación en caso de fallo
  }
};

module.exports = connectDB;


