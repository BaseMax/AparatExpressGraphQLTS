import { User } from "../models/User";
import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { UserEntity } from "../object-types/user-entity";
import { ContextType } from "src/interfaces/contextType";


@Resolver()
export class UserResolver{
    @Query(()=>[UserEntity])
    async findAllUsers(){
        return User.find() 
    }

    @Authorized()
    @Query(()=>UserEntity)
    async me(
        @Ctx() context:ContextType 
    ){
        const user = context.req.user ;
        return user ; 
    }
}