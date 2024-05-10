import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Profile } from './profile.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileInput } from 'src/utils/libs/entities/profile.entity';

@Resolver()
export class ProfileResolver {
	constructor(@InjectRepository(Profile) private profileRepository: Repository<Profile>) {}

	@Query(() => Profile)
	getProfileById(@Args('id') id: string): Promise<Profile> {
		return this.profileRepository.findOneBy({ id });
	}

	@Mutation(() => Profile)
	createProfile(@Args('input') input: CreateProfileInput): Promise<Profile> {
		return this.profileRepository.save({ ...input });
	}
}
