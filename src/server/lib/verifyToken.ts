import { IToken } from 'interface';
import jwt_decode from 'jwt-decode';

export class AuthError extends Error {}

const verifyToken = async (token) => {
  const decoded = jwt_decode(token) as IToken;
  const currentTime = Math.round(new Date().getTime() / 1000);
  // console.log(decoded, 'Decoded token@@@@@@@@@@');
  // if (currentTime > decoded.exp) {
  //   throw new AuthError('Your token has expired');
  // }
  return { ...decoded, expired: currentTime > decoded.exp };
};

export default verifyToken;
