import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import mongoose from 'mongoose'

// my imports
import { typeDefs } from './graphql/typedefs';
import { resolvers } from './graphql/resolvers';


// Config
const PORT = process.env.PORT || 3000;


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
    const server = new ApolloServer({ typeDefs, resolvers });

    // server middleware
    app.use(cors()) // allow cross origin resource sharing
    server.applyMiddleware({ app });

    // define routes
    app.get('/', (req, resp) => resp.send("Hellow"));

    // start the server
    app.listen(PORT, () => console.log(`Server is listening at port: ${PORT}!`))
} 



