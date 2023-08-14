import { Field, ID } from "type-graphql";

export class createCommentInput { 
    @Field(()=>String)
    content : string ;
}