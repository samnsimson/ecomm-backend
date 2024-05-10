import { Module } from '@nestjs/common';
import { User } from './user.model';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UserResolver],
})
export class UserModule {}
