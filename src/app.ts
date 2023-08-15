import { config } from "dotenv";

config()

import "reflect-metadata";
import './jwt/jwtStrategy' ;
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchemaSync } from 'type-graphql';
import { HelloWorldResolver } from './resolvers/HelloWorldResolver';
import { ApolloServerPluginInlineTrace } from "apollo-server-core";
import mongoose from "mongoose";
import { UserResolver } from "./resolvers/UserResolver";
import { authChecker } from "./middlewares/authMiddleware";
import { AuthResolver } from "./resolvers/AuthResolver";
import { VideoResolver } from "./resolvers/VideoResolver";
import passport from "passport";
import { graphqlUploadExpress } from "graphql-upload-ts";
import { typeDefs } from "./types/typeDefs";

(async ()=>{
    const app = express()
    const port = process.env.PORT || 3000 ;


    app.use(passport.initialize());
    app.use(graphqlUploadExpress());

    const schema = buildSchemaSync({
        resolvers : [
            HelloWorldResolver , 
            UserResolver  , 
            AuthResolver ,
            VideoResolver ,
        ] , 
        authChecker ,
        validate : false ,
    }) ;

    const apolloServer = new ApolloServer({
        schema , 
        typeDefs , 
        context: ({ req , res }) => ({req, res}),
        plugins: [ApolloServerPluginInlineTrace()] , 
        
    })


    await apolloServer.start()
    await mongoose.connect(process.env.MONGODB_URI)

    apolloServer.applyMiddleware({app , cors : false});
    app.listen(port , ()=>{
        console.clear();
        console.log(process.version);
        console.log(`app runing on http://localhost:${port}${apolloServer.graphqlPath}`);
    })
})()