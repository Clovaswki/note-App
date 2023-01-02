const mongoose = require('mongoose')
require('dotenv').config()

const mongoDB = process.env.URL_DATABASE

const connection = mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {console.log("MongoDB conectado...")})

module.exports = connection