import { FileUpload, GraphQLUpload } from "graphql-upload-ts";
import { CreateVideoInput } from "../inputs/createVideoInput";
import { StatusResult } from "../object-types/status-result";
import { VideoService } from "../services/VideoService";
import { Arg, Mutation, Resolver  } from "type-graphql";

@Resolver()
export class VideoResolver {

    private readonly videoService : VideoService ;
    
    constructor(){
        this.videoService = new VideoService()
    }

    @Mutation(()=>String)
    async uploadFile(@Arg("file", () => GraphQLUpload) file: FileUpload): Promise<FileUpload> {
        return file ; 
    }
}