import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { UserMutationsResolver } from './resolvers/user.mutations.resolver';
import { UserService } from './user.service';
import { UserQueriesResolver } from './resolvers/user.queries.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserMutationsResolver, UserQueriesResolver],
  exports: [UserService]
})
export class UserModule {}
