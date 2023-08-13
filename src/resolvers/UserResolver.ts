import { User } from "../models/UserModel";
import { Arg, Query, Resolver } from "type-graphql";
import { UserEntity } from "../object-types/userEntity";
import { StatusResult } from "src/object-types/status-result";


@Resolver()
export class UserResolver{
    @Query(()=>[UserEntity])
    async findAllUsers(){
        return await User.find()
    }

    @Query(()=>UserEntity)
    async findOneUser(
        @Arg('id' , ()=>String) id :string 
    ){
        return await User.findById(id)
    }
}