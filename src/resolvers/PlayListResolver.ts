import { CreatePlayListInput } from "../inputs/createPlayListInput";
import { UpdatePlayListInput } from "../inputs/updatePlayListInput";
import { PlayListEntity } from "../object-types/entity/playList-entity";
import { StatusResult } from "../object-types/status-result";
import { PlayListService } from "../services/PlayListService";
import { Arg, Authorized, Mutation, Query } from "type-graphql";

export class PlayListResolver {
    
    playListService:PlayListService ;

    constructor(){
        this.playListService = new PlayListService()
    }

    @Authorized()
    @Query(()=>PlayListEntity)
    findOnePlaylist(
        @Arg('id' , ()=>String) id : string 
    ){
        return this.playListService.findOne({id})
    }


    @Authorized()
    @Mutation(()=>StatusResult)
    createPlaylist(
        @Arg('createPlayListInput' , ()=>CreatePlayListInput) createPlayListInput:CreatePlayListInput
    ){
        return this.playListService.createPlaylist(createPlayListInput);
    }


    @Authorized()
    @Mutation(()=>StatusResult)
    updatePlaylist(
        @Arg(
            'updatePlayListInput' , ()=>UpdatePlayListInput) updatePlayListInput:UpdatePlayListInput
        ){
        return this.playListService.updatePlaylist(updatePlayListInput.id , updatePlayListInput);        
    }


    @Authorized()
    @Mutation(()=>StatusResult)
    async addVideoToPlaylist(
        @Arg('videoId' , ()=>String) videoId : string ,
        @Arg('playListId' , ()=>String) playListId : string ,
    ){
        return this.playListService.addVideoToPlaylist(videoId , playListId);
    }


    @Authorized()
    @Mutation(()=>StatusResult)
    async removeVideoFromPlaylist(
        @Arg('videoId' , ()=>String) videoId : string ,
        @Arg('playListId' , ()=>String) playListId : string ,
    ){
        return this.playListService.removeVideoFromPlaylist(videoId , playListId);
    }



    @Authorized()
    @Mutation(()=>StatusResult)
    async removePlaylist(
        @Arg('id' , ()=>String) id : string 
    ){
        return this.playListService.removePlaylist(id)
    }
}