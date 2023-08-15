import { model, Schema, Types } from "mongoose";


interface IVideo extends Document{
    title : string ; 
    filePath : string ; 
    fileUrl : string ; 
    description : string ; 
    category : Types.ObjectId ; 
    like : Types.Array<Types.ObjectId>
    comments : Types.Array<Types.ObjectId> ; 
}


const videoSchema = new Schema<IVideo>({
    title : { type : String , required : true}, 
    description : { type : String , required : true}, 
    filePath : {type : String} , 
    fileUrl : {type : String } ,
    category : {type : Schema.Types.ObjectId , ref : 'Category'} ,
    comments : [{type : Schema.Types.ObjectId , ref : 'Comment'}] , 
    like : [{type : Schema.Types.ObjectId, ref : 'User'}] , 
});


const Video = model<IVideo>("Video" , videoSchema);

export {Video} ;