import { Field, ObjectType } from "type-graphql";
import { CommentEntity } from "./comment-entity";
import { UserEntity } from "./user-entity";


@ObjectType()
export class VideoEntity {
    @Field(()=>String)
    id : string ;
    
    @Field(()=>String)
    title : string ;

    @Field(()=>String)
    description : string ;

    @Field(()=>String)
    url : string;

    @Field(()=>String)
    path : string;

    @Field(()=>String) 
    category : string 

    @Field(()=>UserEntity)
    author : UserEntity

    @Field(()=>[CommentEntity])
    comments : CommentEntity[] ;

    authorId: string;
    categoryId : string ; 
}