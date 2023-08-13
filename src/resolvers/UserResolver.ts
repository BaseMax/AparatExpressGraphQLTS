import { User } from "../models/UserModel";
import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { UserEntity } from "../object-types/userEntity";
import { ContextType } from "src/interfaces/contextType";


@Resolver()
export class UserResolver{
    @Query(()=>[UserEntity])
    async findAllUsers(){
        return await User.find()
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