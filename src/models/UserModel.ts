import { model, Schema } from 'mongoose';

enum Role {
    ADMIN="ADMIN" , 
    USER="USER" ,
}

interface IUser {
    name : string ; 
    email : string ; 
    username : string ; 
    password : string ; 
    role : string ;
}



const userSchema = new Schema<IUser>({
    name : {type : String , required : true } , 
    email : {type : String  , required : true , unique : true} ,
    username : { type : String  , required : true , unique : true } , 
    password : {type : String , required : true , unique : true } , 
    role : {
        type : String ,
        enum : ['ADMIN','USER'] , 
        required : true 
    } ,
})

export const User = model<IUser>('User' , userSchema)