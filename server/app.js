import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// my imports
import { CONFIG } from './config';
import { refreshTokens } from './auth';
import moduleList from './graphql/modules';

// Start the server
startServer();

async function startServer() {
	// create express server
	const app = express();

	// connect to mongoDB
	await mongoose.connect('mongodb://localhost:27017/test', {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true
	});

	// configuration of apollo
	const server = new ApolloServer({
		modules: moduleList,
		debug: !CONFIG.IN_PROD,
		playground: !CONFIG.IN_PROD,
		context: ({ req, res }) => {
			return { req, res };
		}
	});

	// server middleware
	app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // allow cross origin resource sharing
	app.use(bodyParser.json()); // parse the body of all POST requests
	app.use(cookieParser());
	// apply apollo middleware
	server.applyMiddleware({ app, cors: false });

	// define routes
	app.get('/', (req, resp) => resp.send('<h1>Hellow</h1>'));
	app.post('/refresh_tokens', refreshTokens);

	// start the server
	app.listen(CONFIG.PORT, () =>
		console.log(`Server is listening at: http://localhost:${CONFIG.PORT}/`)
	);
}
