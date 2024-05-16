import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/_libs/types';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromBodyField('token'),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate({ id, username }: JwtPayload) {
		return { id, username };
	}
}
