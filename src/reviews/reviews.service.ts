import { Injectable } from '@nestjs/common';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
	constructor(@InjectRepository(Review) private review: Repository<Review>) {}

	create(createReviewInput: CreateReviewInput) {
		return this.review.save(createReviewInput);
	}

	findAll(args: FindManyOptions<Review>) {
		return this.review.find(args);
	}

	findOne(id: number) {
		return `This action returns a #${id} review`;
	}

	update(id: string, updateReviewInput: UpdateReviewInput) {
		return this.review.update(id, updateReviewInput);
	}

	remove(id: number) {
		return `This action removes a #${id} review`;
	}
}
