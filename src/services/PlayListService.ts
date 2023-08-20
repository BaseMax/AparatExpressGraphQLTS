import { Prisma, PrismaClient } from "@prisma/client";
import { CreatePlayListInput } from "../inputs/createPlayListInput";
import { UpdatePlayListInput } from "../inputs/updatePlayListInput";
import { StatusResult } from "../object-types/status-result";
import { VideoService } from "./VideoService";

export class PlayListService {
    
    private readonly prisma:PrismaClient ;
    private readonly videService:VideoService ; 
    
    constructor(){
        this.prisma = new PrismaClient()
        this.videService = new VideoService()
    }


    async findOne(where : Prisma.PlayListWhereInput){
        const playList = await this.prisma.playList.findFirst({
            where , 
            include : {
                videos : true 
            }
        })

        if(!playList){
            throw new Error('Play list not found')
        }

        return playList ; 
    }

    async createPlaylist(createPlaylist:CreatePlayListInput):Promise<StatusResult>{
        const statusResult:StatusResult = {
            success : true , 
            message : 'Item created successfully' , 
        }

        try {
            const result = await this.prisma.playList.create({
                data : {
                ...createPlaylist ,
                }
            })

            statusResult.id = result.id ; 
        } catch (error) {
            return {
                message :error.message , 
                success : false , 
            }
        }


        return statusResult ; 
    }

    async updatePlaylist(id:string  , updatePlayListInput:UpdatePlayListInput):Promise<StatusResult>{
        
        const statusResult:StatusResult = {
            message  : 'Item edited successfully' ,
            success : true , 
        }
        
        try {
            // check play list exist
            await this.findOne({id});

            await this.prisma.playList.update({where : {id} , data : {...updatePlayListInput}})
        } catch (error) {
            return {
                message : error.message , 
                success : false , 
            }
        }

        return statusResult ; 
    }
    
    async addVideoToPlaylist(videoId:string , playListId : string ):Promise<StatusResult>{
        
        const statusResult:StatusResult = {
            message : 'Item added successfully' , 
            success : true , 
        }
        
        try {
            await this.videService.findOne({id : videoId}) ; 
            await this.findOne({id : playListId});
            
            await this.prisma.video.update({
                where : {id : videoId} , 
                data : {
                    playListId ,
                }
            })
        } catch (error) {
            return {
                message : error.message , 
                success : false , 
            }
        }

        return statusResult ; 
    }

    async removeVideoFromPlaylist(videoId:string , playListId:string ):Promise<StatusResult>{
        const statusResult:StatusResult = {
            message : 'Item removed successfully' , 
            success : true , 
        }
        
        try {
            await this.videService.findOne({id : videoId}) ; 
            await this.findOne({id : playListId});
            
            await this.prisma.video.update({
                where : {id : videoId} , 
                data : {
                    playListId : ""
                }
            })
        } catch (error) {
            return {
                message : error.message , 
                success : false , 
            }
        }

        return statusResult ;
    }


    async removePlaylist(id : string ):Promise<StatusResult>{
        await this.findOne({id})
        await this.prisma.playList.delete({where : {id}});
        
        return {
            message : 'Item removed successfully' , 
            success : true 
        }
    }
}