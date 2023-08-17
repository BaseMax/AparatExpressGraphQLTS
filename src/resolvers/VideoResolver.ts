import { VideoService } from "../services/VideoService";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver  } from "type-graphql";
import { StatusResult } from "../object-types/status-result";
import { CreateVideoInput } from "../inputs/createVideoInput";
import { VideoEntity } from "../object-types/entity/video-entity";
import { Video } from "@prisma/client";

@Resolver()
export class VideoResolver {

    private readonly videoService : VideoService ;
    
    constructor(){
        this.videoService = new VideoService()
    }

    // User access 

        
    @Authorized()
    @Query(()=>[VideoEntity])
    findUAllUserVideo(
        @Ctx() context 
    ):Promise<Video[]>{
        return this.videoService.findUAllUserVideo(context.req.user);
    }


    @Authorized()
    @Query(()=>VideoEntity)
    findOneUserVideo(
        @Arg('id' , ()=>String) id : string,
        @Ctx() context 
    ):Promise<Video>{
        return this.videoService.findOneUserVideo(id , context.req.user);
    }

    @Authorized()
    @Mutation(()=>StatusResult)
    async createVideo(
        @Arg('createVideoInput' , ()=>CreateVideoInput)createVideoInput:CreateVideoInput ,
        @Ctx() context,
        ){
        return this.videoService.create(createVideoInput , context.req.user)
    }
}
