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


  async validateToken(token: string): Promise<JwtPayload> {
    try {
      return this.jwtService.verify<JwtPayload>(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }


}
