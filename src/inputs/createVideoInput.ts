import { Field, InputType } from "type-graphql";

@InputType()
export class CreateVideoInput {
    @Field(()=>String)
    path : string ;

    @Field(()=>String)
    title : string  ; 

    @Field(()=>String)
    url : string ;

    @Field(()=>String)
    description : string ;

    @Field(()=>[String])
    tags : string[] ; 
}