
export class Tweet {
  private username: string;
  private tweet: string;
  private avatar: string;

  constructor(username: string, tweet: string, avatar: string) {
      this.username = username;
      this.tweet = tweet;
      this.avatar = avatar;
  }

  getUsername() {
    return this.username
  }
}