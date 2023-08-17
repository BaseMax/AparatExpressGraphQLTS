import { CreateVideoInput } from "../inputs/createVideoInput";
import { StatusResult } from "../object-types/status-result";
import { Prisma, PrismaClient, User, Video } from "@prisma/client";


export class VideoService {
    private readonly prisma:PrismaClient 

    constructor(){
        this.prisma = new PrismaClient()
    }


    async findOne(where : Prisma.VideoWhereInput):Promise<Video>{
        const video = await this.prisma.video.findFirst({
            where  , 
            include : {
                author : true , 
                category : true , 
                comments : true 
            }
        })

        if(!video){
            throw new Error('Video not found')
        }

        return video ; 
    }

    
    
    
    // User access 
    
    
    async create(
        createVideoInput:CreateVideoInput ,
        user , 
    ):Promise<StatusResult>{

        const result = await this.prisma.video.create({
            data : {
                ...createVideoInput , 
                authorId : user.id , 
            }
        })

        return {
            success : true , 
            message : 'Item created successfully' ,
            id : result.id , 
        }
    }


    async findUAllUserVideo(user:User):Promise<Video[]>{
        return await this.prisma.video.findMany({
            where : {
                authorId : user.id
            } , 
            include : {
                comments : true , 
                category : true , 
                author : true ,
            }
        })
    }

    async findOneUserVideo(id:string , user:User):Promise<Video>{
        return await this.findOne({
            id , 
            authorId : user.id 
        })
    }
}