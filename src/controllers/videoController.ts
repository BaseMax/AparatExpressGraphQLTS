import { Request , Response } from 'express'
import { VideoService } from "../services/VideoService";
import { CreateVideoInput } from "../inputs/createVideoInput";

const videoService = new VideoService()

export async function createVideo(req:Request,res:Response):Promise<any> {
    const {
        title, 
        description ,
        tags , 
    } = req.body;

    const data:CreateVideoInput = {
        title : title , 
        description : description , 
        path : req.file.path , 
        url : `${req.hostname}/${req.file.path}`, 
        tags ,
    }

    const result = await videoService.create(data , req.user)
    res.send(result);
}