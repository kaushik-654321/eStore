import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

const app = express();

const server = new ApolloServer({typeDefs, resolvers});
server.start().then(()=>{
    server.applyMiddleware({app});
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(5000, () => console.log("GraphQL API running on http://localhost:5000/graphql"));
    })
    .catch(err => console.error("DB Connection Error:", err));
})