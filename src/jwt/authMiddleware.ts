import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';
import { AuthChecker } from 'type-graphql';
import { ContextType } from '../interfaces/contextType'; 
import { verify } from 'jsonwebtoken';

const authService = new AuthService();
const userService = new UserService();

export const authChecker: AuthChecker<ContextType> = async ({ context }) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    return false;
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const { sub } = authService.validateToken(token)

    if (typeof sub === 'string') {
      const user = await userService.findById(sub);
      context.req.user = user ; 
    } else {
      throw new Error('Invalid token');
    }
    return true;
  } catch (error) {
    return false;
  }
};