import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class PostUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsUrl()
    avatar: string;
}