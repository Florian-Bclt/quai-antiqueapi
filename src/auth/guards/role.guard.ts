import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "src/user/models/user.model";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.get<UserRole>('role', context.getHandler());

    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return user.role === requiredRole;
  }
}
