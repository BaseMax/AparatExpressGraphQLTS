import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CommentEntity {
    @Field(()=>String)
    id : string ; 

    @Field(()=>String)
    text : string ;

    videoId : string ; 
}

