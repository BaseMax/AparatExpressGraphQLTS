import { Field, InputType } from "type-graphql";

@InputType()
export class UpdatePlayListInput {
    @Field(()=>String)
    id : string ; 

    @Field(()=>String)
    description : string ; 
}