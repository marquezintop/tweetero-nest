import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { PostUserDto } from './dtos/user.dtos';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[]

  getHealth(): string {
    return "I'm okay!"
  }

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  listUsers() {
    return this.users;
  }

  listTweets() {
    return this.tweets;
  }

  createUser(body: PostUserDto) {
    const user = new User(body.username, body.avatar)
    return this.users.push(user);
  }
}
