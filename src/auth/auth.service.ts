import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dto/login-input.dto';
import { compare } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { LoginResponse } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { SignupResponse } from './dto/signup-response.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	private jwtPayload({ id, username, role }: User) {
		return { id, username, role };
	}

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
		const payload = this.jwtPayload(user);
		return {
			...payload,
			authenticated: true,
			accessToken: this.jwtService.sign(payload),
			refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
		};
	}

	async signup(createUserInput: CreateUserInput): Promise<Omit<SignupResponse, 'password'>> {
		const user = await this.userService.create(createUserInput);
		delete user.password;
		return user;
	}

	async refreshToken(_: string, id: string): Promise<Pick<LoginResponse, 'accessToken'>> {
		const user = await this.userService.findOneBy({ where: { id } });
		if (!user) throw new UnauthorizedException('User not found');
		const payload = this.jwtPayload(user);
		return { accessToken: this.jwtService.sign(payload) };
	}
}
