import { StatusResult } from "../object-types/status-result";
import { Request , Response } from 'express'
import { VideoService } from "../services/VideoService";
import { CreateVideoInput } from "../inputs/createVideoInput";
import uuid from 'uuid' ;

const videoService = new VideoService()

export async function createVideo(req:Request,res:Response):Promise<any> {
    const {
        title, 
        description ,
    } = req.body;

    console.log()

    const data:CreateVideoInput = {
        title : title , 
        description : description , 
        path : req.file.path , 
        url : `${req.hostname}/${req.file.path}`, 
    }

    const result = await videoService.create(data , req.user)
    res.send(result);
}