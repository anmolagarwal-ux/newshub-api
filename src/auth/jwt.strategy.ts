import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
 ExtractJwt,
 Strategy
} from 'passport-jwt';


@Injectable()
export class JwtStrategy 
extends PassportStrategy(Strategy){


constructor(){

 super({

  jwtFromRequest:
  ExtractJwt.fromAuthHeaderAsBearerToken(),

  ignoreExpiration:false,

  secretOrKey:'newshub-secret'

 });

}
async validate(payload: any) {
  console.log(payload);
  return {
    Id: payload.Id,
    Name: payload.Name,
    Role: payload.Role,
  };
}


}