import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import resolvers from './schema/resolvers' ; 
import {typeDefs} from './schema/schema' ;

const app = express()

const server = new ApolloServer({
    resolvers ,
    typeDefs , 
})


async function startApolloServer() {
    await server.start();
  
    server.applyMiddleware({ app });
  
    const PORT = process.env.PORT || 3000;
  
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
}


startApolloServer().catch(err=>{
    console.error(err)
})

