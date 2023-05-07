import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserCreateInput, UserCreateOutput } from './dto/user-create.dto';
import { User, UserRole } from './models/user.model';
import { UserUpdateInput, UserUpdateOutput } from './dto/user-update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // create user
  async userCreate(input: UserCreateInput): Promise<UserCreateOutput> {
    const user = this.userRepository.create(input);
    await user.save();
    return {
      user
    }
  }

  // Update user 

  async userUpdate(id: string, input: UserUpdateInput): Promise<UserUpdateOutput> {
    const user = await this.userRepository.findOne({ where : {id} });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user, input);
    await user.save();
    return {
      user,
    };
  }

  // Delete user 

  async userDelete(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where : {id} });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.remove(user);
  }
  
  
  //find user by email
  async userGet(email: User['email']): Promise<User> {
    return await this.userRepository.findOne({ where : {email} });
  }


  // find all users
  async userGetAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // find user by role
  async userGetByRole(role: UserRole): Promise<User[]> {
    return await this.userRepository.find({ where: { role } });
  }

  // find users by role
  async userGetByRoles(roles: UserRole[]): Promise<User[]> {
    const validRoles = [UserRole.ADMIN, UserRole.MANAGER, UserRole.CLIENT];
  
    for (const role of roles) {
      if (!validRoles.includes(role)) {
        throw new BadRequestException(`Invalid role: ${role}`);
      }
    }
  
    return await this.userRepository.find({ where: { role: In(roles) } });
  }
  

  // find user by id
  async getUserById(id: string, role: UserRole): Promise<User> {
    const user = await this.userRepository.findOne({ where : { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    user.role = role;
    return user;
  }
}
