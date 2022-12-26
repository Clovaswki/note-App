//Immport of modules
    const express = require('express')
    const app = express()
    require('./config/database') //connection with database MongoDB
    const routes = require('./routes')
    const cors = require('cors')
//Config
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    //Acesso de sites a api: config
    app.use(cors({
        origin: '*',
    }))

    app.use('/', routes)


//Server listen on the port 3000
app.listen(process.env.PORT || 4000, () => {
    console.log('Server running on the url http://localhost:4000')
})