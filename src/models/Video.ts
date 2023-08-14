import { Schema, Types } from "mongoose";


interface IVideo extends Document{
    title : string ; 
    description : string ; 
    category : Types.ObjectId ; 
    comments : Types.Array<Types.ObjectId> ; 
}


const videoSchema = new Schema<IVideo>({
    title : {
        
    }
})