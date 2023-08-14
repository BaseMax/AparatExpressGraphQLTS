import { genSalt, genSaltSync, hash, hashSync } from 'bcrypt';
import mongoose, { model, Schema } from 'mongoose';

enum Role {
    ADMIN="ADMIN" , 
    USER="USER" ,
}

export interface IUser {
    id : mongoose.Types.ObjectId ; 
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
    password : {type : String , required : true} , 
    role : {
        type : String ,
        enum : ['ADMIN','USER'] , 
        required : true 
    } ,
})

userSchema.pre('save' , function (next) {
    if(!this.isModified('password')) return next()

    try {
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(this.password , salt);
        this.password = hashedPassword ; 
        next()
    } catch (error) {
        return next(error)
    }
})

export const User = model<IUser>('User' , userSchema);
