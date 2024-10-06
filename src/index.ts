import express from 'express';
import dotenv from "dotenv"
import cors from "cors";
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from "@apollo/server/express4"

const app = express();
dotenv.config();

async function init() {
    // middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    const port = process.env.PORT;
    const server = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String
        }
    `,
        resolvers: {
            Query: {
                hello: () => 'Hello, world!',
            },
        },
    })
    await server.start();
    app.get("/", (req, res) => {
        res.send("Hello!")
    })
    app.use("/graphql", expressMiddleware(server));  
      app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${port}`)
    })
}

init();