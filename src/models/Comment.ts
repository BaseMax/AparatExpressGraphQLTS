import mongoose, { model, Model, Schema } from "mongoose";


interface IComment{
    content : string ; 
    user : object ,
    video : object , 
}


const commentSchema = new Schema<IComment>({
    content : {
        type : String ,
        required : true , 
    } , 
    user : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User" , 
        required : true
    } ,
} , {timestamps : true })


export const Comment = model('Comment' , commentSchema);