import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategies/jwt.strategy';


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}


  async generateToken(): Promise<string> {
    const payload: JwtPayload = {
      sub: 'your logged in user ;)',
      email: 'your email ;)',
    };
    return this.jwtService.sign(payload);
  }

}
