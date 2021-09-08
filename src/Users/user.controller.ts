import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('User')
  getHelloo(): string {
    return this.userService.getHelloo();
  }
  @Post('user/register')
  async register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('userType') usertype: string,

    @Res() res: any,
  ) {
    return await this.userService.registerUser(
      username,
      email,
      password,
      usertype,
      res,
    );
  }

  @Post('auth')
  async auth(@Res() res: any, @Req() req: any) {
    return await this.userService.authUser(req.user.id, res);
  }
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: any,
    @Req() req: any,
  ) {
    return await this.userService.loginUser(email, password, res, req);
  }
  @Post('admin')
  async getadmin(
    @Res() res: any,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('userType') userType: string,
  ) {
    return await this.userService.admin(res, email, password, userType);
  }
}
