import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { PostUserDto } from './dtos/user.dtos';
import { PostTweetDto } from './dtos/tweet.dtos';

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
  getTweets(@Query('page') page: number = 1) {
      if (isNaN(page) || page < 1) {
        throw new HttpException('Invalid page number!', HttpStatus.BAD_REQUEST);
      }
  
      return this.appService.listTweets(page);
  }

  @Get("/tweets/:username")
  findOne(@Param("username") username: string) {
    return this.appService.listUserTweets(username);
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

  @Post("/tweets")
  @HttpCode(201)
  createTweet(@Body() body: PostTweetDto) {
    try {
      this.appService.createTweet(body.username, body.tweet);
    } catch (error) {
      throw new HttpException(`You must be logged to post a tweet!`, HttpStatus.UNAUTHORIZED);
    }
  }
}
