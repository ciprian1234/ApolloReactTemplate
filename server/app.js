import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';

// my imports
import { typeDefs, resolvers } from './schema';


// Config
const PORT = process.env.PORT || 3000;


// create the server 
const app = express();


// configuration of apollo
const server = new ApolloServer({ typeDefs, resolvers });


// server middleware
app.use(cors()) // allow cross origin resource sharing
server.applyMiddleware({ app });


// define routes
app.get('/', (req, resp) => resp.send("Hellow"));


// start the server
app.listen(PORT, () => console.log(`Server is listening at port: ${PORT}!`))


