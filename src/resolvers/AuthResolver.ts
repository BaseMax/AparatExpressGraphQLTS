import { LoginInput } from "../inputs/loginInput";
import { RegisterInput } from "../inputs/registerInput";
import { AuthService } from "../services/AuthService";
import { Arg , Mutation, Resolver } from "type-graphql";
import { Auth } from "../object-types/auth";

@Resolver(of => Auth)
export class AuthResolver {
    private readonly AuthService:AuthService ; 

    constructor(){
        this.AuthService = new AuthService()
    }

    @Mutation(()=>Auth)
    async login(
        @Arg("loginInput" , ()=>LoginInput) loginInput:LoginInput
    ){
        return await this.AuthService.login(loginInput) ;
    }


    @Mutation(()=>Auth)
    async register(
        @Arg('registerInput' , ()=>RegisterInput) registerInput:RegisterInput
    ){
        return await this.AuthService.register(registerInput) ;
    }
}