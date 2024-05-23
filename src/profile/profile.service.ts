import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(Profile) private profile: Repository<Profile>,
		@InjectRepository(User) private user: Repository<User>,
	) {}

	async create(userId: string, createProfileInput: CreateProfileInput) {
		const profile = await this.profile.save(this.profile.create(createProfileInput));
		await this.user.update(userId, { profile });
		return profile;
	}

	findAll(take: number = 10, skip: number = 0) {
		return this.profile.find({ take, skip });
	}

	findOne(id: string) {
		return this.profile.findOneBy({ id });
	}

	async update(id: string, updateProfileInput: UpdateProfileInput) {
		const result = await this.profile.update(id, updateProfileInput);
		if (result.affected) return await this.findOne(id);
		else throw new NotFoundException(`profile with ID ${id} not found`);
	}

	async remove(id: string) {
		const { affected } = await this.profile.delete(id);
		if (affected === 0) throw new HttpException(`ID ${id} not found!`, HttpStatus.NOT_FOUND);
		return { id };
	}
}
