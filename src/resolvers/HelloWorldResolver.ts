import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class HelloWorldResolver {
    @Query(()=>String)
    hello(){
        return "hello world"
    }
}