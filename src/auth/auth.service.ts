import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel:mongoose.Model<User>
    ){}
    async validateUser(username:string,password:string){
        return await this.userModel.findOne({username,password});
    }
}
