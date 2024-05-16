import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from './dto/login-input.dto';
import { LoginResponse } from './dto/login-response.dto';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard, RefreshJwtGuard } from './auth.guard';
import { CurrentUser, Public, RefreshJWT } from 'src/_decorator';
import { JwtPayload } from 'src/_libs/types';
import { RefreshTokenResponse } from './dto/refresh-token-response.dto';
import { RefreshTokenInput } from './dto/refresh-token-input.dto';

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Mutation(() => LoginResponse)
	@UseGuards(GqlAuthGuard)
	async login(@Args('credentials') credentials: LoginInput): Promise<LoginResponse> {
		return await this.authService.login(credentials);
	}

	@RefreshJWT()
	@Mutation(() => RefreshTokenResponse)
	@UseGuards(RefreshJwtGuard)
	async refresh(@Args('refreshTokenInput') { token }: RefreshTokenInput, @CurrentUser() user: JwtPayload): Promise<RefreshTokenResponse> {
		return await this.authService.refreshToken(token, user.id);
	}
}
