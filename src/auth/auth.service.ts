import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dto/login-input.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async login(credentials: LoginInput) {
		const { email, password } = credentials;
		const user = await this.userService.findOneBy({ where: { email }, relations: { profile: true } });
		if (!user) throw new NotFoundException('User not found');
		const passowrdMatch = bcrypt.compare(password, user.password);
		if (!passowrdMatch) throw new UnauthorizedException('Invalid password');
		delete user.password;
		return user;
	}
}
