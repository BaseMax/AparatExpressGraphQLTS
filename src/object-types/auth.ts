import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Auth {
    @Field(()=>String )
    access_token : string ; 

    @Field(()=>[String])
    role : string[] 
}