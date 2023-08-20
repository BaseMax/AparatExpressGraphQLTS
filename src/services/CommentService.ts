import {  Prisma, PrismaClient } from "@prisma/client";
import { createCommentInput } from "../inputs/createCommentInput";
import { UpdateCommentInput } from "../inputs/updateCommentInput";
import { CommentEntity } from "../object-types/entity/comment-entity";
import { StatusResult } from "../object-types/status-result";
import { VideoService } from "../services/VideoService";

export class CommentService {
    private readonly videoService:VideoService ;
    private readonly prisma:PrismaClient ;

    constructor(){
        this.videoService = new VideoService();
        this.prisma = new PrismaClient();
    }

    async findOne(where:Prisma.CommentWhereInput):Promise<CommentEntity> {
        const comment = await this.prisma.comment.findFirst({where});

        if(!comment){
            throw new Error('Comment not found')
        }

        return comment ; 
    }

    async addComment(videoId:string  , createCommentInput:createCommentInput):Promise<StatusResult>{
        
        const statusResult:StatusResult =  { 
            success : true , 
            message : 'Item creatd successfully'
        }

        try {
            await this.videoService.findOne({id : videoId});

            const newComment = await this.prisma.comment.create({
                data : {
                    ...createCommentInput , 
                    videoId : videoId , 
                }
            })

            statusResult.id = newComment.id ; 
            
        } catch (error) {
            return {
                success : false , 
                message : error.message 
            }
        }
    }

    async updateComment(id : string , updateCommentInput:UpdateCommentInput):Promise<StatusResult>{
        const statusResult:StatusResult = {
            message : 'Item edited successfully' , 
            success : true , 
        }

        try {
            await this.findOne({id}) ;
            await this.prisma.comment.update({where : {id} , data :{...updateCommentInput}});
        } catch (error) {
            return {
                message : error.message , 
                success : false , 
            }
        }

        return statusResult ; 
    }

    async removeComment(id : string ):Promise<StatusResult>{
        await this.findOne({id});
        await this.prisma.comment.delete({where : {id}});

        return {
            message : 'Item removed successfully' , 
            success : true 
        }
    }
}