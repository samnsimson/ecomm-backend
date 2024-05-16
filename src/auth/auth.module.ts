import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RefreshJwtStrategy } from './strategy/refresh-jwt.strategy';
import { jwtConfig } from 'src/_config/jwt.config';

@Module({
	imports: [TypeOrmModule.forFeature([User]), PassportModule, JwtModule.registerAsync(jwtConfig.asProvider()), forwardRef(() => UserModule)],
	providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
