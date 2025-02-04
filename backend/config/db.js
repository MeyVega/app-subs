const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Conexión exitosa a MongoDB");
    } catch (error) {
        console.error("❌ Error de conexión a MongoDB:", error);
        process.exit(1); // Salir de la app en caso de error crítico
    }
};

module.exports = connectDB; // ✅ Exportamos la función para usarla en `server.js`
