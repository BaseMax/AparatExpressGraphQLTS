import mongoose from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class UserEntity{
    @Field(()=>String)
    id : mongoose.Types.ObjectId 

    @Field(()=>String)
    name : string 

    @Field(()=>String)
    email : string 
    
    @Field(()=>String)
    username : string 

    @Field(()=>String)
    role : string 
}