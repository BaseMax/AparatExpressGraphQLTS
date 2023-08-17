import { Field, ObjectType } from "type-graphql";
import { VideoEntity } from "./video-entity";

@ObjectType()
export class categoryEntity{
    @Field(()=>String)
    id : string ;

    @Field(()=>String)
    name : string ;

    @Field(()=>[VideoEntity])
    videos : VideoEntity[];
}