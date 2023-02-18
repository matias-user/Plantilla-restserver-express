const mongoose = require('mongoose');


const DBconnection = async() => {
    mongoose.set("strictQuery", false);
    try {
        await mongoose.connect(process.env.MONGO_CNN); 
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error(`No se pudo connectar a la bbdd por error: ${error}`);
    }
};

module.exports = {
    DBconnection
}