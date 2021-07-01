import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { AppService } from '../app.service';
import { User } from '../entity/user';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy,'userJwt') {
  constructor(private readonly  userService: AppService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretForUser',
    });
  }

  async validate(userDto:User) {
    return this.userService.findOne(userDto);
  }
}
