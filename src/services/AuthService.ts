import { compare, compareSync, hashSync } from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { LoginInput } from "../inputs/loginInput";
import { RegisterInput } from "../inputs/registerInput";
import { Auth } from "../object-types/auth";
import { PrismaClient, Role } from "@prisma/client";

export class AuthService {
    private readonly prisma:PrismaClient ; 

    constructor(){
        this.prisma = new PrismaClient()
    }

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

        const user = await this.prisma.user.findUnique({where : {username}}) ;

        if(!user){
            throw new Error('Username is invalid')
        }
        
        const isValidPassword = compareSync(password , user.password);

        if(!isValidPassword){
            throw new Error('Password is not valid')
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
        let {
            firstName , 
            lastName , 
            email , 
            username , 
            password ,
        } = registerInput ;

        const userByEmail = await this.prisma.user.findUnique({where : {email}});
        const userByUsername = await this.prisma.user.findUnique({where : {username}});

        if(userByEmail){
            throw new Error('Email is invalid')
        }

        if(userByUsername){
            throw new Error('Username is not valid')
        }

        password = hashSync(password , 12);
        
        const newUser = await this.prisma.user.create({
            data : {
                firstName , 
                lastName , 
                email , 
                username , 
                password ,
                role : [Role.USER]
            }
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