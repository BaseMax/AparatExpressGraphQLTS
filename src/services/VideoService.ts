import { CreateVideoInput } from "../inputs/createVideoInput";
import { StatusResult } from "../object-types/status-result";
import { createWriteStream } from 'fs' ;

export class VideoService {
    
    async create(
        createVideoInput:CreateVideoInput , 
        file : any
    ):Promise<StatusResult>{
        const { createReadStream, filename, mimetype, encoding } = await file;
        const stream = createReadStream() ; 
        const path = `uploads/${filename}`;
        const writeStream = createWriteStream(path)
        await stream.pipe(writeStream) ; 

        console.log(file)

        return {
            success : true , 
            message : 'file uploaded' ,
        }
    }
}