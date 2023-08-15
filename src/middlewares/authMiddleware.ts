import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';
import { AuthChecker } from 'type-graphql';
import { ContextType } from '../interfaces/contextType'; 
import passport from 'passport';

export const authChecker: AuthChecker<ContextType> = async ({ context }) => {
  return new Promise<boolean>((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) {
        resolve(false);
      }
      context.req.user = user; 
      resolve(true);
    })(context.req, context.res);
  });
};