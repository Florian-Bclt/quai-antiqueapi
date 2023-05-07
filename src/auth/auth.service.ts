import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { AuthLoginOutput } from './dto/auth-login.dto';

export interface JWTPayLoad {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role : UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string):  Promise<any> {
    const user = await this.userService.userGet(email);
    if (user && user.password === password) {
      const { password, ...result } = user; //return all user's fields password less
      return result;
    }
    return null;
  }

  //function to login
  async login(user: User): Promise<AuthLoginOutput> {
    const payload: JWTPayLoad = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    }
    return {
      accessToken: this.jwtService.sign(payload),
      role: user.role,
    };
  }
}
