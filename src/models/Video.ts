import { model, Schema, Types } from "mongoose";


export interface IVideo {
    authorId : Types.ObjectId ;
    title : string ; 
    filePath : string ; 
    fileUrl : string ; 
    description : string ; 
    categoryId : Types.ObjectId ; 
    commentsIds : Types.Array<Types.ObjectId> ; 
    likesIds : Types.Array<Types.ObjectId>
}


const videoSchema = new Schema<IVideo>({
    authorId : {type : Schema.Types.ObjectId , ref : 'User'} ,
    title : { type : String , required : true}, 
    description : { type : String , required : true}, 
    filePath : {type : String} , 
    fileUrl : {type : String } ,
    categoryId : {type : Schema.Types.ObjectId , ref : 'Category'} ,
    commentsIds : [{type : Schema.Types.ObjectId , ref : 'Comment'}] , 
    likesIds : [{type : Schema.Types.ObjectId, ref : 'User'}] , 
});


const Video = model<IVideo>("Video" , videoSchema);

export {Video} ;