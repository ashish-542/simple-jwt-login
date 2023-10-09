import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { LocalStrategy } from './strategy/local.strategy';
import { JWTStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenStrategy } from './strategy/refreshToken.strategy';

@Module({
  imports:[PassportModule,JwtModule.register({
    secret:process.env.JWT_SECRET,
    signOptions:{expiresIn:process.env.JWT_EXPIRES}
  }),MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
  providers: [AuthService,LocalStrategy,JWTStrategy,RefreshTokenStrategy],
  exports:[AuthService]
})
export class AuthModule {}
