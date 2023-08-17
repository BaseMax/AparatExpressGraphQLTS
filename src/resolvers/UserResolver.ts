import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { UserEntity } from "../object-types/entity/user-entity";
import { ContextType } from "src/interfaces/contextType";

@Resolver()
export class UserResolver{
    @Authorized()
    @Query(()=>UserEntity)
    async me(
        @Ctx() context:ContextType 
    ){
        const user = context.req.user ;
        return user ; 
    }
}