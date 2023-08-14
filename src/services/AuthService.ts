import { compare, compareSync } from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { HttpError } from "../errors/http-error";
import { LoginInput } from "../inputs/loginInput";
import { RegisterInput } from "../inputs/registerInput";
import { User } from "../models/UserModel";
import { Auth } from "../object-types/login";

export class AuthService {

    private _signToken(payload:JwtPayload){
        return sign(
            payload , 
            process.env.JWT_SECRET_KEY , 
            {expiresIn : process.env.TOKEN_EXPIRATION}
        )
    }

    validateToken(token : string){ 
        return verify(token , process.env.JWT_SECRET_KEY)
    }
    
    async login(loginInput:LoginInput):Promise<Auth>{
        const {
            username , 
            password , 
        } = loginInput ;

        const user = await User.findOne({username}) ;


        if(!user){
            throw new HttpError(400 , 'Username is invalid')
        }
        
        const isValidPassword = compareSync(password , user.password) ;

        if(!isValidPassword){
            throw new HttpError(400 , 'Password is Invalid');
        }

        const payload:JwtPayload = {
            sub : user.id , 
            role : user.role , 
        }

        const token = await this._signToken(payload);

        return {
            access_token : token  , 
            role : user.role ,
        }
    }

    async register(registerInput:RegisterInput):Promise<Auth>{
        const {
            name , 
            email , 
            username , 
            password ,
        } = registerInput ;

        const userByEmail = await User.findOne({email});
        const userByUsername = await User.findOne({username});

        if(userByEmail){
            throw new HttpError(400 , "This email alredy registerd")
        }

        if(userByUsername){
            throw new HttpError(400 , "This username alredy registerd")
        }

        const newUser = await User.create({
            name , 
            email , 
            username , 
            password , 
            role : "USER" , 
        });

        const payload:JwtPayload = {
            sub : newUser.id , 
            role : newUser.role , 
        }

        const token = await this._signToken(payload) ; 

        return {
            access_token : token , 
            role : newUser.role , 
        }
    }
}