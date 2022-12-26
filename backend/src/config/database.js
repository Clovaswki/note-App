const mongoose = require('mongoose')

const mongoDB = "mongodb://localhost/notes"

const connection = mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {console.log("MongoDB conectado...")})

module.exports = connection