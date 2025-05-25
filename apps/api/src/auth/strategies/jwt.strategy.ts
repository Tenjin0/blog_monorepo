import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy} from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import JwtConfig from '../../config/jwt.config'
import * as config from '@nestjs/config'
import { AuthPayload } from '../entities/auth_payload.entity'
import { AuthJwtPayload } from '../types/auth_jwt_payload'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @Inject(JwtConfig.KEY)
    private jwtConfig: config.ConfigType<typeof JwtConfig>,
    private authService: AuthService

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret as string,
      ignoreExpiration: false
    })
  }
  override validate(payload: AuthJwtPayload) {
    const userId = payload.sub
    return this.authService.validateUserById(userId)
  }
}
