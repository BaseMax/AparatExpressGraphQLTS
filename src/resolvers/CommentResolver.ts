import { createCommentInput } from "../inputs/createCommentInput";
import { UpdateCommentInput } from "../inputs/updateCommentInput";
import { CommentEntity } from "../object-types/entity/comment-entity";
import { StatusResult } from "../object-types/status-result";
import { CommentService } from "../services/CommentService";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class CommentResolver {
    
    private readonly commentService:CommentService ;
    
    constructor(){
        this.commentService = new CommentService()
    }

    @Authorized()
    @Query(()=>CommentEntity)
    findOneComment(
        @Arg('id' , ()=>String) id : string , 
    ){
        return this.commentService.findOne({id})
    }

    
    @Authorized()
    @Mutation(()=>StatusResult)
    addComment(
         @Arg('videoId' , ()=>String) videoId : string , 
         @Arg('createComment' , ()=>createCommentInput) createCommentInput:createCommentInput
    ){
        this.commentService.addComment(videoId , createCommentInput);
    }


    @Authorized()
    @Mutation(()=>StatusResult)
    updateComment(
         @Arg('updateComment' , ()=>UpdateCommentInput) updateCommentInput:UpdateCommentInput
    ){
        this.commentService.updateComment(updateCommentInput.id , updateCommentInput);
    }


    @Authorized()
    @Mutation(()=>StatusResult)
    removeComment(
        @Arg('id' , ()=>String) id:string 
    ){
        this.commentService.removeComment(id);
    }
    
}