import { Field, ObjectType } from "type-graphql";
import { VideoEntity } from "./video-entity";

@ObjectType()
export class PlayListEntity {
    @Field(()=>String)
    id : string ; 

    @Field(()=>String)
    description : string ;

    @Field(()=>[VideoEntity])
    videos : VideoEntity[];
}