const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://testrdz32:z0n3T7msJnV2nKLA@clusterbackend.unryogc.mongodb.net/ecommerce?retryWrites=true&w=majority');
        console.log("Base de datos conectada");
    } catch (error) {
        console.log(`Error Al Conectar A MongoDB ${error.message}`);
    }
}

module.exports = { connectDB };

