import passport from "passport";
import { ExtractJwt, Strategy } from 'passport-jwt' ; 
import { UserService } from "../services/UserService";

const userService = new UserService()

const jwtOption  = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken() ,
    secretOrKey  : process.env.JWT_SECRET_KEY
}

passport.use(new Strategy(jwtOption , async (payload , done)=>{
    const user = await userService.findById(payload.sub);

    if(user){
        return done(null , user);
    }

    return done(null , false);
}))