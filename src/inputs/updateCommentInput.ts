import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateCommentInput {
    @Field(()=>String)
    id : string ; 

    @Field(()=>String)
    text : string ;
}