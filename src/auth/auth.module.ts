import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
  providers: [AuthService,LocalStrategy]
})
export class AuthModule {}
