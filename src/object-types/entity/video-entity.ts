import { Types } from "mongoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class VideoEntity {
    @Field(()=>Types.ObjectId)
    id : Types.ObjectId;
    
    @Field(()=>String)
    title : string ;

    @Field(()=>String)
    description : string ;

    @Field(()=>String )
    authorId: string;
    
    filePath : string; 
    fileUrl : string ; 
    categoryId : Types.ObjectId ; 
    commentsIds : Types.ObjectId ; 
    likesIds : Types.ObjectId 
}