import { IsNotEmpty, IsString } from "class-validator";

export class PostTweetDto {
    @IsNotEmpty({ message: 'All fields are required!' })
    @IsString()
    username: string;

    @IsString()
    @IsNotEmpty({ message: 'All fields are required!' })
    tweet: string;
}