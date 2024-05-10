import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Resolver(() => Profile)
export class ProfileResolver {
	constructor(private readonly profileService: ProfileService) {}

	@Mutation(() => Profile)
	createProfile(@Args('userId') userId: string, @Args('createProfileInput') createProfileInput: CreateProfileInput) {
		return this.profileService.create(userId, createProfileInput);
	}

	@Query(() => [Profile], { name: 'listProfiles' })
	findAll(@Args('take', { type: () => Int, nullable: true }) take: number, @Args('skip', { type: () => Int, nullable: true }) skip: number) {
		return this.profileService.findAll(take, skip);
	}

	@Query(() => Profile, { name: 'profile' })
	findOne(@Args('id') id: string) {
		return this.profileService.findOne(id);
	}

	@Mutation(() => Profile)
	updateProfile(@Args('updateProfileInput') updateProfileInput: UpdateProfileInput) {
		return this.profileService.update(updateProfileInput.id, updateProfileInput);
	}

	@Mutation(() => Profile)
	removeProfile(@Args('id') id: string) {
		return this.profileService.remove(id);
	}
}
