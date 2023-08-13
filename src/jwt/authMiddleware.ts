import passport from "passport";
import { AuthChecker } from "type-graphql";
import { ContextType } from "../interfaces/contextType";


export const authChecker:AuthChecker<ContextType> = async ({context}) => {
    return new Promise<boolean>((resolve , reject)=>{
        passport.authenticate('jwt' , {session : false} , (err , user)=>{
            if(err || !user){
                resolve(false)
            }
            context.req.user = user ; 
            resolve(true)
        })(context.req , context.res)
    })
}