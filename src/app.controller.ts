import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PostUserDto } from './dtos/user.dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  @HttpCode(200)
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Get("/users")
  getUsers() {
    return this.appService.listUsers();
  }

  @Get("/tweets")
  getTweets() {
    return this.appService.listTweets();
  }

  @Get("/tweets/:username")
  findOne(@Param("username") username: string) {
    console.log(username);
    return username;
  }

  @Post("/sign-up")
  @HttpCode(200)
  postUser(@Body() body: PostUserDto) {
    try {
      return this.appService.createUser(body);
    } catch (error) {
      throw new HttpException("Cannot create user", HttpStatus.BAD_REQUEST)
    }
  }
}
