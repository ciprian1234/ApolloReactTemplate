import express from 'express';
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';

// my imports
import { CONFIG } from './config';
import moduleList from './graphql/modules'


// Start the server
startServer();


async function startServer() {
    // create express server 
    const app = express();

    // connect to mongoDB
    await mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    });

    // configuration of apollo
    const server = new ApolloServer({ 
        modules: moduleList,
        debug: !CONFIG.IN_PROD,
        playground: !CONFIG.IN_PROD,
        context: ({req, res}) => {return {req, res};}
    });

    // server middleware
    app.use(cors()) // allow cross origin resource sharing
    app.use(bodyParser.json()) // parse the body of all POST requests
    app.use(session({
        // TODO: store session to redis database
        name:   CONFIG.SESSION_NAME,
        secret: CONFIG.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: CONFIG.SESSION_LIFETIME,
            sameSite: true,
            secure: CONFIG.IN_PROD
        }
    }))
     
    // apply apollo middleware
    server.applyMiddleware({ app });


    // define routes
    app.get('/', (req, resp) => resp.send("<h1>Hellow</h1>"));

    // start the server
    app.listen(CONFIG.PORT, () => console.log(`Server is listening at port: ${CONFIG.PORT}!`))
} 



