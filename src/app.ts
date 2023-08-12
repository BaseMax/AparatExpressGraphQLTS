import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { HelloWorldResolver } from './resolvers/HelloWorldResolver';
import { ApolloServerPluginInlineTrace } from "apollo-server-core";

(async ()=>{

    const app = express()
    const port = process.env.PORT || 3000 ;

    const apolloServer = new ApolloServer({
        schema : await buildSchema({
            resolvers : [
                HelloWorldResolver
            ]
        }) , 
        context : ({req , res})=>({req , res}) , 
        plugins: [ApolloServerPluginInlineTrace()] , 
    })


    await apolloServer.start()

    apolloServer.applyMiddleware({app , cors : false});

    app.listen(port , ()=>{
        console.clear();
        console.log(process.version);
        console.log(`app runing on http://localhost:${port}${apolloServer.graphqlPath}`);
    })
})()


