import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { PostUserDto } from './dtos/user.dtos';
import { error } from 'console';

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

  listTweets(page: number): Tweet[] {
    const tweetsPerPage = 15;
    const firstTweetIndex = (page - 1) * tweetsPerPage;
    const lastTweetIndex = firstTweetIndex + tweetsPerPage;

    return this.tweets.slice(firstTweetIndex, lastTweetIndex);
  }

  listUserTweets(username: string): Tweet[] {
    const userTweets: Tweet[] = this.tweets.filter((tweet) => {
      return tweet.getUsername() === username
    })

    return userTweets;
  }

  createUser(body: PostUserDto) {
    const user = new User(body.username, body.avatar)
    return this.users.push(user);
  }

  createTweet(username: string, tweet: string) {
    const user = this.findUser(username);

    if (!user) {
      throw error;
    }

    const newTweet = new Tweet(user.username, tweet, user.avatar);
    this.tweets.push(newTweet);
  }

  private findUser(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
