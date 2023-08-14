import * as passport from 'passport' ; 
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { User } from 'src/models/User';


const jwtOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
}


passport.use(
    new JwtStrategy(jwtOption , async (payload , done)=>{
        try {
            const user = User.findById(payload.sub);

            if(user){
                return done(null , user);
            }

            return done(null , false)
        } catch (error) {
            done(error , false)
        }
    })
)