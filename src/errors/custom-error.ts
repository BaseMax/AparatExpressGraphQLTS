import { ApolloError } from 'apollo-server-core'

class CustomError extends ApolloError {
  name : string ; 
  
  constructor(message, code, properties) {
    super(message, code, properties);
    this.name = 'CustomError';
  }
}