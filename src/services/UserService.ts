import { HttpError } from "../errors/http-error";
import { User } from "../models/UserModel";
import { UserEntity } from "../object-types/user-entity";

export class UserService {
    async findById(id : string):Promise<UserEntity>{
        const user = await User.findById(id)

        if(!user){
            throw new HttpError(400 , 'User is invalid')
        }

        return user ; 
    }
}