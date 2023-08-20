import { Field, InputType } from "type-graphql";

@InputType()
export class createCommentInput { 
    @Field(()=>String)
    text : string ;
}