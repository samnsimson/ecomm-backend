import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dto/login-input.dto';
import { compare } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { LoginResponse } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(username: string, password: string): Promise<User | null> {
		const user = await this.userService.findOneBy({ where: { username } });
		if (!user) throw new UnauthorizedException('Username does not exist');
		const passowrdMatch = await compare(password, user.password);
		if (!passowrdMatch) throw new UnauthorizedException('Invalid password');
		delete user.password;
		return user;
	}

	async login({ username, password }: LoginInput): Promise<LoginResponse> {
		const user = await this.validateUser(username, password);
		delete user.password;
		const payload = { id: user.id, username: user.username };
		return { ...payload, authenticated: true, token: this.jwtService.sign(payload) };
	}
}
