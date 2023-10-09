import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService:AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post("login")
  @UseGuards(AuthGuard('local'))
  async login(@Req()req){
    const user=req.user
    return await this.authService.login(user);
  }
}
