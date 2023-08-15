import { Field, InputType } from "type-graphql";

@InputType()
export class CreateVideoInput {
    @Field(()=>String)
    title : string  ; 

    @Field(()=>String)
    description : string ; 

    filePath : string ; 
}