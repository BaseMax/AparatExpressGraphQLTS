import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
    @Field(()=>String )
    firstName : string ; 

    @Field(()=>String )
    lastName : string ; 
    
    @Field(()=>String )
    email : string ; 
    
    @Field(()=>String )
    password : string ;

    @Field(()=>String)
    username : string ; 
}