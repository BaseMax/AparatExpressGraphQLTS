import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePlayListInput {
    @Field(()=>String)
    description : string ; 
}