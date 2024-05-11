import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
	imports: [TypeOrmModule.forFeature([Profile, User])],
	providers: [ProfileResolver, ProfileService, UserService],
})
export class ProfileModule {}
