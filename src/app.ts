import { config } from "dotenv";

config()

import "reflect-metadata";
import './jwt/jwtStrategy' ;
import express from 'express';
import passport from "passport";
import { buildSchemaSync } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { authChecker } from "./middlewares/authMiddleware";
import { ApolloServerPluginInlineTrace } from "apollo-server-core";


import { AuthResolver } from "./resolvers/AuthResolver";
import { VideoResolver } from "./resolvers/VideoResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { HelloWorldResolver } from './resolvers/HelloWorldResolver';


import router from './routes/index' ; 


(async ()=>{
    const app = express()
    const port = process.env.PORT || 3000 ;

    app.use(express.static('public'))
    app.use(passport.initialize())
    app.use(express.urlencoded({extended : true}))
    app.use(express.json()); 
    app.use('/' , router)

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
        context: ({ req , res }) => ({req, res}),
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginInlineTrace()] , 
        introspection: true,
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({app , cors : false});

    app.listen(port , ()=>{
        console.clear();
        console.log(process.version);
        console.log(`app runing on http://localhost:${port}${apolloServer.graphqlPath}`);
    })
})()