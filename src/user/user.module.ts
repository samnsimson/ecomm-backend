import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ReviewsService } from 'src/reviews/reviews.service';
import { Review } from 'src/reviews/entities/review.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User, Review])],
	providers: [UserResolver, UserService, ReviewsService],
})
export class UserModule {}
