import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel:mongoose.Model<User>,
        private readonly jwtService:JwtService
    ){}
    async validateUser(username:string,password:string){
        return await this.userModel.findOne({username,password});
    }
    async login(user){
        const payload={userId:user._id,username:user.username};
        const tokens=await this.getTokens(payload);
        console.log("🚀 ~ file: auth.service.ts:19 ~ AuthService ~ login ~ payload:", payload)
        await this.userModel.findOneAndUpdate({username:payload.username},{refreshToken:tokens.refreshToken});
        return {
            token:tokens.accessToken,
            username:payload.username
        }
    }
    async getTokens(payload){
        const accessToken=await this.jwtService.signAsync(payload,{secret:process.env.JWT_SECRET,expiresIn:process.env.JWT_EXPIRES});
        const refreshToken=await this.jwtService.signAsync(payload,{secret:process.env.JWT_REFRESH_SECRET,expiresIn:process.env.JWT_REFRESH_EXPIRES});
        return {
            accessToken:accessToken,
            refreshToken:refreshToken
        }
    }
}
