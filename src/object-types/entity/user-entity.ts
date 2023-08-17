import { Field, ID, ObjectType } from "type-graphql";
import { VideoEntity } from "./video-entity";

@ObjectType()
export class UserEntity{
    @Field(()=>String)
    id : string

    @Field(()=>String)
    firstName : string 

    @Field(()=>String)
    lastName : string 

    @Field(()=>String)
    email : string 
    
    @Field(()=>String)
    username : string 

    @Field(()=>[String])
    role : string[] 

    @Field(()=>[VideoEntity])
    videos : VideoEntity[]
}