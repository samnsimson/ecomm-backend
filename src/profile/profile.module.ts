import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.model';
import { ProfileResolver } from './profile.resolver';

@Module({
	imports: [TypeOrmModule.forFeature([Profile])],
	providers: [ProfileResolver],
})
export class ProfileModule {}
