import { CreateVideoInput } from "../inputs/createVideoInput";
import { StatusResult } from "../object-types/status-result";
import { UserEntity } from "../object-types/entity/user-entity";
import { Video } from "../models/Video";


export class VideoService {
    
    async create(
        createVideoInput:CreateVideoInput ,
        user : UserEntity
    ):Promise<StatusResult>{
        
        const result = await Video.create({
            author : user.id , 
            ...createVideoInput
        })

        return {
            success : true , 
            message : 'Item created successfully' ,
            id : result.id , 
        }
    }

    async findVideoByAuthor(user:UserEntity):Promise<Video[]>{
        const  result = await Video.find({ authorId: user.id})

        return result 
    }
}