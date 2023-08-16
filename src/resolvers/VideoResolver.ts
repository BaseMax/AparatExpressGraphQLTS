import { VideoService } from "../services/VideoService";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver  } from "type-graphql";
import { StatusResult } from "../object-types/status-result";
import { CreateVideoInput } from "../inputs/createVideoInput";
import { VideoEntity } from "../object-types/entity/video-entity";

@Resolver()
export class VideoResolver {

    private readonly videoService : VideoService ;
    
    constructor(){
        this.videoService = new VideoService()
    }

    @Authorized()
    @Mutation(()=>StatusResult)
    async createVideo(
        @Arg('createVideoInput' , ()=>CreateVideoInput)createVideoInput:CreateVideoInput ,
        @Ctx() context,
        ){
        return this.videoService.create(createVideoInput , context.req.user)
    }

    @Authorized()
    @Query((()=>[VideoEntity]))
    async findAllVideoByAuthor(
        @Ctx() context,
        ){
        // console.log(context.req.user)
        return this.videoService.findVideoByAuthor(context.req.user)
    }
}
