import { Context } from "apollo-server-core";
import mongoose from "mongoose";
import { createCommentInput } from "src/inputs/createCommentInput";
import { ContextType } from "src/interfaces/contextType";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
export class CommentResolver {
    
    @Authorized()
    @Mutation()
    async addComment(
        @Arg('videoId') videoId:mongoose.Types.ObjectId , 
        @Arg('createCommentInput') createComment:createCommentInput , 
        @Ctx() context:ContextType  , 
    ){
        
    }
}