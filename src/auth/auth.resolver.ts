import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from './dto/login-input.dto';
import { LoginResponse } from './dto/login-response.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => LoginResponse)
	async login(@Args('credentials') credentials: LoginInput): Promise<LoginResponse> {
		const { username, email } = await this.authService.login(credentials);
		return { username, email, authenticated: true, jwt: '' };
	}
}
